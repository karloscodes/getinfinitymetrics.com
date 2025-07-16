---
title: SDK Reference
layout: "../../layouts/DocsLayout.astro"
---

# SDK Usage

Our lightweight JavaScript SDK makes it easy to capture analytics data from your websites.

## Including the SDK

Add the following script tag to the `<head></head>` section of your website. Replace `your-domain.com` with the domain where you installed Infinity Metrics.

```html
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

For optimal data collection, place the script as early as possible in the `<head></head>` of your HTML document.

## SDK Configuration

The Infinity Metrics SDK comes with sensible defaults, but you can customize its behavior by modifying the configuration options.

```javascript
// Modify configuration before the SDK loads
window.InfinityMetrics = window.InfinityMetrics || {};
window.InfinityMetrics.config = {
  respectDoNotTrack: true, // Honor browser's Do Not Track setting
  autoInstrumentButtons: true, // Auto-track button clicks
  autoSendPageViews: true, // Automatically send page views
  debug: false, // Enable debug logging
};
```

### Configuration Options

| Option                  | Default | Description                              |
| ----------------------- | ------- | ---------------------------------------- |
| `respectDoNotTrack`     | `true`  | Honor the browser's Do Not Track setting |
| `autoInstrumentButtons` | `true`  | Automatically track button clicks        |
| `autoSendPageViews`     | `true`  | Automatically send page views            |
| `debug`                 | `false` | Enable debug logging to console          |

## Automated Tracking

By default, Infinity Metrics automatically tracks the following without any additional code:

### Page Views

Every page load is automatically tracked.

### Single-Page Application (SPA) Navigation

The SDK automatically detects navigation changes in SPAs by monitoring history state and popstate events, treating them as new page views. It supports React, Vue, and Angular.

### Button Clicks

When auto-instrumentation is enabled (default), clicks on `<button>` elements, `<input type="button">`, `<input type="submit">`, and any element with `role="button"` are automatically tracked.

#### Automatic Event Naming

By default, button events are named using the pattern: `click:button:sanitized_text:button_id`. Here's how it's constructed:

- **sanitized_text**: Derived from the button's visible text. The system prioritizes `textContent`, then `value`, then `title`. This text is then sanitized: converted to lowercase, spaces replaced with underscores, non-alphanumeric characters (except underscores) removed, and truncated to 50 characters. If no text is found or sanitization results in an empty string, it defaults to "unnamed_button".
- **button_id**: The `id` attribute of the button. If the button has no ID, this defaults to "noid".

For example, `<button id="myBtn">Submit</button>` would generate an event named `click:button:submit:mybtn`.

#### Custom Event Names

You can override the automatic naming by adding the `data-infinity-event-name` attribute to your button. This is useful for standardizing event names across your application or tracking specific user actions.

```html
<button data-infinity-event-name="newsletter_signup">
  Subscribe to Newsletter
</button>

<button data-infinity-event-name="download_started">Download App</button>
```

#### Custom Metadata

Add custom metadata to button events using `data-infinity-metadata-*` attributes. This allows you to capture additional context about the user's action.

```html
<button
  data-infinity-event-name="product_purchased"
  data-infinity-metadata-product="premium_plan"
  data-infinity-metadata-price="29.99"
  data-infinity-metadata-billing="monthly"
>
  Buy Premium Plan
</button>
```

#### Purchase Tracking

You can automatically track purchases by setting `data-infinity-event-name="revenue:purchased"` on buttons. This creates standardized purchase events that integrate with your revenue analytics. See the [Purchase Tracking](/docs/revenue-tracking) section for complete details and examples.

**Note**: If an `<a>` tag is styled like a button but includes the `data-infinity-event-name` attribute, it will be handled by Link Event Tracking (see below) to avoid duplication, and this general button tracking will defer.

### Link Event Tracking

Track clicks on specific links declaratively by adding data- attributes to your `<a>` tags. This is useful for CTAs or important navigational elements. This method takes priority over general button click tracking for `<a>` tags to prevent double counting.

- **Activation**: Add `data-infinity-event-name` to the link.
- **Event Naming**: The value of `data-infinity-event-name` is used directly as the event name (no sanitization for custom names).
- **Automatic Metadata**: `href` (link URL) and `text` (link text).
- **Custom Metadata**: Use attributes like `data-infinity-metadata-yourkey="value"`.

#### Navigation Links

For links that navigate to other pages, the SDK automatically uses `navigator.sendBeacon()` to ensure the event is sent even if the user navigates away immediately. This provides reliable tracking for navigation events.

##### Basic Example

```html
<a
  href="/features"
  data-infinity-event-name="Clicked Features Link From Docs"
  data-infinity-metadata-location="Docs Page Section"
  data-infinity-metadata-custom_id="feat_123"
>
  Explore Our Features
</a>
```

##### Common Use Cases

```html
<!-- Track external link clicks -->
<a
  href="https://partner.com"
  data-infinity-event-name="external_link_clicked"
  data-infinity-metadata-partner="partner_name"
>
  Visit Partner Site
</a>

<!-- Track CTA clicks -->
<a
  href="/signup"
  data-infinity-event-name="cta_clicked"
  data-infinity-metadata-location="header"
  data-infinity-metadata-variant="primary"
>
  Get Started
</a>

<!-- Track download events -->
<a
  href="/download/app.zip"
  data-infinity-event-name="download_started"
  data-infinity-metadata-file="mobile_app"
  data-infinity-metadata-version="1.2.0"
>
  Download App
</a>
```

### Offline Support

The SDK automatically detects when the user is offline and stores events locally for a reasonable period of time. When the connection is restored, it will send the stored events to the server.
