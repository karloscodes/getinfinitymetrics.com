---
title: Installation
layout: "../../layouts/DocsLayout.astro"
---

# Installation

## Automated Installation

This method provides a streamlined installation process with automatic updates, ideal for Ubuntu Server users.

### 1. Get your license

Purchase your Infinity Metrics license from our pricing section to get started.

### 2. InfinityMetrics Installer and Updater

The installer automatically configures SSL certificates and uses Caddy as a proxy. For more details, see the Infinity Metrics Installer on GitHub.

#### Install with a single command

Run the installer and follow its instructions.

```bash
curl -fsSL https://getinfinitymetrics.com/install -o install.sh && sudo bash install.sh
```

## Self-Managed Installation

This method is for users who prefer manual setup or are using a non-Ubuntu Linux distribution, deploying Infinity Metrics via a Docker image.

### 1. Get your license

Purchase your Infinity Metrics license from our pricing section to get started.

### 2. Docker Installation

Infinity Metrics consists of a single Docker image that automatically manages its internal database, making it compatible with any Linux distribution.

It is actively tested on Ubuntu Server (20.04 LTS or newer), but theoretically, it can be used on any Linux distribution.

**Note:** We recommend putting Infinity Metrics behind a proxy for enhanced security and performance. With this method, all updates are in your hands.

#### Required Environment Variables

The following environment variables are required to run the Infinity Metrics Docker image:

- `INFINITY_METRICS_LOG_LEVEL`: Logging level (e.g., debug)
- `INFINITY_METRICS_APP_PORT`: Port for the app (e.g., 8080)
- `INFINITY_METRICS_LICENSE_KEY`: Your license key obtained in step 1
- `INFINITY_METRICS_DOMAIN`: Your domain (e.g., your-domain.com)
- `INFINITY_METRICS_PRIVATE_KEY`: Private key for internal functioning of the app. (32 random characters)

#### Docker Run Command

Use the following command to run the Infinity Metrics Docker image. Replace the placeholder values with your own:

```bash
docker run -d \
  --name infinity-metrics \
  -v /path/to/storage:/app/storage \
  -v /path/to/logs:/app/logs \
  -e INFINITY_METRICS_LOG_LEVEL=debug \
  -e INFINITY_METRICS_APP_PORT=8080 \
  -e INFINITY_METRICS_LICENSE_KEY=your-license-key \
  -e INFINITY_METRICS_DOMAIN=your-domain.com \
  -e INFINITY_METRICS_PRIVATE_KEY=your-private-key \
  --restart unless-stopped \
  infinitymetrics/app:latest
```

## Integrating the Tracking Script

Copy the lightweight tracking script below to your website(s) to start collecting data. This step applies to both installation methods.

```html
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

## Accessing the Dashboard

Once installed, access the analytics dashboard at `https://your-domain.com/`. This step applies to both installation methods.
