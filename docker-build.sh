#!/bin/bash

echo "🚀 Building Docker image..."
docker build -t my-react-app .

echo "✅ Docker image built successfully!"
echo "🔍 To run: docker run -p 3000:3000 my-react-app"
echo "🌐 App will be available at: http://localhost:3000"
