---
title: SDK Configuration
layout: "../../layouts/DocsLayout.astro"
---

# SDK Configuration

Configure the Infinity Metrics JavaScript SDK to customize tracking behavior. Set configuration options **before** the SDK script loads:

```html
<script>
// Modify configuration before the SDK loads
window.InfinityMetrics = window.InfinityMetrics || {};
window.InfinityMetrics.config = {
  respectDoNotTrack: true,            // Honor browser's Do Not Track setting
  autoInstrumentButtons: true,        // Auto-track button clicks
  autoSendPageViews: true,            // Automatically send page views
  debug: false                        // Enable debug logging
};
</script>
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `respectDoNotTrack` | `true` | Honor the browser's Do Not Track setting |
| `autoInstrumentButtons` | `true` | Automatically track button clicks |
| `autoSendPageViews` | `true` | Automatically send page views |
| `debug` | `false` | Enable debug logging to console |

## Examples

### Minimal Configuration
For basic page view tracking only:

```javascript
window.InfinityMetrics = window.InfinityMetrics || {};
window.InfinityMetrics.config = {
  autoInstrumentButtons: false,
  autoSendPageViews: true,
  respectDoNotTrack: true,
  debug: false
};
```

### Debug Mode
For development and testing:

```javascript
window.InfinityMetrics = window.InfinityMetrics || {};
window.InfinityMetrics.config = {
  debug: true
};
```