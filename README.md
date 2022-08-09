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
- Deployment name is refer in "NAME", 'IMAGEREPO' represents the image of a container (sample IMAGE: k8s.gcr.io/echoserver:1.10). We need to provide the deployment name and app image location (include the full repository url for images hosted outside Docker hub).
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
- Get deployment public url - kubectl service test-node --url

# minikube install (Local study)
- Homebrew - brew install minikube
- If outdated, minikube and fails, try - brew unlink minikube, brew link minikube
- strart, stop, pause - minikube start / stop --driver none
- Increase the default memory limit (requires a restart): minikube config set memory 16384
- Browse the catalog of easily installed Kubernetes services: minikube addons list
- Create a second cluster running an older Kubernetes release: minikube start -p aged --kubernetes-version=v1.16.1
- Delete all of the minikube clusters: minikube delete --all
- minikube status get: minikube status 
- minikube deployment public url - minikube service test-node --url

# Kubectl Proxy
- The kubectl command can create a proxy that will forward communications into the cluster-wide, private network. The proxy can be terminated by pressing control-C and won't show any output while its running.
We will open a second terminal window to run the proxy.
- We now have a connection between our host (the online terminal) and the Kubernetes cluster. The proxy enables direct access to the API from these terminals. Eg: curl http://localhost:8001/version will give version info.
- First we need to get the Pod name, and we'll store in the environment variable POD_NAME:
    export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
    echo Name of the Pod: $POD_NAME
-You can access the Pod through the API by running:
    curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/
-we use the exec command and use the name of the Pod as a parameter. Let’s list the environment variables:
    kubectl exec $POD_NAME -- env

# Bash Session in kubectl pod
- Next let’s start a bash session in the Pod’s container:
    kubectl exec -ti $POD_NAME -- bash
- We have now an open console on the container where we run our NodeJS application. The source code of the app is in the server.js file:
    cat server.js
- You can check that the application is up by running a curl command:
    curl localhost:8080
- Use exit for exiting - exit

# Services 
- Services can be exposed in different ways by specifying a type in the ServiceSpec:
    - ClusterIP (default) - Exposes the Service on an internal IP in the cluster. This type makes the Service only reachable from within the cluster.
    - NodePort - Exposes the Service on the same port of each selected Node in the cluster using NAT. Makes a Service accessible from outside the cluster using 'NodeIP:NodePort'. Superset of ClusterIP.
    - LoadBalancer - Creates an external load balancer in the current cloud (if supported) and assigns a fixed, external IP to the Service. Superset of NodePort.
    - ExternalName - Maps the Service to the contents of the externalName field (e.g. foo.bar.example.com), by returning a CNAME record with its value. 
    # Cmds
    - Create an environment variable called NODE_PORT that has the value of the Node port assigned:

        export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
        echo NODE_PORT=$NODE_PORT
    - Now we can test that the app is exposed outside of the cluster using curl, the IP of the Node and the externally exposed port:
        curl $(minikube ip):$NODE_PORT

# Update/Get deployment/service data with label
 - kubectl get pods command with -l as a parameter, followed by the label values:
    kubectl get pods -l app=kubernetes-bootcamp
 - You can do the same to list the existing services:
    kubectl get services -l app=kubernetes-bootcamp
 - To apply a new label we use the label command followed by the object type, object name and the new label:
    kubectl label pods $POD_NAME version=v1

# Scale the applications
- The Deployment created only one Pod for running our application. When traffic increases, we will need to scale the application to keep up with user demand.
Scaling is accomplished by changing the number of replicas in a Deployment

- Scaling out a Deployment will ensure new Pods are created and scheduled to Nodes with available resources. Kubernetes also supports autoscaling of Pods.
- Running multiple instances of an application will require a way to distribute the traffic to all of them. Services have an integrated <b>load-balancer<b> that will distribute network traffic to all Pods of an exposed Deployment. 

   # cmds
    - To see the ReplicaSet created by the Deployment, run 
        kubectl get rs
    - Two important columns of this command are:
        - DESIRED displays the desired number of replicas of the application, which you define when you create the Deployment. This is the desired state.
        - CURRENT displays how many replicas are currently running.
    - kubectl scale command, followed by the deployment type, name and desired number of instances:
        kubectl scale deployments/kubernetes-bootcamp --replicas=4
    - The change was applied, and we have 4 instances of the application available. Next, let’s check if the number of Pods changed:
        kubectl get pods -o wide
        kubectl describe deployments/kubernetes-bootcamp
    
    # Load balancing
     - Create an environment variable called NODE_PORT that has a value as the Node port:
        export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
        echo NODE_PORT=$NODE_PORT
    - Next, we’ll do a curl to the exposed IP and port. Execute the command multiple times:
        curl $(minikube ip):$NODE_PORT
    - We hit a different Pod with every request. This demonstrates that the load-balancing is working.

# Update Applications
-  Rolling updates allow Deployments' update to take place with zero downtime by incrementally updating Pods instances with new ones. The new Pods will be scheduled on Nodes with available resources.
- Rolling updates allow the following actions:
    - Promote an application from one environment to another (via container image updates)
    - Rollback to previous versions
    - Continuous Integration and Continuous Delivery of applications with zero downtime
- After rolling update on eachh node the, old pods terminates 

    # Cmds
     - To list your deployments, run the get deployments command: kubectl get deployments
     - To list the running Pods, run the get pods command: kubectl get pods
     - To view the current image version of the app, run the describe pods command and look for the Image field:
        kubectl describe pods
     - Use the set image command, followed by the deployment name and the new image version:
        kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
    - Check the status of the new Pods, and view the old one terminating with the get pods command:
        kubectl get pods
    - You can also confirm the update by running the rollout status command:
        kubectl rollout status deployments/kubernetes-bootcamp
# Troubleshooting on update
- Notice that some of the Pods have a status of ImagePullBackOff.
    - To get more insight into the problem, run the describe pods command:
    kubectl describe pods
    - In the Events section of the output for the affected Pods, notice that the v10 image version did not exist in the repository.
- To roll back the deployment to your last working version, use the rollout undo command:
    kubectl rollout undo deployments/kubernetes-bootcamp

# Ingress
- Should support by kubrnetes, cluster controller

# Creating cluster

- 1 Master cluster and 2 worker cluster (3 VMs)
- Virtual machine can be a cloud server, so we can use cloud servers
- Virtual Box (Master need 2gb, 2 CPU), 2 worker cluster needs 1cpu, 1 gb, if virtual box assign some static IP for VM so the IP wont change.
- Hostname for VMs
    # VM setup
    - Set Hostnames
    - Assign Static Ip
    - Configure /etc/hosts file - where the hostname and Ip address configured
    - Disable Selinux and firewall, and edit IPtables setting
    - Setup kubernetes repo

    # Cloud instance setup
    - Create 3 instance 1 master 2 worker (requirements as above mentioned)
    - SSH into instance from local - ssh SSHLINK
    - Enter password - submit to connect, so controll can be taken locally for cloud instance
    - Install packages, for Kubernernetes
    - Change to root, install Kubernetes packages
    - Disable swap memory, for better performance
    - Enable IPtable for network bridge for pod to pod communication, restart network
    - Install docker on all instances
    - Add ubuntu user to docker, restart docker
    - Come out of root
    - Install all kubernetes modules, reload all system deamon files, start kubelet (agent set on each nodes, ), get docker status
    # Kubeadm setup on Master
    - Get into root user
    - Init kubeadm - kubeadm init
    - Create drectory commands mentioned init, get KUBECONFIG, join the worker nodes.
    - Install weavenet addon for networking
    - 
