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
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

Replace `your-domain.com` with the domain where you've installed Infinity Metrics.

### 2. Verify Installation

Once installed, Infinity Metrics will automatically start tracking:

- **Page views** - Every page load and SPA navigation
- **Button clicks** - All button interactions (when enabled)
- **User sessions** - Visitor sessions and return visits

## Configuration Options

You can customize tracking behavior by setting configuration before the SDK loads:

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
  debug: false
};
</script>
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

### Configuration Options Reference

| Option | Default | Description |
|--------|---------|-------------|
| `respectDoNotTrack` | `true` | Honor the browser's Do Not Track setting |
| `autoInstrumentButtons` | `true` | Automatically track button clicks |
| `autoSendPageViews` | `true` | Automatically send page views |
| `debug` | `false` | Enable debug logging to console |

## Single Page Applications (SPAs)

For SPAs built with frameworks like React, Vue, or Angular, Infinity Metrics automatically detects navigation changes by monitoring history state and popstate events. No additional configuration is needed.

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
InfinityMetrics.sendCustomEvent('newsletter_signup');

// Custom event with metadata
InfinityMetrics.sendCustomEvent('video_played', {
  video_title: 'Product Demo',
  duration_watched: 60
});
```

## Revenue Tracking

Track purchases and revenue using the built-in purchase tracking:

```javascript
// Basic purchase tracking (price in smallest currency unit)
InfinityMetrics.registerPurchase(1999, 'USD'); // $19.99

// Purchase with metadata
InfinityMetrics.registerPurchase(1999, 'USD', {
  product_id: 'prod_123',
  product_name: 'Premium Plan',
  quantity: 1
});
```

## Testing Your Integration

### 1. Enable Debug Mode

Set `debug: true` in your config to see tracking events in the browser console:

```javascript
window.InfinityMetrics = window.InfinityMetrics || {};
window.InfinityMetrics.config = {
  debug: true
};
```

### 2. Check Network Requests

Open browser developer tools and look for requests to `/api/v1/events` in the Network tab.

### 3. Verify in Dashboard

Visit your analytics dashboard to confirm that page views and events are being recorded.

## Common Integration Patterns

### Static Websites

For static websites, add the script to your base template or layout file:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Your other head tags -->
    <script defer src="https://your-domain.com/api/v1/sdk.js"></script>
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
InfinityMetrics.registerPurchase(totalInCents, 'USD', {
  order_id: 'order_123',
  item_count: 2,
  payment_method: 'stripe'
});
```

## HTML Attribute Tracking

You can add tracking to specific elements using HTML attributes:

### Button Tracking

```html
<button data-infinity-event-name="newsletter_signup">
  Subscribe to Newsletter
</button>

<button 
  data-infinity-event-name="download_started"
  data-infinity-metadata-file="mobile_app"
  data-infinity-metadata-version="1.2.0">
  Download App
</button>
```

### Link Tracking

```html
<a 
  href="/features" 
  data-infinity-event-name="clicked_features_link"
  data-infinity-metadata-location="header">
  Explore Features
</a>
```

### Purchase Tracking with Attributes

```html
<button 
  data-infinity-event-name="revenue:purchased"
  data-infinity-metadata-price="2999"
  data-infinity-metadata-currency="USD"
  data-infinity-metadata-product="premium_plan">
  Buy Premium Plan
</button>
```

## Privacy Compliance

Infinity Metrics is designed with privacy in mind:

- Respects Do Not Track by default
- No cookies used for tracking
- Anonymous visitor tracking using daily fingerprints
- GDPR and CCPA compliant by design
- All tracking can be disabled via configuration

