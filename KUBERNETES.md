# Kubernetes Deployment Guide

After successfully building and pushing your Docker image, follow these steps to deploy your app to Kubernetes.

## Prerequisites

1. Install Minikube:
   ```
   winget install Kubernetes.minikube
   ```

2. Install kubectl:
   ```
   winget install Kubernetes.kubectl
   ```

## Steps to Deploy

### Option 1: Using the kubernetes-deploy.bat Script

1. Run the deployment script:
   ```
   .\kubernetes-deploy.bat
   ```

2. Choose option 1 to start Minikube
3. Choose option 2 to deploy your application
4. Choose option 4 to check the deployment status
5. Choose option 3 to open the application in a browser

### Option 2: Manual Deployment

1. Start Minikube:
   ```
   minikube start
   ```

2. Deploy your application:
   ```
   kubectl apply -f k8s/
   ```

3. Check the deployment:
   ```
   kubectl get pods
   kubectl get deployments
   kubectl get services
   ```

4. Access your application:
   ```
   minikube service my-react-app-service
   ```

## Cleanup

To delete the deployment:
```
kubectl delete -f k8s/
```

To stop Minikube:
```
minikube stop
```

## Local Host File Configuration

To use the Ingress with the hostname `my-react-app.local`, add this to your hosts file:
```
127.0.0.1 my-react-app.local
```

- Windows: Edit `C:\Windows\System32\drivers\etc\hosts`
- macOS/Linux: Edit `/etc/hosts`

## Troubleshooting

1. If pods are in `Pending` state, check resources:
   ```
   kubectl describe pods
   ```

2. To view logs:
   ```
   kubectl logs <pod-name>
   ```

3. Enable ingress addon:
   ```
   minikube addons enable ingress
   ```
