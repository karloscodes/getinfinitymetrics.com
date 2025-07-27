---
title: Subdomain Tracking
layout: "../../layouts/DocsLayout.astro"
---

# Subdomain Tracking

Track visitors across multiple subdomains as a unified website experience. The Infinity Metrics SDK automatically handles subdomain tracking when the same script is installed on all subdomains.

**Note**: Subdomain tracking is disabled by default and must be enabled in the website settings through the administration interface.

## How It Works

When you install the same tracking script on multiple subdomains, the SDK automatically:

- Tracks visitors across all subdomains as a single website
- Maintains user sessions when navigating between subdomains
- Shares analytics data across all subdomains

## Setup

**First**, enable subdomain tracking in your website settings through the administration interface.

**Then**, install the same tracking script on all your subdomains:

```html
<!-- Main domain: example.com -->
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>

<!-- Subdomain: blog.example.com -->
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>

<!-- Subdomain: shop.example.com -->
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

## What Gets Tracked

All subdomains share the same analytics data:

- **Page Views**: All page views across subdomains appear in one dashboard
- **User Sessions**: Sessions persist when users navigate between subdomains
- **Events**: Custom events from all subdomains are tracked together

No additional configuration is needed - the SDK automatically detects and handles subdomain tracking.
