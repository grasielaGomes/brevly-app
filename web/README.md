# Brev.ly – Web

This is the **frontend** SPA for the Brev.ly URL shortener, built with React, Vite and TailwindCSS.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)

---

## Overview

The Brev.ly Web app provides:

- A form to create new short links
- Real-time list, delete and copy of slugs
- CSV export of all links
- Dynamic redirect screen for slugs
- Responsive, mobile-first layout matching the Figma mock

---

## Features

- **Link Creation** with Zod validation
- **Listing & Deletion** of links
- **Copy to Clipboard** for short URLs
- **CSV Export** in a new tab
- **Redirect Page** at `/:shortUrl`
- **Error Handling** and loading states
- **Reusable Components** (Button, Input, Card, Header, etc.)

---

## Requirements

- **Node.js** ≥ 18
- **pnpm** ≥ 6
- **Vite** ≥ 4
- **React** ≥ 19
- **TailwindCSS** ≥ 4

---

## Installation

```bash
git clone https://github.com/grasielaGomes/brevly-app.git
cd brevly-app/web
pnpm install
```

## Configuration

Create a .env in web/:

```bash
VITE_API_URL=http://localhost:3333
```

## Scripts

```bash
Dev: pnpm dev
Build: pnpm build
```
