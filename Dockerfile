# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
# Setting environment variables during build generates them firmly into the Vite dist
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Production Serving Stage
FROM nginx:alpine

# Copy the built SPA assets into the nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default config with SPA-enabled routing config to prevent 404s on browser refresh
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
