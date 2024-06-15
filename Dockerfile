# Use Node.js 18 as the base image
FROM node:20.11.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /

# Install any needed packages
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Build the app
RUN npm run build

# Install serve globally to serve the static files
RUN npm install -g serve

# Serve the app
CMD ["serve", "-s", "build", "-l", "5000"]