---
title: Next.js Integration
layout: "../../../layouts/DocsLayout.astro"
---

# Next.js Integration

Integrate Infinity Metrics with Next.js applications for comprehensive analytics tracking across pages and user interactions.

## Installation

### App Router (Next.js 13+)

**1. Add the tracking script to your root layout:**

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://your-domain.com/api/v1/sdk.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
```

**2. Create an analytics wrapper component:**

```tsx
// components/analytics.tsx
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    InfinityMetrics: any;
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window.InfinityMetrics !== 'undefined') {
      window.InfinityMetrics.sendPageView()
    }
  }, [pathname, searchParams])

  return null
}
```

**3. Add the Analytics component to your layout:**

```tsx
// app/layout.tsx
import { Analytics } from '@/components/analytics'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <Script
          src="https://your-domain.com/api/v1/sdk.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
```

### Pages Router (Next.js 12 and below)

**1. Add script to `_document.js`:**

```jsx
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://your-domain.com/api/v1/sdk.js"
          strategy="afterInteractive"
        />
      </body>
    </Html>
  )
}
```

**2. Track route changes in `_app.js`:**

```jsx
// pages/_app.js
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window.InfinityMetrics !== 'undefined') {
        window.InfinityMetrics.sendPageView()
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default MyApp
```

## Custom Event Tracking

### Hook for Event Tracking

Create a custom hook for easier event tracking:

```tsx
// hooks/useAnalytics.ts
import { useCallback } from 'react'

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, metadata?: Record<string, any>) => {
    if (typeof window.InfinityMetrics !== 'undefined') {
      window.InfinityMetrics.sendCustomEvent(eventName, metadata)
    }
  }, [])

  const trackPurchase = useCallback((price: number, currency: string, metadata?: Record<string, any>) => {
    if (typeof window.InfinityMetrics !== 'undefined') {
      window.InfinityMetrics.registerPurchase(price, currency, metadata)
    }
  }, [])

  return { trackEvent, trackPurchase }
}
```

### Component Usage

```tsx
// components/signup-button.tsx
'use client'

import { useAnalytics } from '@/hooks/useAnalytics'

export function SignupButton() {
  const { trackEvent } = useAnalytics()

  const handleSignup = () => {
    trackEvent('signup_started', {
      source: 'header_cta',
      page: window.location.pathname
    })
    // Handle signup logic
  }

  return (
    <button onClick={handleSignup}>
      Sign Up
    </button>
  )
}
```

## E-commerce Tracking

### Product View Tracking

```tsx
// app/product/[id]/page.tsx
'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { useEffect } from 'react'

export default function ProductPage({ params }: { params: { id: string } }) {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent('product_viewed', {
      product_id: params.id,
      category: 'electronics'
    })
  }, [params.id, trackEvent])

  return (
    <div>
      {/* Product content */}
    </div>
  )
}
```

### Purchase Completion

```tsx
// app/checkout/success/page.tsx
'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function CheckoutSuccess() {
  const { trackPurchase } = useAnalytics()
  const searchParams = useSearchParams()

  useEffect(() => {
    const amount = searchParams.get('amount')
    const orderId = searchParams.get('order_id')

    if (amount && orderId) {
      trackPurchase(parseInt(amount), 'USD', {
        order_id: orderId,
        payment_method: 'stripe'
      })
    }
  }, [searchParams, trackPurchase])

  return (
    <div>
      <h1>Thank you for your purchase!</h1>
    </div>
  )
}
```

## Server-Side Events

For server-side event tracking (e.g., API routes), use the API directly:

```tsx
// app/api/purchase/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Process purchase...
  
  // Track server-side event
  try {
    await fetch('https://your-domain.com/api/v1/events/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INFINITY_METRICS_API_KEY}`,
      },
      body: JSON.stringify({
        price: body.amount,
        currency: 'USD',
        product_name: body.product_name,
        metadata: {
          order_id: body.order_id,
          user_id: body.user_id
        }
      })
    })
  } catch (error) {
    console.error('Analytics tracking failed:', error)
  }

  return NextResponse.json({ success: true })
}
```

## TypeScript Support

Create type definitions for better development experience:

```typescript
// types/analytics.ts
declare global {
  interface Window {
    InfinityMetrics: {
      sendCustomEvent: (eventName: string, metadata?: Record<string, any>) => void;
      registerPurchase: (price: number, currency: string, metadata?: Record<string, any>) => void;
      sendPageView: () => void;
    };
  }
}

export interface AnalyticsEvent {
  name: string;
  metadata?: Record<string, any>;
}

export interface PurchaseEvent {
  price: number;
  currency: string;
  metadata?: Record<string, any>;
}
```

## Environment Configuration

Set up different tracking for different environments:

```tsx
// lib/analytics.ts
const getAnalyticsConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      enabled: true,
      domain: 'https://analytics.yoursite.com'
    }
  } else if (process.env.NODE_ENV === 'development') {
    return {
      enabled: true,
      domain: 'https://staging-analytics.yoursite.com'
    }
  } else {
    return {
      enabled: false,
      domain: ''
    }
  }
}

export const analyticsConfig = getAnalyticsConfig()
```

## Best Practices

### 1. **Conditional Loading**
Only load analytics in production or when explicitly enabled:

```tsx
{process.env.NODE_ENV === 'production' && (
  <Script
    src="https://your-domain.com/api/v1/sdk.js"
    strategy="afterInteractive"
  />
)}
```

### 2. **Error Boundaries**
Wrap analytics code in try-catch blocks to prevent breaking your app:

```tsx
const trackEvent = useCallback((eventName: string, metadata?: Record<string, any>) => {
  try {
    if (typeof window.InfinityMetrics !== 'undefined') {
      window.InfinityMetrics.sendCustomEvent(eventName, metadata)
    }
  } catch (error) {
    console.warn('Analytics tracking failed:', error)
  }
}, [])
```

### 3. **Performance Optimization**
Use `strategy="afterInteractive"` to ensure the analytics script doesn't block page rendering.

### 4. **Privacy Compliance**
Respect user preferences and implement consent management:

```tsx
// Only track if user has consented
if (userConsent && typeof window.InfinityMetrics !== 'undefined') {
  window.InfinityMetrics.sendCustomEvent('action_performed')
}
```

This integration provides comprehensive analytics tracking for your Next.js application while maintaining performance and user privacy.