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
- Generating CSV reports and uploading them to a CDN (e.g., S3).

It can be used in conjunction with the [Brev.ly Web](../web/README.md) project to provide a full user interface.

---

## Features

- **Create Shortened URL**: Validates format and avoids duplicates.
- **Delete URL**: Removes a previously created shortened URL from the system.
- **Redirect**: Retrieves the original URL based on the short link and optionally increments access count.
- **List All URLs**: Returns all URLs stored in the database.
- **CSV Export**: Generates CSV files with detailed link information (short URL, original URL, access count, creation date) and can upload them to a CDN.
