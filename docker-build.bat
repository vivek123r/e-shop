@echo off
echo 🚀 Building Docker image...
docker build -t my-react-app .

echo ✅ Docker image built successfully!
echo 🔍 To run: docker run -p 3000:3000 my-react-app
echo 🌐 App will be available at: http://localhost:3000

echo.
echo ⚡ DOCKER HUB PUBLISHING OPTIONS:
echo ----------------------------------
echo 1. Tag and push to Docker Hub
echo 2. Exit

choice /C 12 /N /M "Choose an option (1 or 2): "

if errorlevel 2 goto :end
if errorlevel 1 goto :publish

:publish
echo.
echo 🔄 Tagging image for Docker Hub...
docker tag my-react-app v1v3kr/my-react-app:latest
echo ⬆️ Pushing to Docker Hub (make sure repository exists)...
docker push v1v3kr/my-react-app:latest
goto :end

:end
echo.
echo 👋 Done!
