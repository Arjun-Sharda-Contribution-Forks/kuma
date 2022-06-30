package main

import (
	"context"
	"go.uber.org/zap"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

func newKubeClient(conf PluginConf) (*kubernetes.Clientset, error) {
	kubeconfig := conf.Kubernetes.Kubeconfig
	config, err := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(
		&clientcmd.ClientConfigLoadingRules{ExplicitPath: kubeconfig},
		&clientcmd.ConfigOverrides{},
	).ClientConfig()

	if err != nil {
		log.Error(err, "failed setting up kubernetes client with kubeconfig", zap.String("kubeconfig", kubeconfig))
		return nil, err
	}

	log.V(1).Info("set up kubernetes client with kubeconfig",
		zap.String("kubeconfig", kubeconfig),
		zap.Any("config", config),
	)

	return kubernetes.NewForConfig(config)
}

// getK8sPodInfo returns information of a POD
func getKubePodInfo(client *kubernetes.Clientset, podName, podNamespace string) (containers int, initContainers map[string]struct{}, annotations map[string]string, err error) {
	pod, err := client.CoreV1().Pods(podNamespace).Get(context.Background(), podName, metav1.GetOptions{})
	log.V(1).Info("pod info", zap.Any("pod", pod))
	if err != nil {
		log.Error(err, "can't get pod info")
		return 0, nil, nil, err
	}

	initContainers = map[string]struct{}{}
	for _, initContainer := range pod.Spec.InitContainers {
		initContainers[initContainer.Name] = struct{}{}
	}

	return len(pod.Spec.Containers), initContainers, pod.Annotations, nil
}
