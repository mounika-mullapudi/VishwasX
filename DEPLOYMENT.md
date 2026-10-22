# 🚀 VishwasX / careerReboot AI - Deployment Guide

This repository contains a full-stack application:
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS (in `frontend/`)
- **Backend**: FastAPI + Uvicorn + Python 3.11+ (in `backend/`)
- **ML Services**: Resume Intelligence & Phishing Verification (in `ml-services/`)

---

## ⚡ Option 1: Vercel (Frontend) + Render (Backend) [Recommended Free Cloud Stack]

### 1. Backend on Render:
1. Push your latest changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: add deployment configuration and fix build"
   git push origin main
   ```
2. Log into [Render.com](https://render.com) and click **New +** → **Blueprint**.
3. Select your GitHub repository (`VishwasX`).
4. Render will automatically read `render.yaml` and configure both services:
   - **vishwasx-backend** (FastAPI Web Service)
   - **vishwasx-frontend** (Static Site)
5. Alternatively, deploy backend manually on Render:
   - **Type**: Web Service
   - **Root Directory**: `.` (or `backend`)
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**:
     - `PORT`: `10000`
     - `CORS_ORIGIN`: `*` (or your frontend domain)
     - `FIREBASE_CREDENTIALS_PATH`: `firebase-credentials.json` (optional if using secret file or default creds)
6. Copy your live backend URL (e.g. `https://vishwasx-backend.onrender.com`).

### 2. Frontend on Vercel:
1. Log into [Vercel](https://vercel.com) and click **Add New...** → **Project**.
2. Import the `VishwasX` repository.
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (or leave root since `vercel.json` is configured)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend-app.onrender.com`
   - `VITE_FIREBASE_API_KEY`: `your_key`
   - `VITE_FIREBASE_PROJECT_ID`: `your_project_id`
   - (Other Firebase variables from `frontend/.env.example`)
5. Click **Deploy**. Vercel will build and assign an instant HTTPS domain.

---

## 🐳 Option 2: Docker & Docker Compose (Any VPS / DigitalOcean / AWS EC2)

Run the entire full-stack platform with a single command:

```bash
# 1. Build and start containers in detached mode
docker compose up -d --build

# 2. Check logs
docker compose logs -f

# 3. Stop containers
docker compose down
```

- **Frontend**: accessible at `http://localhost:8080` (or configured port)
- **Backend**: accessible at `http://localhost:4000` (API docs at `/docs`)

---

## 🚂 Option 3: Railway (Full Stack)

1. Go to [Railway.app](https://railway.app) and create a **New Project** → **Deploy from GitHub repo**.
2. Select `VishwasX`.
3. Add service 1 (Backend):
   - Set **DockerfilePath**: `Dockerfile.backend`
   - Add environment variable `PORT=4000`
   - Generate domain.
4. Add service 2 (Frontend):
   - Set **Root Directory**: `frontend`
   - Set Build Command: `npm run build`
   - Set Output Directory: `dist`
   - Add environment variable: `VITE_API_BASE_URL` = your Railway backend URL.

---

## 🌐 Option 4: Netlify (Frontend)

1. Connect your repository on [Netlify](https://netlify.com).
2. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. SPA routing is already configured via `frontend/public/_redirects`.
4. Set `VITE_API_BASE_URL` in Site settings > Environment variables.
5. Deploy site.

---

## 🔒 Environment Variables Checklist

### Frontend (`frontend/.env`):
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Live backend URL (e.g. `https://vishwasx-backend.onrender.com`) |
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

### Backend (`backend/.env`):
| Variable | Description |
|---|---|
| `PORT` | Listening port (e.g. `4000` or dynamically provided by cloud host) |
| `CORS_ORIGIN` | Allowed origins (e.g. `https://your-frontend.vercel.app` or `*`) |
| `FIREBASE_CREDENTIALS_PATH` | Path to service account json file (optional) |
