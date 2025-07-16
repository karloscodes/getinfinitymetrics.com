---
title: Custom Events
layout: "../../layouts/DocsLayout.astro"
---

# Manual Tracking

For custom events, user actions, or additional data collection, you can use our JavaScript API.

## Custom Events

Track specific user interactions or milestones not covered by automated tracking using the `sendCustomEvent` function.

**Syntax**: `InfinityMetrics.sendCustomEvent(eventName, metadata)`

- **eventName** (string): A unique name for your event (e.g., "trial_started", "file_downloaded").
- **metadata** (object): An object containing any additional dynamic information relevant to the event. You can include any key-value pairs, for example, `{ plan: "premium", fileName: "report.pdf" }`. This data will be available in your analytics.

**Example**:

```javascript
InfinityMetrics.sendCustomEvent("video_played", {
  videoTitle: "Product Demo",
  durationWatched: "60s",
});
```

## Manual Page Views

SPA frameworks could fail to automatically trigger page views changes, you can do it manually like this:

```javascript
window.InfinityMetrics.sendPageView();
```
