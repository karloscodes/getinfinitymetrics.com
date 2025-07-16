---
title: Getting Started
layout: "../../layouts/DocsLayout.astro"
---

# Getting Started

Welcome to Infinity Metrics! This guide will walk you through the essential steps to start tracking analytics on your websites.

## Prerequisites

Before you begin, make sure you have:

- Infinity Metrics installed on your server (see [Installation guide](/docs/installation))
- Your license key from the pricing section
- Admin access to your websites

## Step 1: Integrate the Tracking Script

Add the lightweight tracking script to your website(s). Place this script in the `<head>` section of your HTML:

```html
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

Replace `your-domain.com` with the domain where you installed Infinity Metrics.

For optimal data collection, place the script as early as possible in the `<head>` section of your HTML document.

## Step 2: Access Your Dashboard

Once the tracking script is installed, access your analytics dashboard at:

```
https://your-domain.com/
```

This dashboard will show you real-time analytics data from all websites using your tracking script.

## Step 3: Verify Tracking

After installing the tracking script:

1. Visit your website in a browser
2. Check your Infinity Metrics dashboard
3. You should see page views appearing in real-time
4. The SDK automatically tracks page views, button clicks, and SPA navigation

## What's Tracked Automatically

By default, Infinity Metrics automatically tracks:

- **Page Views**: Every page load is tracked
- **SPA Navigation**: Automatic detection of single-page application route changes
- **Button Clicks**: Automatic tracking of button interactions
- **Link Clicks**: When configured with `data-infinity-event-name` attributes

## Next Steps

- [Learn about SDK configuration](/docs/sdk-reference)
- [Track custom events](/docs/custom-events)
- [Set up purchase tracking](/docs/revenue-tracking)
- [Configure administrative settings](/docs/administration)
