# Use a lightweight Node.js 20 Alpine base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies needed for building
COPY package.json package-lock.json ./

# ✅ Install all dependencies, including devDependencies
RUN npm install

# Copy the entire project
COPY . . 

# ✅ Make sure TypeScript is installed & accessible
RUN npx tsc

# Use a minimal runtime image
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "dist/server.js"]
