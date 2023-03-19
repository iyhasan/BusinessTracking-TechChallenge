# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]