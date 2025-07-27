---
title: Migration Guide
layout: "../../layouts/DocsLayout.astro"
---

# Migration Guide

Migrate from popular analytics platforms to Infinity Metrics while preserving your historical data and analytics setup.

## From Google Analytics

### Universal Analytics (GA3)

**1. Export Historical Data**
Use Google Analytics Intelligence API or export reports manually before migration.

**2. Event Mapping**
Map your existing events to Infinity Metrics custom events:

```javascript
// GA3 Event
ga('send', 'event', 'Category', 'Action', 'Label', Value);

// Infinity Metrics Equivalent
InfinityMetrics.sendCustomEvent('category_action', {
  label: 'Label',
  value: Value
});
```

**3. Replace Tracking Code**
```html
<!-- Remove GA3 -->
<!-- Global site tag (gtag.js) - Google Analytics -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> -->

<!-- Add Infinity Metrics -->
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

### Google Analytics 4 (GA4)

**1. Event Structure Mapping**
GA4's event-parameter model maps well to Infinity Metrics:

```javascript
// GA4 Event
gtag('event', 'purchase', {
  transaction_id: '12345',
  value: 29.99,
  currency: 'USD'
});

// Infinity Metrics Equivalent
InfinityMetrics.registerPurchase(2999, 'USD', {
  transaction_id: '12345'
});
```

**2. Custom Dimensions/Metrics**
Use metadata in Infinity Metrics:

```javascript
// GA4 Custom Parameter
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: { custom_parameter_1: 'user_type' }
});

// Infinity Metrics Metadata
InfinityMetrics.sendCustomEvent('page_view', {
  user_type: 'premium'
});
```

## From Plausible Analytics

Plausible's goal-based tracking maps directly to custom events:

```javascript
// Plausible Goal
plausible('signup');

// Infinity Metrics Equivalent
InfinityMetrics.sendCustomEvent('signup');
```

**Custom Properties Migration:**
```javascript
// Plausible with properties
plausible('signup', { props: { plan: 'premium' } });

// Infinity Metrics with metadata
InfinityMetrics.sendCustomEvent('signup', { plan: 'premium' });
```

## From Matomo

**1. Event Categories Migration**
```javascript
// Matomo Event
_paq.push(['trackEvent', 'Category', 'Action', 'Name', Value]);

// Infinity Metrics
InfinityMetrics.sendCustomEvent('category_action', {
  name: 'Name',
  value: Value
});
```

**2. Custom Variables**
```javascript
// Matomo Custom Variable
_paq.push(['setCustomVariable', 1, 'Type', 'Customer', 'visit']);

// Infinity Metrics Metadata
InfinityMetrics.sendCustomEvent('page_view', {
  visitor_type: 'customer'
});
```

## From Adobe Analytics

**1. eVar/prop Migration**
Map Adobe's eVars and props to Infinity Metrics metadata:

```javascript
// Adobe Analytics
s.eVar1 = 'value';
s.prop1 = 'value';
s.t();

// Infinity Metrics
InfinityMetrics.sendCustomEvent('page_view', {
  evar1_equivalent: 'value',
  prop1_equivalent: 'value'
});
```

**2. Success Events**
```javascript
// Adobe Success Event
s.events = 'event1,purchase';

// Infinity Metrics
InfinityMetrics.sendCustomEvent('success_event_1');
InfinityMetrics.registerPurchase(price, 'USD');
```

## From Mixpanel

Mixpanel's event-property model is very similar:

```javascript
// Mixpanel Event
mixpanel.track('Video Played', {
  'video_title': 'Product Demo',
  'video_length': 30
});

// Infinity Metrics Equivalent
InfinityMetrics.sendCustomEvent('video_played', {
  video_title: 'Product Demo',
  video_length: 30
});
```

## From Segment

If you're using Segment, you can:

**1. Dual-track temporarily**
Run both analytics during transition period.

**2. Replace destination**
Remove your current analytics destination and add Infinity Metrics via API.

**3. Event mapping**
```javascript
// Segment Track
analytics.track('User Signed Up', {
  plan: 'premium',
  source: 'organic'
});

// Infinity Metrics
InfinityMetrics.sendCustomEvent('user_signed_up', {
  plan: 'premium',
  source: 'organic'
});
```

## Migration Checklist

### Pre-Migration
- [ ] Export historical data from current platform
- [ ] Document existing event taxonomy
- [ ] Set up Infinity Metrics instance
- [ ] Test tracking on staging environment

### During Migration
- [ ] Install Infinity Metrics tracking code
- [ ] Remove old analytics code
- [ ] Update event tracking implementations
- [ ] Test all custom events and goals

### Post-Migration
- [ ] Verify data collection for 24-48 hours
- [ ] Update dashboards and reports
- [ ] Train team on new analytics interface
- [ ] Archive old analytics account

## Common Migration Patterns

### E-commerce Events
```javascript
// Standard e-commerce events across platforms
InfinityMetrics.sendCustomEvent('product_viewed', { product_id: '123' });
InfinityMetrics.sendCustomEvent('cart_added', { product_id: '123', quantity: 1 });
InfinityMetrics.registerPurchase(2999, 'USD', { product_id: '123' });
```

### Content Engagement
```javascript
// Blog/content tracking
InfinityMetrics.sendCustomEvent('article_read', { 
  article_title: 'Getting Started',
  read_percentage: 75 
});
```

### User Journey Tracking
```javascript
// Funnel/journey events
InfinityMetrics.sendCustomEvent('trial_started', { plan: 'premium' });
InfinityMetrics.sendCustomEvent('onboarding_completed', { steps: 5 });
InfinityMetrics.sendCustomEvent('feature_used', { feature: 'ai_insights' });
```

## Need Help?

If you need assistance with your migration:

1. **Review Documentation**: Check our [Custom Events](/docs/custom-events) guide
2. **Test Implementation**: Use our [Generic Integration Guide](/docs/integrations/generic) for detailed examples
3. **Contact Support**: Reach out via our support channels for migration assistance

The migration process typically takes 1-2 days for most websites, depending on the complexity of your current analytics setup.