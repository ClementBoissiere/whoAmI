# Single-stage build for Angular frontend with dev server
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 4200 (Angular default)
EXPOSE 4200

# Start Angular dev server
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]
