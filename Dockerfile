FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install root deps (vite may be here)
RUN npm install

# Copy entire project
COPY . .

# Build frontend
RUN cd frontend && npm install && npm run build

# Start server
EXPOSE 3000
CMD ["node", "backend/server.js"]
