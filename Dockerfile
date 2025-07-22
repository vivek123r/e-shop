# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]
