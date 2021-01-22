(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["wizard-dataplane-kubernetes"],{"0350":function(e,a){e.exports={apiVersion:"v1",kind:"Namespace",metadata:{name:null,namespace:null,annotations:{"kuma.io/sidecar-injection":"enabled","kuma.io/mesh":null}}}},"259a":function(e,a,t){"use strict";var s=t("c1f9"),n=t.n(s);n.a},7893:function(e,a,t){"use strict";var s=t("9850"),n=t.n(s);n.a},9850:function(e,a,t){},a527:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"wizard"},[t("div",{staticClass:"wizard__content"},[t("StepSkeleton",{attrs:{steps:e.steps,"advance-check":!0,"sidebar-content":e.sidebarContent,"footer-enabled":!1===e.hideScannerSiblings,"next-disabled":e.nextDisabled}},[t("template",{slot:"general"},[t("p",[e._v(" Welcome to the wizard to create a new Dataplane resource in "+e._s(e.title)+". We will be providing you with a few steps that will get you started. ")]),t("p",[e._v(" As you know, the "+e._s(e.$productName)+" GUI is read-only. ")]),t("Switcher"),t("h3",[e._v(" To get started, please select on what Mesh you would like to add the Dataplane: ")]),t("p",[e._v(" If you've got an existing Mesh that you would like to associate with your Dataplane, you can select it below, or create a new one using our Mesh Wizard. ")]),t("KCard",{staticClass:"my-6",attrs:{"has-shadow":""}},[t("template",{slot:"body"},[t("FormFragment",{attrs:{title:"Choose a Mesh","for-attr":"dp-mesh","all-inline":""}},[t("div",[t("select",{directives:[{name:"model",rawName:"v-model",value:e.validate.meshName,expression:"validate.meshName"}],staticClass:"k-input w-100",attrs:{id:"dp-mesh"},on:{change:function(a){var t=Array.prototype.filter.call(a.target.options,(function(e){return e.selected})).map((function(e){var a="_value"in e?e._value:e.value;return a}));e.$set(e.validate,"meshName",a.target.multiple?t:t[0])}}},[t("option",{attrs:{disabled:"",value:""}},[e._v(" Select an existing Mesh… ")]),e._l(e.meshes.items,(function(a){return t("option",{key:a.name,domProps:{value:a.name}},[e._v(" "+e._s(a.name)+" ")])}))],2)]),t("div",[t("label",{staticClass:"k-input-label mr-4"},[e._v(" or ")]),t("KButton",{attrs:{to:{name:"create-mesh"},appearance:"primary"}},[e._v(" Create a new Mesh ")])],1)])],1)],2)],1),t("template",{slot:"scope-settings"},[t("h3",[e._v(" Setup Dataplane Mode ")]),t("p",[e._v(" You can create a data plane for a service or a data plane for a Gateway. ")]),t("KCard",{staticClass:"my-6",attrs:{"has-shadow":""}},[t("template",{slot:"body"},[t("FormFragment",{attrs:{"all-inline":"","equal-cols":"","hide-label-col":""}},[t("label",{attrs:{for:"service-dataplane"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.validate.k8sDataplaneType,expression:"validate.k8sDataplaneType"}],staticClass:"k-input",attrs:{id:"service-dataplane",type:"radio",name:"dataplane-type",value:"dataplane-type-service",checked:""},domProps:{checked:e._q(e.validate.k8sDataplaneType,"dataplane-type-service")},on:{change:function(a){return e.$set(e.validate,"k8sDataplaneType","dataplane-type-service")}}}),t("span",[e._v(" Service Dataplane ")])]),t("label",{attrs:{for:"ingress-dataplane"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.validate.k8sDataplaneType,expression:"validate.k8sDataplaneType"}],staticClass:"k-input",attrs:{id:"ingress-dataplane",type:"radio",name:"dataplane-type",value:"dataplane-type-ingress",disabled:""},domProps:{checked:e._q(e.validate.k8sDataplaneType,"dataplane-type-ingress")},on:{change:function(a){return e.$set(e.validate,"k8sDataplaneType","dataplane-type-ingress")}}}),t("span",[e._v(" Ingress Dataplane ")])])])],1)],2),"dataplane-type-service"===e.validate.k8sDataplaneType?t("div",[t("p",[e._v(" Should the data plane be added for an entire Namespace and all of its services, or for specific individual services in any namespace? ")]),t("KCard",{staticClass:"my-6",attrs:{"has-shadow":""}},[t("template",{slot:"body"},[t("FormFragment",{attrs:{"all-inline":"","equal-cols":"","hide-label-col":""}},[t("label",{attrs:{for:"k8s-services-all"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.validate.k8sServices,expression:"validate.k8sServices"}],staticClass:"k-input",attrs:{id:"k8s-services-all",type:"radio",name:"k8s-services",value:"all-services",checked:""},domProps:{checked:e._q(e.validate.k8sServices,"all-services")},on:{change:function(a){return e.$set(e.validate,"k8sServices","all-services")}}}),t("span",[e._v(" All Services in Namespace ")])]),t("label",{attrs:{for:"k8s-services-individual"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.validate.k8sServices,expression:"validate.k8sServices"}],staticClass:"k-input",attrs:{id:"k8s-services-individual",type:"radio",name:"k8s-services",value:"individual-services",disabled:"disabled"},domProps:{checked:e._q(e.validate.k8sServices,"individual-services")},on:{change:function(a){return e.$set(e.validate,"k8sServices","individual-services")}}}),t("span",[e._v(" Individual Services ")])])])],1)],2),"individual-services"===e.validate.k8sServices?t("KCard",{staticClass:"my-6",attrs:{"has-shadow":""}},[t("template",{slot:"body"},[t("FormFragment",{attrs:{title:"Deployments","for-attr":"k8s-deployment-selection"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.validate.k8sServiceDeploymentSelection,expression:"validate.k8sServiceDeploymentSelection"}],staticClass:"k-input w-100",attrs:{id:"k8s-service-deployment-new",type:"text",placeholder:"your-new-deployment",required:""},domProps:{value:e.validate.k8sServiceDeploymentSelection},on:{input:function(a){a.target.composing||e.$set(e.validate,"k8sServiceDeploymentSelection",a.target.value)}}})])],1)],2):e._e(),t("KCard",{staticClass:"my-6",attrs:{"has-shadow":""}},[t("template",{slot:"body"},[t("FormFragment",{attrs:{title:"Namespace","for-attr":"k8s-namespace-selection"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.validate.k8sNamespaceSelection,expression:"validate.k8sNamespaceSelection"}],staticClass:"k-input w-100",attrs:{id:"k8s-namespace-new",type:"text",placeholder:"your-namespace",required:""},domProps:{value:e.validate.k8sNamespaceSelection},on:{input:function(a){a.target.composing||e.$set(e.validate,"k8sNamespaceSelection",a.target.value)}}})])],1)],2)],1):e._e(),"dataplane-type-ingress"===e.validate.k8sDataplaneType?t("div",[t("p",[e._v(" "+e._s(e.title)+" natively supports the Kong Ingress. Do you want to deploy Kong or another Ingress? ")]),t("KCard",{staticClass:"my-6",attrs:{"has-shadow":""}},[t("template",{slot:"body"},[t("FormFragment",{attrs:{"all-inline":"","equal-cols":"","hide-label-col":""}},[t("label",{attrs:{for:"k8s-ingress-kong"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.validate.k8sIngressBrand,expression:"validate.k8sIngressBrand"}],staticClass:"k-input",attrs:{id:"k8s-ingress-kong",type:"radio",name:"k8s-ingress-brand",value:"kong-ingress",checked:""},domProps:{checked:e._q(e.validate.k8sIngressBrand,"kong-ingress")},on:{change:function(a){return e.$set(e.validate,"k8sIngressBrand","kong-ingress")}}}),t("span",[e._v(" Kong Ingress ")])]),t("label",{attrs:{for:"k8s-ingress-other"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.validate.k8sIngressBrand,expression:"validate.k8sIngressBrand"}],staticClass:"k-input",attrs:{id:"k8s-ingress-other",type:"radio",name:"k8s-ingress-brand",value:"other-ingress"},domProps:{checked:e._q(e.validate.k8sIngressBrand,"other-ingress")},on:{change:function(a){return e.$set(e.validate,"k8sIngressBrand","other-ingress")}}}),t("span",[e._v(" Other Ingress ")])])])],1)],2),t("KCard",{staticClass:"my-6",attrs:{"has-shadow":""}},[t("template",{slot:"body"},[t("FormFragment",{attrs:{title:"Deployments","for-attr":"k8s-deployment-selection"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.validate.k8sIngressDeployment,expression:"validate.k8sIngressDeployment"}],staticClass:"k-input w-100",attrs:{id:"k8s-ingress-deployment-new",type:"text",placeholder:"your-deployment",required:""},domProps:{value:e.validate.k8sIngressDeployment},on:{input:function(a){a.target.composing||e.$set(e.validate,"k8sIngressDeployment",a.target.value)}}})])],1)],2),"other-ingress"===e.validate.k8sIngressBrand?t("KAlert",{attrs:{appearance:"info"}},[t("template",{slot:"alertMessage"},[t("p",[e._v(' Please go ahead and deploy the Ingress first, then restart this wizard and select "Existing Ingress". ')])])],2):e._e()],1):e._e()],1),t("template",{slot:"complete"},[e.validate.meshName?t("div",[!1===e.hideScannerSiblings?t("div",[t("h3",[e._v(" Install a new Dataplane ")]),t("p",[e._v(" You can now execute the following commands to automatically inject the sidecar proxy in every Pod, and by doing so creating the Dataplane. ")]),t("Tabs",{attrs:{loaders:!1,tabs:e.tabs,"has-border":!0,"initial-tab-override":"kubernetes"}},[t("template",{slot:"kubernetes"},[t("CodeView",{attrs:{title:"Kubernetes","copy-button-text":"Copy Command to Clipboard",lang:"bash",content:e.codeOutput}})],1)],2),e.dataplaneUrl?t("div",[t("KAlert",{attrs:{appearance:"info"}},[t("template",{slot:"alertIcon"},[t("KIcon",{attrs:{icon:"portal"}})],1),t("template",{slot:"alertMessage"},[e._v(" Once you have completed the steps above, you can go to the "),t("router-link",{attrs:{to:e.dataplaneUrl}},[e._v(" data plane proxies view ")]),e._v(". ")],1)],2)],1):e._e()],1):e._e()]):t("KAlert",{attrs:{appearance:"danger"}},[t("template",{slot:"alertMessage"},[t("p",[e._v(" Please return to the first step and make sure to select an existing Mesh, or create a new one. ")])])],2)],1),t("template",{slot:"dataplane"},[t("h3",[e._v("Dataplane")]),t("p",[e._v(" In "+e._s(e.title)+", a Dataplane resource represents a data plane proxy running alongside one of your services. Data plane proxies can be added in any Mesh that you may have created, and in Kubernetes, they will be auto-injected by "+e._s(e.title)+". ")])]),t("template",{slot:"example"},[t("h3",[e._v("Example")]),t("p",[e._v(" Below is an example of a Dataplane resource output: ")]),t("code",[t("pre",[e._v("apiVersion: 'kuma.io/v1alpha1'\nkind: Dataplane\nmesh: default\nmetadata:\n  name: dp-echo-1\n  annotations:\n    kuma.io/sidecar-injection: enabled\n    kuma.io/mesh: default\nnetworking:\n  address: 10.0.0.1\n  inbound:\n  - port: 10000\n    servicePort: 9000\n    tags:\n      kuma.io/service: echo")])])])],2)],1)])},n=[],i=(t("b0c0"),t("d3b7"),t("ac1f"),t("5319"),t("498a"),t("f3f3")),r=t("2f62"),o=t("cfb0"),l=t("ad2f"),d=t("2791"),c=t("251b"),p=t("4c4d"),v=t("e108"),u=t("12d5"),m=t("0350"),h=t.n(m),g={name:"DataplaneWizardKubernetes",metaInfo:{title:"Create a new Dataplane on Kubernetes"},components:{FormFragment:d["a"],Tabs:c["a"],StepSkeleton:p["a"],Switcher:v["a"],CodeView:u["a"]},mixins:[l["a"],o["a"]],data:function(){return{schema:h.a,steps:[{label:"General",slug:"general"},{label:"Scope Settings",slug:"scope-settings"},{label:"Install",slug:"complete"}],tabs:[{hash:"#kubernetes",title:"Kubernetes"}],sidebarContent:[{name:"dataplane"},{name:"example"}],startScanner:!1,scanFound:!1,hideScannerSiblings:!1,scanError:!1,isComplete:!1,nextDisabled:!0,validate:{meshName:"",k8sDataplaneType:"dataplane-type-service",k8sServices:"all-services",k8sNamespace:"",k8sNamespaceSelection:"",k8sServiceDeployment:"",k8sServiceDeploymentSelection:"",k8sIngressDeployment:"",k8sIngressDeploymentSelection:"",k8sIngressType:"",k8sIngressBrand:"kong-ingress",k8sIngressSelection:""},vmsg:[]}},computed:Object(i["a"])(Object(i["a"])({},Object(r["b"])({title:"getTagline",version:"getVersion",environment:"getEnvironment",formData:"getStoredWizardData",selectedTab:"getSelectedTab",meshes:"getMeshList"})),{},{dataplaneUrl:function(){"".concat(window.location.origin,"/#");var e=this.validate;return!(!e.meshName||!e.k8sNamespaceSelection)&&{name:"dataplanes",params:{mesh:e.meshName}}},codeOutput:function(){var e=Object.assign({},this.schema),a=this.validate.k8sNamespaceSelection;if(a){e.metadata.name=a,e.metadata.namespace=a,e.metadata.annotations["kuma.io/mesh"]=this.validate.meshName;var t='" | kubectl apply -f - && kubectl delete pod --all -n '.concat(a),s=this.formatForCLI(e,t);return s}}}),watch:{validate:{handler:function(){var e=JSON.stringify(this.validate),a=this.validate.meshName;localStorage.setItem("storedFormData",e),a.length?this.nextDisabled=!1:this.nextDisabled=!0,1===this.$route.query.step&&(this.validate.k8sNamespaceSelection?this.nextDisabled=!1:this.nextDisabled=!0)},deep:!0},"validate.k8sNamespaceSelection":function(e){var a=e.replace(/[^a-zA-Z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim();this.validate.k8sNamespaceSelection=a},$route:function(){var e=this.$route.query.step;1===e&&(this.validate.k8sNamespaceSelection?this.nextDisabled=!1:this.nextDisabled=!0)}},methods:{scanForEntity:function(){var e=this,a=this.validate,t=a.meshName,s="test";this.scanComplete=!1,this.scanError=!1,t&&s&&this.$api.getDataplaneFromMesh(t,s).then((function(a){a&&a.name.length>0?(e.isRunning=!0,e.scanFound=!0):e.scanError=!0})).catch((function(a){e.scanError=!0,console.error(a)})).finally((function(){e.scanComplete=!0}))}}},k=g,y=(t("7893"),t("2877")),b=Object(y["a"])(k,s,n,!1,null,"3703d37d",null);a["default"]=b.exports},ad2f:function(e,a,t){"use strict";t("99af");var s=t("e80b"),n=t.n(s);a["a"]={methods:{formatForCLI:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:'" | kumactl apply -f -',t='echo "',s=n()(e);return"".concat(t).concat(s).concat(a)}}}},c1f9:function(e,a,t){},e108:function(e,a,t){"use strict";var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"wizard-switcher"},[t("KEmptyState",{ref:"emptyState",staticClass:"my-6 wizard-empty-state",attrs:{"cta-is-hidden":"","is-error":!e.environment}},["kubernetes"===e.environment||"universal"===e.environment?t("template",{slot:"title"},[e._v(" Running on "),t("span",{staticClass:"env-name"},[e._v(e._s(e.environment))])]):e._e(),t("template",{slot:"message"},["kubernetes"===e.environment?t("div",[this.$route.name===e.wizardRoutes.kubernetes?t("div",[t("p",[e._v(" We have detected that you are running on a "),t("strong",[e._v("Kubernetes environment")]),e._v(", and we are going to be showing you instructions for Kubernetes unless you decide to visualize the instructions for Universal. ")]),t("p",[t("KButton",{attrs:{to:{name:e.wizardRoutes.universal},appearance:"primary"}},[e._v(" Switch to Universal instructions ")])],1)]):this.$route.name===e.wizardRoutes.universal?t("div",[t("p",[e._v(" We have detected that you are running on a "),t("strong",[e._v("Kubernetes environment")]),e._v(", but you are viewing instructions for Universal. ")]),t("p",[t("KButton",{attrs:{to:{name:e.wizardRoutes.kubernetes},appearance:"primary"}},[e._v(" Switch back to Kubernetes instructions ")])],1)]):e._e()]):"universal"===e.environment?t("div",[this.$route.name===e.wizardRoutes.kubernetes?t("div",[t("p",[e._v(" We have detected that you are running on a "),t("strong",[e._v("Universal environment")]),e._v(", but you are viewing instructions for Kubernetes. ")]),t("p",[t("KButton",{attrs:{to:{name:e.wizardRoutes.universal},appearance:"primary"}},[e._v(" Switch back to Universal instructions ")])],1)]):this.$route.name===e.wizardRoutes.universal?t("div",[t("p",[e._v(" We have detected that you are running on a "),t("strong",[e._v("Universal environment")]),e._v(", and we are going to be showing you instructions for Universal unless you decide to visualize the instructions for Kubernetes. ")]),t("p",[t("KButton",{attrs:{to:{name:e.wizardRoutes.kubernetes},appearance:"primary"}},[e._v(" Switch to Kubernetes instructions ")])],1)]):e._e()]):e._e()])],2)],1)},n=[],i=t("f3f3"),r=t("2f62"),o={name:"Switcher",data:function(){return{wizardRoutes:{kubernetes:"kubernetes-dataplane",universal:"universal-dataplane"}}},computed:Object(i["a"])(Object(i["a"])({},Object(r["b"])({environment:"getEnvironment"})),{},{instructionsCtaText:function(){return"universal"===this.environment?"Switch to Kubernetes instructions":"Switch to Universal instructions"},instructionsCtaRoute:function(){return"kubernetes"===this.environment?{name:"universal-dataplane"}:{name:"kubernetes-dataplane"}}})},l=o,d=(t("259a"),t("2877")),c=Object(d["a"])(l,s,n,!1,null,"74db9631",null);a["a"]=c.exports}}]);