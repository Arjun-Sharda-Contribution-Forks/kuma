package server

import (
	"net/http"

	"github.com/Kong/konvoy/components/konvoy-control-plane/app/konvoy-injector/pkg/injector"
	konvoy_injector_conf "github.com/Kong/konvoy/components/konvoy-control-plane/pkg/config/app/konvoy-injector"

	kube_manager "sigs.k8s.io/controller-runtime/pkg/manager"
	kube_webhook "sigs.k8s.io/controller-runtime/pkg/webhook"
)

func Setup(mgr kube_manager.Manager, cfg *konvoy_injector_conf.Config) error {
	webhookServer := &kube_webhook.Server{
		Host:    cfg.WebHookServer.Address,
		Port:    int(cfg.WebHookServer.Port),
		CertDir: cfg.WebHookServer.CertDir,
	}
	webhookServer.Register("/inject-sidecar", PodMutatingWebhook(injector.InjectKonvoy))
	webhookServer.WebhookMux.HandleFunc("/healthy", func(resp http.ResponseWriter, _ *http.Request) {
		resp.WriteHeader(http.StatusOK)
	})
	webhookServer.WebhookMux.HandleFunc("/ready", func(resp http.ResponseWriter, _ *http.Request) {
		resp.WriteHeader(http.StatusOK)
	})
	return mgr.Add(webhookServer)
}
