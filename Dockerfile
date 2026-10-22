
# Use an official Node.js image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source code
COPY server.js ./
COPY public ./public

# Document the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

