# Stage 1: Build the Go app
FROM node:latest AS builder
# FROM node:lts-alpine AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if using npm)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --silent

# Copy the rest of the application files
COPY . .

# Build the NestJS app
RUN npm ci && \
    npm run build && \
    rm -rf node_modules && \
    npm ci --only=production

# Stage 2: Create the final container
FROM node:current-alpine
# FROM node:current-slim
# FROM node:lts-alpine
# FROM node:lts-slim

# Install ca-certificates
RUN apk update && apk add curl jq ca-certificates && rm -rf /var/cache/apk/*

# Set the working directory
WORKDIR /app

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --only=production --silent

# Expose port 3001 to the outside world
EXPOSE 3001

# Command to run the executable
# CMD ["node", "dist/src/main"]
ENTRYPOINT ["node", "dist/src/main"]
# ENTRYPOINT ["node", "-r", "dd-trace/init", "dist/src/main"]
