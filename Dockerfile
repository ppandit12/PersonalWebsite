# ==========================================================
# Stage 1: Build production-ready React Vite bundle
# ==========================================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency mappings
COPY package*.json ./

# Install dependencies (running npm ci ensures reliable locked builds)
RUN npm ci

# Copy project files
COPY . .

# Compile TypeScript and build static bundle (Vite outputs to dist/)
RUN npm run build

# ==========================================================
# Stage 2: Serve compiled static files with Nginx
# ==========================================================
FROM nginx:stable-alpine AS runner

# Remove default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration supporting SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets from build phase
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Start server
CMD ["nginx", "-g", "daemon off;"]
