# Dockerfile for React Frontend (Development Setup)

# Use the official Node.js image as the base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the development server
EXPOSE 3000

# Start the React app with hot reloading
CMD ["npm", "start"]
