<div align="center">
  <img src="./public/favicon.svg" alt="Logo" width="100"/>
  <h1>CyberSearch</h1>
  <p><em>The Definitive Cybersecurity Intelligence & Reconnaissance Platform</em></p>
</div>

---

## 🚀 Overview

CyberSearch is an enterprise-grade full-stack application built utilizing cutting-edge Serverless Database methodologies targeting **TiDB Cloud**.

## 🏗️ Architecture Design

- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Express, Node 20, Custom High-Security Query Wrappers
- **Database:** TiDB Serverless (MySQL 8.0 highly compatible distributed HTAP engine)
- **DevOps:** Render (Backend), Vercel (Frontend), automated `migrate.js` routines.

---

## 🌐 TiDB Cloud Deployment Guide (Zero Manual Setup)

This application strictly enforces secure TLS architecture out-of-the-box. To link correctly to TiDB clusters via Render or local testing, follow these precise steps.

### 1. Database Creation (TiDB)

1. Register for free at **[TiDB Cloud](https://tidbcloud.com/)**.
2. Create a Serverless Cluster (MySQL compatible).
3. Under the cluster dashboard, locate **Connect** -> **Node.js** (or General).
4. **Locate your CA Certificate**: TiDB uses `isrgrootx1.pem` (Let's Encrypt). Download it provided by your TiDB dashboard.
5. Place this downloaded file inside your code repository exactly as: `server/tidb-ca.pem`. (Our architecture will detect it automatically to enforce Zero-Trust).

### 2. Backend Orchestration (Render)

1. Deploy the `server` directory on Render as a Web Service.
2. Under **Environment Variables**, configure the exact matrix (Ensure there are no trailing spaces on `true`!):
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

### 3. Execution Verification

Upon deploying, `migrate.js` safely bridges the TLS connection. Because `server/tidb-ca.pem` exists, `db.js` manually loads the Certificate Authority buffer, preventing Docker-Alpine SNI negotiation drops. All your tables will dynamically build securely!
