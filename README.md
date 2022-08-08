# SampleNodeJS
- npm config edit (optional to edit in text format)
- npm config delete no-proxy
- npm install express
- Create Dockerfile : touch dockerfile
- create dockerignore to restrict the override of local files on our repo - touch .dockerignore
- create docker image (himesh27 is my username is dockerhub) -  docker build -t himesh27/samplenode .
- test run the image - docker run -d -p 3000:3000 himesh27/samplenode 
- get ip address and check exposed url(MAC os) - /sbin/ifconfig
- Push to dockerhub with docker login - docker login
-  Create yml file for deployment and service - and deploy both files
- NodePort, LoadBalancer can be used as deployment types, if LoadBalancer is used we use (minikube tunnel) command to tunnel routable ip in other bash window.
- Get the exposed service: minikube service SERVICENAME
- (--url) as optional

# Docker cmds
- build image : sudo docker build -t BUILDNAME:1.0.0 .
- (1.0.0) is the tag and '.' is the context at the last
- To see docker images - sudo docker images 
- Run contaniner - sudo docker run -p 3000:8000 BUILDNAME:1.0.0
- (-p) used to give publish info of docker, here 8000 port of docker is exposed in 3000 only
- See running containers - sudo docker ps
- stop container - sudo docker stop CONTAINERID
- Run docker in background, '-d' is used - sudo docker run -d -p 8000:8000 BUILDNAME:1.0.0
- TCP/UDP ports expose -  sudo docker run -d -p 8000:8000 -p 8080:80/tcp BUILDNAME:1.0.0
- Docker images list - docker image ls
- Delete images - docker image rm

# DockerHub cmds steps
- login to docker - docker login
- push the docker image to dockerhub - docker push BUILDNAME:latest
- The tag 'latest', for letting know latest version

# Kubernetes Installation
- Using curl / mac ports / homebrew -  brew install kubernetes-cli
- Check version uptodate - kubectl version --client
- Detailed version check- kubectl version --client --output=yaml
- We should start minikube for working in kubernetes env (since it is a local configuration setup)
- kubernetes cluster information - kubectl cluster-info
- get all kubernetes nodes - kubectl get nodes 
- get kubernetes deployments - kubectl get deployments --all-namespaces
- services of kubernetes - kubectl get services
-  Pods :- kubectl get pods, kubectl describe pods
- Create new deployments :- kubectl create deployment NAME --image = IMAGEREPO
- Deployment name is refer in "NAME", 'IMAGEREPO' represents the image of a container (sample IMAGE: k8s.gcr.io/echoserver:1.10)
-Get all deployments - kubectl get deployments
- Detailed info of deployments can get - kubectl describe deployments DEPLOYNAME
- Expose the deployment public - kubectl expose deployment DEPLOYNAME --type=NodePort --port=3000
- Get services of kubernetes - kubectl get service 
- Get public URL - minikube service test-node --url
- Details of service - kubectl describe services DEPLOYNAME
- Delete service / deployment - kubectl delete service/deployment DEPLOYNAME
- Port forwarding, which listen to localhost/7080 - kubectl port-forward service/nodeapplication-service 7080:8000

# Create Service, deployment, Pods
- Explain pod content - kubectl explain pod
- Create pod - kubectl create -f FILENAME
- Get created pods - kubectl get pods
- Delete pods - kubectl delete pod PODNAME
- Get pod details in yaml - kubectl get pods -o yaml
- Explain deployment yaml content - kubectl explain deployment
- Create deployment/service - kubectl apply -f FILENAME
- Delete service/deployment - kubectl delete service/deployment PODNAME

# minikube install
- Homebrew - brew install minikube
- If outdated, minikube and fails, try - brew unlink minikube, brew link minikube
- strart, stop, pause - minikube start / stop --driver none
- Increase the default memory limit (requires a restart): minikube config set memory 16384
- Browse the catalog of easily installed Kubernetes services: minikube addons list
- Create a second cluster running an older Kubernetes release: minikube start -p aged --kubernetes-version=v1.16.1
- Delete all of the minikube clusters: minikube delete --all
- minikube status get: minikube status 
- minikube deployment public url - minikube service test-node --url