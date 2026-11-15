# =============================================================
# ShopVerse 3D — Production Multi-Stage Dockerfile for Google Cloud Run
# =============================================================

# -------------------------------------------------------------
# Stage 1: Build Stage (Vite & Asset Compilation)
# -------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json* ./

RUN npm ci --ignore-scripts || npm install --legacy-peer-deps

# Copy application source
COPY . .

# Compile production frontend bundle (outputs to /app/dist)
RUN npm run build

# -------------------------------------------------------------
# Stage 2: Production Runtime Stage
# -------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Set Cloud Run runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts || npm install --omit=dev --ignore-scripts --legacy-peer-deps

# Copy pre-bundled production server and compiled assets
COPY server.js ./
COPY --from=builder /app/dist ./dist
COPY public ./public

# Change ownership of /app to node user
RUN chown -R node:node /app

# Non-root user execution for container security
USER node

# Expose container port (Cloud Run overrides PORT dynamically via env)
EXPOSE 3000

# Health check for local container inspection
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT}/health || exit 1

# Start lightweight production server (binds strictly to 0.0.0.0:$PORT)
CMD ["node", "server.js"]
