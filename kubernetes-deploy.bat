@echo off
echo 🚀 Kubernetes Deployment Script 🚀
echo ===================================

echo.
echo ⚡ KUBERNETES OPTIONS:
echo ----------------------------------
echo 1. Start Minikube
echo 2. Deploy Full Stack (Frontend + Backend)
echo 3. Deploy Frontend Only
echo 4. Deploy Backend Only
echo 5. View Deployed App (Open in browser)
echo 6. Check Deployment Status
echo 7. Delete All Deployments
echo 8. Exit

choice /C 12345678 /N /M "Choose an option (1-8): "

if errorlevel 8 goto :end
if errorlevel 7 goto :delete
if errorlevel 6 goto :status
if errorlevel 5 goto :view
if errorlevel 4 goto :deploy_backend
if errorlevel 3 goto :deploy_frontend
if errorlevel 2 goto :deploy_full
if errorlevel 1 goto :start

:start
echo.
echo 🔄 Starting Minikube...
minikube start
goto :end

:deploy_full
echo.
echo 🔄 Deploying Full Stack (Frontend + Backend)...
kubectl apply -f k8s/frontend-config.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
echo ✅ Full stack deployment initiated!
goto :end

:deploy_frontend
echo.
echo 🔄 Deploying Frontend only...
kubectl apply -f k8s/frontend-config.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
echo ✅ Frontend deployment initiated!
goto :end

:deploy_backend
echo.
echo 🔄 Deploying Backend only...
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
echo ✅ Backend deployment initiated!
goto :end

:view
echo.
echo 🔍 Opening application in browser...
minikube service my-react-app-service
goto :end

:status
echo.
echo 📊 Checking deployment status...
echo.
echo === DEPLOYMENTS ===
kubectl get deployments
echo.
echo === PODS ===
kubectl get pods
echo.
echo === SERVICES ===
kubectl get services
echo.
echo === CONFIGMAPS ===
kubectl get configmaps
goto :end

:delete
echo.
echo ❌ Deleting all deployments...
kubectl delete -f k8s/
echo ✅ All deployments deleted!
goto :end

:end
echo.
echo 👋 Done!
