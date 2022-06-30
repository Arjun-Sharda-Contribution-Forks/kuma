package main

import (
	"encoding/json"
	"fmt"
	"net"
	"time"

	"github.com/containernetworking/cni/pkg/skel"
	"github.com/containernetworking/cni/pkg/types"
	"github.com/containernetworking/cni/pkg/types/current"
	"github.com/containernetworking/cni/pkg/version"
	"go.uber.org/zap"
	"k8s.io/client-go/kubernetes"

	"github.com/kumahq/kuma/pkg/core"
)

const (
	podRetrievalMaxRetries = 30
	podRetrievalInterval   = 1 * time.Second
)

var (
	log = core.Log.WithName("cni")
)

// Kubernetes a K8s specific struct to hold config
type Kubernetes struct {
	Kubeconfig        string   `json:"kubeconfig"`
	ExcludeNamespaces []string `json:"exclude_namespaces"`
	CniBinDir         string   `json:"cni_bin_dir"`
}

type PluginConf struct {
	types.NetConf // You may wish to not nest this type

	RawPrevResult *map[string]interface{} `json:"prevResult"`
	PrevResult    *current.Result         `json:"-"`

	// plugin-specific fields
	LogLevel   string     `json:"log_level"`
	Kubernetes Kubernetes `json:"kubernetes"`
}

// K8sArgs is the valid CNI_ARGS used for Kubernetes
// The field names need to match exact keys in kubelet args for unmarshalling
type K8sArgs struct {
	types.CommonArgs
	IP                         net.IP
	K8S_POD_NAME               types.UnmarshallableString // nolint: golint, stylecheck
	K8S_POD_NAMESPACE          types.UnmarshallableString // nolint: golint, stylecheck
	K8S_POD_INFRA_CONTAINER_ID types.UnmarshallableString // nolint: golint, stylecheck
}

// parseConfig parses the supplied configuration (and prevResult) from stdin.
func parseConfig(stdin []byte) (*PluginConf, error) {
	conf := PluginConf{}

	if err := json.Unmarshal(stdin, &conf); err != nil {
		return nil, fmt.Errorf("failed to parse network configuration: %v", err)
	}

	// Parse previous result. Remove this if your plugin is not chained.
	if conf.RawPrevResult != nil {
		resultBytes, err := json.Marshal(conf.RawPrevResult)
		if err != nil {
			return nil, fmt.Errorf("could not serialize prevResult: %v", err)
		}
		res, err := version.NewResult(conf.CNIVersion, resultBytes)
		if err != nil {
			return nil, fmt.Errorf("could not parse prevResult: %v", err)
		}
		conf.RawPrevResult = nil
		conf.PrevResult, err = current.NewResultFromResult(res)
		if err != nil {
			return nil, fmt.Errorf("could not convert result to current version: %v", err)
		}
	}
	// End previous result parsing

	return &conf, nil
}

// cmdAdd is called for ADD requests
func cmdAdd(args *skel.CmdArgs) error {
	conf, err := parseConfig(args.StdinData)
	if err != nil {
		log.Error(err, "error parsing kuma-cni cmdAdd config")
		return err
	}
	logPrevResult(conf)

	// Determine if running under k8s by checking the CNI args
	k8sArgs := K8sArgs{}
	if err := types.LoadArgs(args.Args, &k8sArgs); err != nil {
		log.Error(err, "error loading kuma-cni cmdAdd args")
		return err
	}
	logContainerInfo(args.Args, args.ContainerID, k8sArgs)

	// TODO: this whole nested mess needs to be rewritten
	if string(k8sArgs.K8S_POD_NAMESPACE) != "" && string(k8sArgs.K8S_POD_NAME) != "" {
		excludePod := shouldExcludePod(conf.Kubernetes.ExcludeNamespaces, k8sArgs.K8S_POD_NAMESPACE)
		if !excludePod {
			client, err := newKubeClient(*conf)
			if err != nil {
				return err
			}
			log.V(1).Info("created Kubernetes client", zap.Reflect("client", client))
			containers, initContainersMap, annotations, err := getPodInfoWithRetries(client, k8sArgs)
			if err != nil {
				return err
			}
			excludePod = checkInitContainerPresent(initContainersMap, k8sArgs, excludePod)

			log.V(1).Info("container count in a pod", zap.Int("count", containers))
			if containers > 1 {
				logAnnotations(args, k8sArgs, annotations)
				excludePod = checkAnnotationPresent(annotations, excludePod)

				if !excludePod {
					if intermediateConfig, configErr := NewIntermediateConfig(annotations); configErr != nil {
						log.Error(configErr, "pod intermediateConfig failed due to bad params")
					} else {
						// Get the constructor for the configured type of InterceptRuleMgr
						if err := Inject(args.Netns, intermediateConfig); err != nil {
							log.Error(err, "could not inject rules into namespace")
							return err
						}
					}
				} else {
					log.Info("internal pod excluded")
				}
			} else {
				log.Info("not enough containers in pod")
			}
		} else {
			log.Info("pod excluded")
		}
	} else {
		log.Info("no kubernetes data")
	}

	var result *current.Result
	if conf.PrevResult == nil {
		result = &current.Result{
			CNIVersion: current.ImplementedSpecVersion,
		}
	} else {
		// Pass through the result for the next plugin
		result = conf.PrevResult
	}
	log.Info("Result: %v", zap.Any("result", result))
	return types.PrintResult(result, conf.CNIVersion)
}

func logAnnotations(args *skel.CmdArgs, k8sArgs K8sArgs, annotations map[string]string) {
	log.V(1).Info("checking annotations prior to injecting redirect",
		zap.String("containerID", args.ContainerID),
		zap.String("netns", args.Netns),
		zap.String("pod", string(k8sArgs.K8S_POD_NAME)),
		zap.String("namespace", string(k8sArgs.K8S_POD_NAMESPACE)),
		zap.Reflect("annotations", annotations))
}

func checkAnnotationPresent(annotations map[string]string, excludePod bool) bool {
	val, ok := annotations["kuma.io/sidecar-injected"]
	if !ok || val != "true" {
		log.Info("pod excluded due to lack of 'kuma.io/sidecar-injected: true' annotation")
		excludePod = true
	}
	return excludePod
}

func checkInitContainerPresent(initContainersMap map[string]struct{}, k8sArgs K8sArgs, excludePod bool) bool {
	// Check if kuma-init container is present; in that case exclude pod
	if _, present := initContainersMap["kuma-init"]; present {
		log.V(1).Info("pod excluded due to being already injected with kuma-init container",
			zap.String("pod", string(k8sArgs.K8S_POD_NAME)),
			zap.String("namespace", string(k8sArgs.K8S_POD_NAMESPACE)))
		excludePod = true
	}
	return excludePod
}

func getPodInfoWithRetries(client *kubernetes.Clientset, k8sArgs K8sArgs) (int, map[string]struct{}, map[string]string, error) {
	var containers int
	var initContainersMap map[string]struct{}
	var annotations map[string]string
	var k8sErr error
	for attempt := 1; attempt <= podRetrievalMaxRetries; attempt++ {
		containers, initContainersMap, annotations, k8sErr = getKubePodInfo(client, string(k8sArgs.K8S_POD_NAME), string(k8sArgs.K8S_POD_NAMESPACE))
		if k8sErr == nil {
			break
		}
		log.Info("waiting for pod metadata", zap.Error(k8sErr), zap.Int("attempt", attempt))
		time.Sleep(podRetrievalInterval)
	}
	if k8sErr != nil {
		log.Error(k8sErr, "failed to get pod data")
		return 0, nil, nil, k8sErr
	}
	return containers, initContainersMap, annotations, nil
}

func shouldExcludePod(excludedNamespaces []string, podNamespace types.UnmarshallableString) bool {
	excludePod := false
	for _, excludeNs := range excludedNamespaces {
		if string(podNamespace) == excludeNs {
			excludePod = true
			break
		}
	}
	return excludePod
}

func logContainerInfo(args string, containerID string, k8sArgs K8sArgs) {
	log.Info("getting identifiers with arguments: %s", zap.String("arguments", args))
	log.Info("loaded k8s arguments: %v", zap.Any("k8s args", k8sArgs))
	log.Info("container information",
		zap.String("containerID", containerID),
		zap.String("pod", string(k8sArgs.K8S_POD_NAME)),
		zap.String("namespace", string(k8sArgs.K8S_POD_NAMESPACE)))
}

func logPrevResult(conf *PluginConf) {
	var loggedPrevResult interface{}
	if conf.PrevResult == nil {
		loggedPrevResult = "none"
	} else {
		loggedPrevResult = conf.PrevResult
	}

	log.V(1).Info("cmdAdd config parsed",
		zap.String("version", conf.CNIVersion),
		zap.Reflect("prevResult", loggedPrevResult))
}

func cmdGet(args *skel.CmdArgs) error {
	log.Info("cmdGet not implemented")
	// TODO: implement
	return nil
}

// cmdDel is called for DELETE requests
func cmdDel(args *skel.CmdArgs) error {
	log.Info("cmdDel not implemented")
	// TODO: implement
	return nil
}

func main() {
	// TODO: implement plugin version
	skel.PluginMain(cmdAdd, cmdGet, cmdDel, version.All, "kuma-cni")
}
