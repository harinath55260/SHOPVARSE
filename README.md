# ShopVerse 3D — Production Cloud Run Deployment Guide

ShopVerse 3D is a spatial 3D e-commerce and supermarket web application built with React 19, Three.js WebGL, Tailwind CSS, Express, and Vite.

---

## 1. Cloud Run Port & Host Architecture

- **Host Binding:** `0.0.0.0` (all network interfaces).
- **Port:** Dynamically resolved from `process.env.PORT || 3000`.
- **Health Check Endpoint:** `GET /health` returns `{"status":"ok"}`.
- **Production Server:** `server.js` serves the compiled `dist/` directory and handles React SPA routing for all frontend paths.

---

## 2. Local Development & Testing

```bash
# 1. Install dependencies
npm install

# 2. Build the production bundle
npm run build

# 3. Test production server locally
npm start

# 4. Verify health check
curl http://localhost:3000/health

# 5. Verify root frontend serving
curl -I http://localhost:3000/
```

---

## 3. Docker Build & Container Testing

```bash
# 1. Build Docker image
docker build -t shopverse-3d .

# 2. Run container locally on port 3000 (with PORT=3000)
docker run -p 3000:3000 -e PORT=3000 shopverse-3d

# 3. Verify health endpoint in running container
curl http://localhost:3000/health
```

---

## 4. Google Cloud Run Deployment

Deploy directly from source to Google Cloud Run with a single command:

```bash
gcloud run deploy shopverse-3d \
  --source . \
  --region asia-south1 \
  --port 3000 \
  --allow-unauthenticated
```

The container automatically listens on `0.0.0.0:$PORT` provided by Cloud Run without hardcoded ports.
