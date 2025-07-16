---
title: API Reference
layout: "../../layouts/DocsLayout.astro"
---

# API Reference

Complete JavaScript SDK API documentation for Infinity Metrics.

## Available Methods

### sendPageView()

Manually send a page view event. This is automatically called unless `autoSendPageViews` is disabled.

```javascript
window.InfinityMetrics.sendPageView();
```

**Parameters:** None

**Example:**

```javascript
// Send a page view event manually
window.InfinityMetrics.sendPageView();
```

### sendCustomEvent(eventName, metadata)

Send a custom event with optional metadata.

```javascript
window.InfinityMetrics.sendCustomEvent(eventName, metadata);
```

**Parameters:**

- `eventName` (string, required): A unique name for your event (e.g., "trial_started", "file_downloaded")
- `metadata` (object, optional): Additional dynamic information relevant to the event

**Example:**

```javascript
// Send a custom event with metadata
InfinityMetrics.sendCustomEvent("video_played", {
  videoTitle: "Product Demo",
  durationWatched: "60s",
});

// Send event without metadata
InfinityMetrics.sendCustomEvent("newsletter_signup");
```

### setUser(userData)

Set user identification for tracking across sessions.

```javascript
window.InfinityMetrics.setUser(userData);
```

**Parameters:**

- `userData` (object, required): Object containing user identification data
  - `userId` (string, required): Unique user identifier

**Example:**

```javascript
// Set user identification
window.InfinityMetrics.setUser({
  userId: "user_12345",
});
```

### registerPurchase(priceInCents, currency, metadata)

Track revenue events and purchases with standardized purchase data.

```javascript
window.InfinityMetrics.registerPurchase(priceInCents, currency, metadata);
```

**Parameters:**

- `priceInCents` (number, required): The purchase price in cents (e.g., 1999 for $19.99)
- `currency` (string, optional): Currency code following ISO 4217 standard (defaults to 'USD')
- `metadata` (object, optional): Additional purchase information

**Examples:**

```javascript
// Track a simple purchase
window.InfinityMetrics.registerPurchase(1999, "USD");

// Track a purchase with metadata
window.InfinityMetrics.registerPurchase(1999, "USD", {
  productId: "prod_123",
  productName: "Premium Plan",
  quantity: 1,
  category: "subscription",
});
```

## Configuration

### config

Configure SDK behavior before the script loads.

```javascript
window.InfinityMetrics = window.InfinityMetrics || {};
window.InfinityMetrics.config = {
  respectDoNotTrack: true, // Honor browser's Do Not Track setting
  autoInstrumentButtons: true, // Auto-track button clicks
  autoSendPageViews: true, // Automatically send page views
  debug: false, // Enable debug logging
};
```

**Configuration Options:**

| Option                  | Type    | Default | Description                              |
| ----------------------- | ------- | ------- | ---------------------------------------- |
| `respectDoNotTrack`     | boolean | `true`  | Honor the browser's Do Not Track setting |
| `autoInstrumentButtons` | boolean | `true`  | Automatically track button clicks        |
| `autoSendPageViews`     | boolean | `true`  | Automatically send page views            |
| `debug`                 | boolean | `false` | Enable debug logging to console          |

## Error Handling

All SDK methods fail gracefully. If an error occurs:

- The method will not throw an exception
- Debug information is logged to console if `debug: true` is set
- Events are queued locally if the network is unavailable
- Failed events are retried automatically

## Privacy Considerations

- The SDK respects the browser's Do Not Track setting by default
- No personal data is collected without explicit user identification
- All tracking can be disabled through configuration
- Events are stored locally only temporarily for retry purposes

## Found an Issue or Want to Improve?

If you find any issue or want to improve this documentation, you can do it here: [@https://github.com/karloscodes/getinfinitymetrics.com](https://github.com/karloscodes/getinfinitymetrics.com)
