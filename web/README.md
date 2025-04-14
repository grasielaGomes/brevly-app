# Brev.ly - Web

This is the **frontend** (Web) repository for the Brev.ly project, a URL shortening application.  
It is built with **React** (using **Vite** as the bundler) and communicates with the [Brev.ly Server](../server/README.md) for backend operations.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Routes](#routes)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Brev.ly Web enables users to:

- Shorten a URL with a custom slug or random slug.
- List all existing shortened URLs.
- Delete a shortened URL.
- Redirect from a shortened URL to the original URL.
- Download a CSV report of all links.

---

## Features

- **Single Page Application (SPA)**: Built with React & Vite.
- **Mobile-first approach** with responsive design.
- **State management**: Choose your approach (React hooks, Redux, Zustand, etc.).
- **User Experience**: Loading indicators, empty states, error handling, and success feedback.
- **Figma Layout**: Implements the provided UI design as faithfully as possible.
