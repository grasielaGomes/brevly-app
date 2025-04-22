# Brev.ly - Server

This is the **backend** (Server) repository for the Brev.ly project, a URL shortening application.
Provides a RESTful API to create, list, delete, redirect shortened URLs, and generate CSV reports uploaded to Cloudflare R2.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Docker](#docker)
- [API Endpoints](#api-endpoints)

---

## Overview

Brev.ly Server handles:

- URL creation, validation, and duplication checks
- Link deletion and redirection with access count increment
- Listing all stored URLs
- Generating CSV reports and uploading to Cloudflare R2

Works seamlessly with the [Brev.ly Web](../web/README.md) frontend for a complete solution.

---

## Features

- **Create Shortened URL**: Custom slugs, format validation, duplicate prevention.
- **Delete URL**: Remove links by slug.
- **Redirect**: 302 redirect to original URL and track access counts.
- **List URLs**: Retrieve all stored links.
- **CSV Export**: Batch-export link data to CSV, uploaded to R2.
- **OpenAPI Docs**: Interactive docs at `/docs` via Scalar UI and openapi-zod.

---

## Requirements

- Node.js v18+
- pnpm v7+
- PostgreSQL v14+
- Cloudflare R2 (or S3-compatible) for CSV storage

---

## Quick Start

1. **Clone** the repo:
   ```bash
   git clone https://github.com/grasielaGomes/brevly-app.git
   cd server
   ```
2. **Configure** environment variables:
   ```bash
   cp .env.example .env
   # edit .env with your DB and R2 credentials
   ```
3. **Local dev**:
   ```bash
   pnpm install
   pnpm migrate
   pnpm dev
   ```
4. Visit `http://localhost:3333/docs` for API documentation.

---

## Configuration

Environment variables (see `.env.example`):

```ini
DATABASE_URL=postgres://user:pass@db:5432/brevly
PORT=3333
CLOUDFLARE_ACCOUNT_ID=<your-account-id>
CLOUDFLARE_ACCESS_KEY_ID=<key>
CLOUDFLARE_ACCESS_KEY_SECRET=<secret>
CLOUDFLARE_BUCKET=<bucket-name>
PUBLIC_URL=https://<account>.r2.cloudflarestorage.com
```

---

## Scripts

### Local Development

- **Install deps**: `pnpm install`
- **Dev server**: `pnpm dev` (hot reload)
- **Generate client**: `pnpm generate`
- **Migrate dev**: `pnpm migrate`
- **Run tests**: `pnpm test`

---

## Docker

To run the server alone:

```bash
docker build -t brevly-server .
docker run -p 3333:3333 --env-file .env brevly-server
```

---

### Docker Compose

```bash
# Build and start API + DB
docker compose up --build -d

# View logs
docker compose logs -f

# Stop and remove containers
docker compose down
```

All build steps (install, client gen, migrations) run automatically in CI or Compose.

---

## API Endpoints

| Method | Path               | Description                       |
| ------ | ------------------ | --------------------------------- |
| POST   | `/links`           | Create a new shortened link       |
| GET    | `/links`           | List all links                    |
| GET    | `/links/:shortUrl` | Redirect to original URL          |
| DELETE | `/links/:shortUrl` | Delete a link by slug             |
| GET    | `/links/export`    | Export links as CSV (returns URL) |

---
