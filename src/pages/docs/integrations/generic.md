---
title: Generic Integration Guide
layout: "../../../layouts/DocsLayout.astro"
---

# Generic Integration Guide

This guide covers how to integrate Infinity Metrics with any website or web application using the standard JavaScript tracking script.

## Quick Start

### 1. Add the Tracking Script

Add the following script to the `<head>` section of your HTML pages:

```html
<script>
  window.InfinityMetrics = window.InfinityMetrics || {};
  window.InfinityMetrics.config = {
    respectDoNotTrack: true,
    autoInstrumentButtons: true,
    autoSendPageViews: true,
    debug: false,
  };
</script>
<script
  async
  src="https://cdn.getinfinitymetrics.com/js/im.js"
  data-site-id="YOUR_SITE_ID"
></script>
```

Replace `YOUR_SITE_ID` with your actual site ID from the dashboard.

### 2. Verify Installation

Once installed, Infinity Metrics will automatically start tracking:

- **Page views** - Every page load and SPA navigation
- **Button clicks** - All button interactions
- **Link clicks** - External and internal link clicks
- **User sessions** - Visitor sessions and return visits

## Configuration Options

You can customize tracking behavior by modifying the config object:

```html
<script>
  window.InfinityMetrics = window.InfinityMetrics || {};
  window.InfinityMetrics.config = {
    // Honor browser's Do Not Track setting
    respectDoNotTrack: true,

    // Automatically track button clicks
    autoInstrumentButtons: true,

    // Automatically send page views
    autoSendPageViews: true,

    // Enable debug logging (development only)
    debug: false,
  };
</script>
```

## Single Page Applications (SPAs)

For SPAs built with frameworks like React, Vue, or Angular, Infinity Metrics automatically detects navigation changes. No additional configuration is needed.

### Manual Page View Tracking

If you need to manually trigger page views (e.g., for custom routing):

```javascript
// Send a page view manually
window.InfinityMetrics.sendPageView();
```

## Custom Events

Track custom interactions and conversions:

```javascript
// Basic custom event
InfinityMetrics.sendCustomEvent("newsletter_signup");

// Custom event with metadata
InfinityMetrics.sendCustomEvent("video_played", {
  videoTitle: "Product Demo",
  durationWatched: "60s",
});
```

## Revenue Tracking

Track purchases and revenue:

```javascript
// Basic purchase tracking
InfinityMetrics.registerPurchase(1999, "USD"); // $19.99

// Purchase with metadata
InfinityMetrics.registerPurchase(1999, "USD", {
  productId: "prod_123",
  productName: "Premium Plan",
  quantity: 1,
});
```

## User Identification

Identify users for cross-session tracking:

```javascript
InfinityMetrics.setUser({
  userId: "user_12345",
});
```

## Testing Your Integration

### 1. Enable Debug Mode

Set `debug: true` in your config to see tracking events in the browser console:

```javascript
window.InfinityMetrics.config = {
  debug: true,
};
```

### 2. Check Network Requests

Open browser developer tools and look for requests to `getinfinitymetrics.com` in the Network tab.

### 3. Verify in Dashboard

Visit your dashboard to confirm that page views and events are being recorded.

## Common Integration Patterns

### Static Websites

For static websites, add the script to your base template or layout file:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Your other head tags -->
    <script>
      window.InfinityMetrics = window.InfinityMetrics || {};
      window.InfinityMetrics.config = {
        respectDoNotTrack: true,
        autoInstrumentButtons: true,
        autoSendPageViews: true,
      };
    </script>
    <script
      async
      src="https://cdn.getinfinitymetrics.com/js/im.js"
      data-site-id="YOUR_SITE_ID"
    ></script>
  </head>
  <body>
    <!-- Your content -->
  </body>
</html>
```

### Content Management Systems

For CMS platforms, add the script to your theme's header template or use a plugin/module that allows custom JavaScript injection.

### E-commerce Sites

For e-commerce sites, combine page tracking with purchase tracking:

```javascript
// On purchase completion page
InfinityMetrics.registerPurchase(totalInCents, "USD", {
  orderId: "order_123",
  items: ["product1", "product2"],
  shippingCost: 599,
});
```

## Privacy Compliance

Infinity Metrics is designed with privacy in mind:

- Respects Do Not Track by default
- No personal data collection without explicit user identification
- GDPR and CCPA compliant
- All tracking can be disabled via configuration

## Need Help?

If you find any issue or want to improve this documentation, you can do it here: [@https://github.com/karloscodes/getinfinitymetrics.com](https://github.com/karloscodes/getinfinitymetrics.com)
