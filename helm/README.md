# Helm Deploy
- 
# Helm 
- Helm is a package manager for kubernetes
- Streamlines installations and management of kubernetes apps.
- Helm charts are the packages format.
- Helm proposed concept is the package all config files into the single chart.

# Terraform 
- As an alternative with the Helm, we can use Terraform (configuration file) to create Infastructure to host let's say microservice, docker containers.
- Three configs created in Terraform (app.terraform.io),
    - App (deploy app)
    - Core (Infrastucture service deploy, ingress for traffic manage to pods, egress allow other cluster pods call connection.)
    - Cluster (Deploy Kubernetes Cluster, we can use GKE(Google Kubernetes Engine), eks, aks)
- A tool, Ansible used to create configuration on infastructure.
- Terraform config file (.tf extension file name) which is developed to controll all created terraform Wokspaces.
- GKE based cluster will be build, with terraform.
- Helm provider can use in Core build with terraform.
- We can connect terraform with git, GKE, when the user push the data to git the auto updates can be maded.
- Terraform operator can used to create a new cluster with allconfigs appplied (when user pushed code to App).

# Helm Chart
- Helm chart is a collection of files which describes the related set of Kubernetes resources.
- Package of all Kubernetes manifest files, advertised to kubernetes clusters.
- A single chart can used to deploy something simple Nginx pod, or complex as full stack app with HTTP server and DB.
- Helm chart help you to define, install, upgrade, rollback even complex kubernetes applications.
    # Components 
    - chart.yml : contains meta information about the chart, version number etc...
    - values.yml : keeps the values for templates files (deployment name, container name.)
    - Charts : Contains other depended charts.
    - Templates: Contains the actual manifests, for deploying, service, configmap, secret etc...

# Helm commands
- Helm install : Install helm charts
- Helm search : Search for chart in repository. (artifacthub.io) / use command : helm search hub wordpress / helm search repo wordpress
- Helm list : List all the deployed releases.
- Helm upgrade : Upgrade with new releases.
- Helm  delete: Delete the release and all deployed resources.
- Helm create: Create a helm chart.

# Helm installations
- Binary installations : The file can be copied to ready to use.
- MacOS - brew install helm
- Create helm chart : helm create my-node-chart
- Configure with our docker image created.
- Inside the created chart folder open terminal.
- Install chart: helm repo add bitnami https://charts.bitnami.com/bitnami, helm install my-node-1 bitnami/node
    Since the release name is needed to be added by us, my-node-1 is the release name.
- Delete release: helm delete my-node-1
- Get helm history : helm history my-node-1

# Helm chart config
- Chart.yml : Configure the chart info
- values.yml: contains all values
- deployment.yml, service.yml - Deployment, service manifest those get values from the values.yml
- Lint the helm changes: helm lint my-node-chart/ 
    Here name of helm chart is needed as input last.