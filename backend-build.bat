@echo off
echo 🚀 Building Backend Docker image...
cd backend
docker build -t my-backend-app .
cd ..

echo ✅ Backend Docker image built successfully!

echo.
echo ⚡ BACKEND DOCKER HUB OPTIONS:
echo ----------------------------------
echo 1. Tag and push Backend to Docker Hub
echo 2. Exit

choice /C 12 /N /M "Choose an option (1 or 2): "

if errorlevel 2 goto :end
if errorlevel 1 goto :publish

:publish
echo.
echo 🔄 Tagging backend image for Docker Hub...
docker tag my-backend-app v1v3kr/my-backend-app:latest
echo ⬆️ Pushing backend to Docker Hub...
docker push v1v3kr/my-backend-app:latest
goto :end

:end
echo.
echo 👋 Done!
