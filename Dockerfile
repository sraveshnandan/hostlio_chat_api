# Stage 1: Build
FROM node:18 AS builder

WORKDIR /build

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy app source code and build
COPY . .
RUN npm run build

# Stage 2: Production Image
FROM node:18-slim

WORKDIR /app

# Copy only required artifacts from builder
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json

EXPOSE 5000

CMD ["node", "./dist/app.js"]
