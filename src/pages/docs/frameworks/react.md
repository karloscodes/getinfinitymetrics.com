---
title: React Integration
layout: "../../../layouts/DocsLayout.astro"
---

# React Integration

Integrate Infinity Metrics with React applications for comprehensive user interaction and page view tracking.

## Installation

### Basic Setup

**1. Add the tracking script to your HTML template:**

```html
<!-- public/index.html -->
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

**2. Create an Analytics component:**

```jsx
// src/components/Analytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (window.InfinityMetrics) {
      window.InfinityMetrics.sendPageView();
    }
  }, [location]);

  return null;
}

export default Analytics;
```

**3. Add Analytics to your App component:**

```jsx
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Analytics from './components/Analytics';

function App() {
  return (
    <Router>
      <div className="App">
        <Analytics />
        <Routes>
          {/* Your routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

## Custom Hooks

### useAnalytics Hook

Create a reusable hook for analytics tracking:

```jsx
// src/hooks/useAnalytics.js
import { useCallback } from 'react';

export function useAnalytics() {
  const trackEvent = useCallback((eventName, metadata = {}) => {
    if (window.InfinityMetrics) {
      window.InfinityMetrics.sendCustomEvent(eventName, metadata);
    }
  }, []);

  const trackPurchase = useCallback((price, currency, metadata = {}) => {
    if (window.InfinityMetrics) {
      window.InfinityMetrics.registerPurchase(price, currency, metadata);
    }
  }, []);

  return { trackEvent, trackPurchase };
}
```

### Usage Example

```jsx
// src/components/SignupForm.js
import React, { useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

function SignupForm() {
  const [email, setEmail] = useState('');
  const { trackEvent } = useAnalytics();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    trackEvent('signup_started', {
      email_domain: email.split('@')[1],
      form_location: 'homepage'
    });

    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
```

## Component-Level Tracking

### Button Click Tracking

```jsx
// src/components/TrackingButton.js
import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

function TrackingButton({ children, eventName, metadata, ...props }) {
  const { trackEvent } = useAnalytics();

  const handleClick = (e) => {
    if (eventName) {
      trackEvent(eventName, metadata);
    }
    
    // Call original onClick if provided
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
}

// Usage
<TrackingButton
  eventName="cta_clicked"
  metadata={{ location: 'header', variant: 'primary' }}
  onClick={() => console.log('Button clicked')}
>
  Get Started
</TrackingButton>
```

### Page View Tracking with Metadata

```jsx
// src/components/PageTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';

function PageTracker({ pageMetadata = {} }) {
  const location = useLocation();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('page_view', {
      path: location.pathname,
      search: location.search,
      ...pageMetadata
    });
  }, [location, pageMetadata, trackEvent]);

  return null;
}

// Usage in specific pages
function ProductPage({ productId }) {
  return (
    <div>
      <PageTracker pageMetadata={{ 
        page_type: 'product',
        product_id: productId 
      }} />
      {/* Page content */}
    </div>
  );
}
```

## E-commerce Integration

### Shopping Cart Tracking

```jsx
// src/hooks/useCart.js
import { useState, useCallback } from 'react';
import { useAnalytics } from './useAnalytics';

export function useCart() {
  const [items, setItems] = useState([]);
  const { trackEvent, trackPurchase } = useAnalytics();

  const addToCart = useCallback((product) => {
    setItems(prev => [...prev, product]);
    
    trackEvent('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: 1
    });
  }, [trackEvent]);

  const removeFromCart = useCallback((productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
    
    trackEvent('remove_from_cart', {
      product_id: productId
    });
  }, [trackEvent]);

  const checkout = useCallback((paymentInfo) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    
    trackPurchase(total * 100, 'USD', { // Convert to cents
      item_count: items.length,
      payment_method: paymentInfo.method
    });

    setItems([]);
  }, [items, trackPurchase]);

  return { items, addToCart, removeFromCart, checkout };
}
```

### Product Interaction Tracking

```jsx
// src/components/ProductCard.js
import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

function ProductCard({ product }) {
  const { trackEvent } = useAnalytics();

  const handleProductView = () => {
    trackEvent('product_viewed', {
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      price: product.price
    });
  };

  const handleAddToCart = () => {
    trackEvent('add_to_cart_clicked', {
      product_id: product.id,
      source: 'product_card'
    });
  };

  React.useEffect(() => {
    handleProductView();
  }, [product.id]);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
```

## Advanced Features

### Form Analytics

```jsx
// src/components/AnalyticsForm.js
import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

function AnalyticsForm({ formName, children, onSubmit }) {
  const [startTime] = useState(Date.now());
  const [fieldInteractions, setFieldInteractions] = useState({});
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('form_started', { form_name: formName });
  }, [formName, trackEvent]);

  const handleFieldFocus = (fieldName) => {
    setFieldInteractions(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], focused: true }
    }));
  };

  const handleFieldChange = (fieldName) => {
    setFieldInteractions(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], changed: true }
    }));
  };

  const handleSubmit = (e) => {
    const timeSpent = Date.now() - startTime;
    const fieldsInteracted = Object.keys(fieldInteractions).length;
    
    trackEvent('form_submitted', {
      form_name: formName,
      time_spent: timeSpent,
      fields_interacted: fieldsInteracted
    });

    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {React.Children.map(children, child => {
        if (child.type === 'input') {
          return React.cloneElement(child, {
            onFocus: () => handleFieldFocus(child.props.name),
            onChange: (e) => {
              handleFieldChange(child.props.name);
              if (child.props.onChange) {
                child.props.onChange(e);
              }
            }
          });
        }
        return child;
      })}
    </form>
  );
}
```

### Error Tracking

```jsx
// src/components/ErrorBoundary.js
import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Track the error
    if (window.InfinityMetrics) {
      window.InfinityMetrics.sendCustomEvent('javascript_error', {
        error_message: error.message,
        error_stack: error.stack,
        component_stack: errorInfo.componentStack
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## TypeScript Support

```typescript
// src/types/analytics.ts
declare global {
  interface Window {
    InfinityMetrics: {
      sendCustomEvent: (eventName: string, metadata?: Record<string, any>) => void;
      registerPurchase: (price: number, currency: string, metadata?: Record<string, any>) => void;
      sendPageView: () => void;
    };
  }
}

// src/hooks/useAnalytics.ts
import { useCallback } from 'react';

interface AnalyticsHook {
  trackEvent: (eventName: string, metadata?: Record<string, any>) => void;
  trackPurchase: (price: number, currency: string, metadata?: Record<string, any>) => void;
}

export function useAnalytics(): AnalyticsHook {
  const trackEvent = useCallback((eventName: string, metadata: Record<string, any> = {}) => {
    if (window.InfinityMetrics) {
      window.InfinityMetrics.sendCustomEvent(eventName, metadata);
    }
  }, []);

  const trackPurchase = useCallback((price: number, currency: string, metadata: Record<string, any> = {}) => {
    if (window.InfinityMetrics) {
      window.InfinityMetrics.registerPurchase(price, currency, metadata);
    }
  }, []);

  return { trackEvent, trackPurchase };
}
```

## Best Practices

1. **Conditional Tracking**: Only track in production environments
2. **Error Handling**: Wrap analytics calls in try-catch blocks
3. **Performance**: Use useCallback for event handlers to prevent unnecessary re-renders
4. **Privacy**: Respect user consent and implement opt-out mechanisms
5. **Testing**: Mock analytics in tests to avoid sending events during test runs

```jsx
// src/utils/analytics.js
export const isProduction = process.env.NODE_ENV === 'production';

export function trackEvent(eventName, metadata) {
  if (!isProduction) return;
  
  try {
    if (window.InfinityMetrics) {
      window.InfinityMetrics.sendCustomEvent(eventName, metadata);
    }
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
}
```

This integration provides a robust foundation for tracking user interactions in your React application while maintaining clean, maintainable code.