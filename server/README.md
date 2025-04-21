# Brev.ly - Server

This is the **backend** (Server) repository for the Brev.ly project, a URL shortening application.  
It provides a RESTful API to create, list, delete, and redirect shortened URLs, as well as generate CSV reports.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Brev.ly Server is responsible for:

- Managing URL creation, validation, and duplication checks.
- Handling link deletions and redirections.
- Tracking access counts for each shortened link.
- Generating CSV reports and uploading them to a CDN (e.g., S3 or Cloudflare R2).

It can be used in conjunction with the [Brev.ly Web](../web/README.md) project to provide a full user interface.

---

## Features

- **Create Shortened URL**: Validates format and avoids duplicates.
- **Delete URL**: Removes a previously created shortened URL from the system.
- **Redirect**: Retrieves the original URL based on the short link and optionally increments access count.
- **List All URLs**: Returns all URLs stored in the database.
- **CSV Export**: Generates CSV files with detailed link information (short URL, original URL, access count, creation date) and uploads them to a CDN.

---

## Requirements

- **Node.js**: v18 or higher
- **pnpm**: v10.8.0 or higher
- **PostgreSQL**: v14 or higher
- **Cloudflare R2** (or compatible S3 storage) for CSV uploads

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/brevly-server.git
   cd brevly-server
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up the environment variables:

   - Copy `.env.example` to `.env` and configure the values.

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

---

## Configuration

The application uses environment variables for configuration. Below are the key variables:

- `DATABASE_URL`: Connection string for the PostgreSQL database.
- `PORT`: The port number on which the server will run.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID for accessing R2 storage.
- `CLOUDFLARE_ACCESS_KEY_ID`: Access key for Cloudflare R2.
- `CLOUDFLARE_ACCESS_KEY_ID`: Secret key for Cloudflare R2.
- `CLOUDFLARE_BUCKET`: Name of the R2 bucket.
- `CLOUDFLARE_PUBLIC_URL`: Public URL for accessing uploaded files.

---

## Scripts

- **Run in development mode**:

  ```bash
  pnpm dev
  ```

- **Run tests**:

  ```bash
  pnpm test
  ```

- **Generate Prisma client**:
  ```bash
  npx prisma generate
  ```

---

## API Endpoints

### `/links`

- **POST** `/links`: Create a new shortened link.
- **GET** `/links`: List all shortened links.

### `/links/{shortUrl}`

- **GET** `/links/{shortUrl}`: Redirect to the original URL.
- **DELETE** `/links/{shortUrl}`: Delete a shortened link.

### `/links/export`

- **GET** `/links/export`: Export all links as a CSV file.

---

## Docker

A `Dockerfile` is included for containerized deployment. To build and run the container:

1. Build the image:

   ```bash
   docker build -t brevly-server .
   ```

2. Run the container:
   ```bash
   docker run -p 3333:3333 --env-file .env brevly-server
   ```

---

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
