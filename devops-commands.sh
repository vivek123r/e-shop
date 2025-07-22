#!/bin/bash

echo "🚀 DevOps Pipeline Commands"
echo "=========================="

# Milestone 2: Docker
echo "📦 DOCKER COMMANDS:"
echo "docker build -t my-react-app ."
echo "docker run -p 3000:3000 my-react-app"
echo "docker-compose up -d"
echo ""

# Milestone 5: Container Registry
echo "🏭 DOCKER HUB COMMANDS:"
echo "docker tag my-react-app YOUR_USERNAME/my-react-app:latest"
echo "docker push YOUR_USERNAME/my-react-app:latest"
echo ""

# Milestone 6: Kubernetes
echo "☸️  KUBERNETES COMMANDS:"
echo "kubectl apply -f k8s/"
echo "kubectl get pods"
echo "kubectl get services"
echo "kubectl port-forward service/my-react-app-service 3000:80"
echo ""

# Monitoring
echo "📊 MONITORING:"
echo "kubectl top pods"
echo "kubectl logs deployment/my-react-app"
echo ""

echo "🎯 Your current milestone: Run these commands step by step!"
