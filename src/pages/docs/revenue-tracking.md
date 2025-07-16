---
title: Revenue Tracking
layout: "../../layouts/DocsLayout.astro"
---

# Purchase Tracking

Track revenue events and purchases with InfinityMetrics' built-in purchase tracking functionality. This provides standardized revenue analytics and integrates seamlessly with your existing analytics data.

InfinityMetrics offers two approaches for purchase tracking: programmatic tracking using the `registerPurchase()` function, and automated tracking using HTML attributes. Both methods create the same standardized `revenue:purchased` events.

## Automated Purchase Tracking

Track purchases automatically using HTML attributes by setting `data-infinity-event-name="revenue:purchased"` on buttons or links. This approach is ideal for checkout flows, payment buttons, purchase links, or any purchase-related actions that can be tracked declaratively.

### Required metadata attributes:

- `data-infinity-metadata-price`: Price in cents (e.g., 1999 for $19.99)
- `data-infinity-metadata-currency`: Currency code (e.g., USD, EUR)

### Optional metadata attributes:

- `data-infinity-metadata-quantity`: Number of items (defaults to 1)
- `data-infinity-metadata-product`: Product identifier or name
- `data-infinity-metadata-category`: Product category

```html
<!-- Button example -->
<button
  data-infinity-event-name="revenue:purchased"
  data-infinity-metadata-price="2999"
  data-infinity-metadata-currency="USD"
  data-infinity-metadata-product="premium_plan"
  data-infinity-metadata-quantity="1"
  data-infinity-metadata-category="subscription"
>
  Purchase Premium Plan
</button>

<!-- Link example -->
<a
  href="/checkout/complete"
  data-infinity-event-name="revenue:purchased"
  data-infinity-metadata-price="4999"
  data-infinity-metadata-currency="USD"
  data-infinity-metadata-product="yearly_subscription"
  data-infinity-metadata-quantity="1"
>
  Complete Purchase
</a>
```

## registerPurchase Function

The `registerPurchase` function automatically creates a `revenue:purchased` custom event with standardized purchase data. This ensures consistent revenue tracking across your entire application.

**Syntax**: `InfinityMetrics.registerPurchase(priceInCents, currency, metadata)`

- **priceInCents** (number, required): The purchase price in cents (e.g., 1999 for $19.99). Must be a positive number.
- **currency** (string, optional): Currency code following ISO 4217 standard (defaults to 'USD').
- **metadata** (object, optional): Additional purchase information like product details, quantity, categories, etc.

### Basic Usage

Track a simple purchase with just the price and currency:

```javascript
// Track a $19.99 purchase
window.InfinityMetrics.registerPurchase(1999, "USD");
```

This creates a `revenue:purchased` event with price: 1999, currency: 'USD', and quantity: 1 (default).

### Advanced Usage with Metadata

Include additional product and purchase information for detailed revenue analytics:

```javascript
// Track a purchase with additional metadata
window.InfinityMetrics.registerPurchase(1999, "USD", {
  productId: "prod_123",
  productName: "Premium Plan",
  quantity: 1,
  category: "subscription",
});
```

The metadata object can include any additional fields relevant to your business such as:

- `productId`: Unique product identifier
- `productName`: Human-readable product name
- `category`: Product category or type
- `quantity`: Number of items purchased (defaults to 1)
- `discountCode`: Applied discount or promo code
- `paymentMethod`: Payment method used

## Integration Examples

Common integration patterns for different scenarios:

### E-commerce Checkout

```javascript
// After successful payment processing
InfinityMetrics.registerPurchase(2999, "USD", {
  productId: "widget-pro-123",
  productName: "Widget Pro",
  category: "software",
  quantity: 1,
  discountCode: "SAVE20",
  paymentMethod: "stripe",
});
```

### Subscription Purchase

```javascript
// Monthly subscription signup
InfinityMetrics.registerPurchase(999, "USD", {
  productId: "plan-monthly",
  productName: "Monthly Plan",
  category: "subscription",
  billingCycle: "monthly",
  planType: "premium",
});
```

### Digital Download

```javascript
// Digital product purchase
InfinityMetrics.registerPurchase(1999, "USD", {
  productId: "ebook-advanced-js",
  productName: "Advanced JavaScript Guide",
  category: "digital-content",
  format: "pdf",
  fileSize: "2.5MB",
});
```
