FROM node:20-alpine

WORKDIR /app

# Improve caching by copying package manifests first
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY . .

# Environment
ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

# Execute strictly using native Node implementation
CMD ["node", "index.js"]
