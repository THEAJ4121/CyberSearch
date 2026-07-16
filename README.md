<div align="center">
  <img src="./public/favicon.svg" alt="Logo" width="100"/>
  <h1>CyberSearch</h1>
  <p><em>The Definitive Cybersecurity Intelligence & Reconnaissance Platform</em></p>
  
  [![Node.js CI](https://github.com/CyberSearch/badge.svg)](https://github.com/)
  [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new)
</div>

---

## 🚀 Overview

CyberSearch is an enterprise-grade full-stack application architected to aggregate cybersecurity tools, frameworks, and penetration testing payloads. Engineered heavily on Node, Express, React, and MySQL, the application follows strict microservices and code-splitting paradigms.

## 🏗️ Architecture Design

The infrastructure leverages Dockerized container clusters, zero-setup lightweight SQL migrations, and aggressive request tracing mappings.

### Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS (Lazy Loaded SPAs, Suspense)
- **Backend:** Express, Node 20, Custom Query Wrappers
- **Database:** MySQL 8.0, custom schema migration runner `migrate.js`
- **DevOps:** Docker Compose, GitHub Actions CI Pipeline
- **Security:** Helmet, bcrypt, RateLimit, CORS, JWT Auth

## 🔧 One-Command Cluster Boot (Docker)

```bash
git clone https://github.com/aryan/CyberSearch.git
cd CyberSearch

# Initialize the Database, Node API, and React Frontend simultaneously
docker-compose up -d --build
```

**Auto-Initialization Guarantee:** The Node API waits for the MySQL container heartbeat, natively constructs the robust schema tables (`users`, `tools`, `categories`) securely via `migrate.js`, and exposes port `8000`.

## 📬 OpenAPI Documentation

The core backend exposes deep `/api/docs` mapping. Simply hit the internal swagger domain locally to visually manipulate the JWT endpoints.
