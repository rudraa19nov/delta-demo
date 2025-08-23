# Use official Node.js runtime as base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Expose port (same as your app.js uses, 8080)
EXPOSE 8080

# Run the app
CMD ["node", "app.js"]
