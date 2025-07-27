---
title: API Reference
layout: "../../layouts/DocsLayout.astro"
---

# API Reference

REST API endpoints for server-side integration with Infinity Metrics.

## Authentication

All API requests require authentication using your API key. Include it in the request headers:

```bash
Authorization: Bearer YOUR_API_KEY
```

You can find your API key in the administration interface under Settings > API Keys.

## Base URL

```
https://your-domain.com/api/v1
```

## Endpoints

### Send Event

Send a custom event to your analytics.

**POST** `/events`

**Headers:**
- `Authorization: Bearer YOUR_API_KEY`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "event_name": "user_signup",
  "metadata": {
    "plan": "premium",
    "source": "landing_page"
  },
  "visitor_id": "optional_visitor_id",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "event_id": "evt_123456789"
}
```

### Send Purchase Event

Track revenue events through the API.

**POST** `/events/purchase`

**Headers:**
- `Authorization: Bearer YOUR_API_KEY`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "price": 2999,
  "currency": "USD",
  "product_name": "Premium Plan",
  "quantity": 1,
  "metadata": {
    "billing": "monthly",
    "category": "subscription"
  },
  "visitor_id": "optional_visitor_id",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Get Analytics Data

Retrieve analytics data for your dashboard.

**GET** `/analytics`

**Headers:**
- `Authorization: Bearer YOUR_API_KEY`

**Query Parameters:**
- `start_date`: ISO 8601 date (e.g., `2024-01-01`)
- `end_date`: ISO 8601 date (e.g., `2024-01-31`)
- `metrics`: Comma-separated list (`page_views,unique_visitors,events`)

**Response:**
```json
{
  "data": {
    "page_views": 15420,
    "unique_visitors": 3247,
    "events": 892
  },
  "period": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

## Error Responses

All endpoints return standard HTTP status codes and JSON error responses:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Event name is required"
  }
}
```

**Common Error Codes:**
- `400` - Bad Request
- `401` - Unauthorized (invalid API key)
- `403` - Forbidden (insufficient permissions)
- `429` - Rate Limited
- `500` - Internal Server Error

## Rate Limits

- **Events API**: 1000 requests per minute
- **Analytics API**: 100 requests per minute

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`: Requests allowed per minute
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Unix timestamp when limit resets

## SDK Integration

For client-side tracking, use the [tracking script integration](/docs/integrations/generic) instead of direct API calls.