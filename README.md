<div align="center">
  <img src="./public/favicon.svg" alt="Logo" width="100"/>
  <h1>CyberSearch</h1>
  <p><em>The Definitive Cybersecurity Intelligence & Reconnaissance Platform</em></p>
</div>

---

## 🚀 Overview

CyberSearch is an enterprise-grade full-stack application built utilizing cutting-edge Serverless Database methodologies targeting **TiDB Cloud**.

## 🏗️ Architecture Design

- **Frontend:** React 19, Vite, Tailwind CSS (Lazy Loaded SPAs, Suspense)
- **Backend:** Express, Node 20, Custom High-Security Query Wrappers
- **Database:** TiDB Serverless (MySQL 8.0 highly compatible distributed HTAP engine)
- **DevOps:** Render (Backend), Vercel (Frontend), automated `migrate.js` routines.

---

## 🌐 TiDB Cloud Deployment Guide (Zero Manual Setup)

This application is hard-coupled to execute intelligent `IF NOT EXISTS` raw SQL schema migrations automatically when the backend boots. To migrate this stack smoothly to TiDB Cloud Serverless:

### 1. Database Creation (TiDB)

1. Register for free at **[TiDB Cloud](https://tidbcloud.com/)**.
2. Create a Serverless Cluster (MySQL compatible).
3. Under the cluster dashboard, locate **Connect** -> **Node.js** (or General).
4. Do **not** execute any table creation. The application manages itself.

### 2. Backend Orchestration (Render)

1. Deploy the `server` directory on Render as a Web Service.
2. In Render, provide the exact configurations generated from your TiDB Dashboard into the **Environment Variables**:
   - `DB_HOST` = (e.g. gateway01.xxx.prod.aws.tidbcloud.com)
   - `DB_PORT` = `4000` (TiDB relies heavily on 4000)
   - `DB_USER` = (e.g. xxxxxxxx.root)
   - `DB_PASSWORD` = (Your auto-generated cluster password)
   - `DB_NAME` = `test`
   - `DB_SSL` = `true` (CRITICAL: Forces end-to-end TLSv1.2 encryption required by TiDB)
   - `PORT` = `8000`
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (Generate a 64 character random string)
   - `FRONTEND_URL` = (e.g. https://cybersearch.vercel.app for CORS security)
3. Set **Start Command**: `npm start`
4. The moment Render launches, `migrate.js` will leverage the TLS handshake to TiDB, configure all relations across `users`, `tools`, `categories`, and securely expose the API.

### 3. Frontend Orchestration (Vercel)

1. Connect the source repo into Vercel setting standard `Vite` presets.
2. Inject your Render API URI into `VITE_API_URL`. Ensure it utilizes HTTPS.
3. Deploy. The application fetches assets dynamically.
