# LinkHub API Routes Summary

## Quick Reference Guide

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/refresh` | Refresh access token | ❌ |
| GET | `/me` | Get current user | ✅ |
| PUT | `/update` | Update user profile | ✅ |
| PUT | `/change-password` | Change password | ✅ |
| DELETE | `/delete` | Delete account | ✅ |

### Profile Routes (`/api/profile`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/:slug` | Get public profile | ❌ |
| GET | `/me/profile` | Get my profile | ✅ |
| PUT | `/update` | Update profile design | ✅ |
| GET | `/me/analytics` | Get profile analytics | ✅ (+ analytics feature) |
| GET | `/check-slug/:slug` | Check slug availability | ❌ |

### Link Routes (`/api/links`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all my links | ✅ |
| GET | `/:id` | Get single link | ✅ |
| POST | `/` | Create new link | ✅ (+ checks limit) |
| PUT | `/:id` | Update link | ✅ |
| DELETE | `/:id` | Delete link | ✅ |
| PUT | `/bulk/reorder` | Reorder links | ✅ |
| POST | `/:id/click` | Track link click | ❌ |
| GET | `/:id/analytics` | Get link analytics | ✅ (+ analytics feature) |

### Subscription Routes (`/api/subscriptions`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-- -----------|---------------|
| GET | `/plans` | Get all plans | ❌ |
| GET | `/plans/:id` | Get plan details | ❌ |
| GET | `/my-subscription` | Get my subscription | ✅ |
| POST | `/subscribe` | Subscribe to plan | ✅ |
| PUT | `/upgrade` | Upgrade plan | ✅ |
| PUT | `/downgrade` | Downgrade plan | ✅ |
| PUT | `/cancel` | Cancel subscription | ✅ |
| PUT | `/resume` | Resume subscription | ✅ |
| GET | `/payment-history` | Get payment history | ✅ |
| GET | `/features` | Get available features | ✅ |

---

## Common Request/Response Examples

### Register & Login Flow

#### 1. Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123",
    "name": "John Doe"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

#### 3. Use token for authenticated requests
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGc..."
```

---

### Profile Management Flow

#### 1. Get my profile
```bash
curl -X GET http://localhost:5000/api/profile/me/profile \
  -H "Authorization: Bearer <token>"
```

#### 2. Update profile design
```bash
curl -X PUT http://localhost:5000/api/profile/update \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "wallpaperStyle": "GRADIENT",
    "gradientFrom": "#667eea",
    "gradientTo": "#764ba2",
    "profileLayout": "HERO",
    "blurEffect": true
  }'
```

#### 3. View public profile
```bash
curl -X GET http://localhost:5000/api/profile/johndoe
```

---

### Link Management Flow

#### 1. Create link
```bash
curl -X POST http://localhost:5000/api/links \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Website",
    "url": "https://example.com",
    "icon": "🌐",
    "buttonColor": "#667eea"
  }'
```

#### 2. Get all links
```bash
curl -X GET http://localhost:5000/api/links \
  -H "Authorization: Bearer <token>"
```

#### 3. Reorder links
```bash
curl -X PUT http://localhost:5000/api/links/bulk/reorder \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "linkOrders": [
      { "id": "link-1", "order": 0 },
      { "id": "link-2", "order": 1 }
    ]
  }'
```

#### 4. Track click (public)
```bash
curl -X POST http://localhost:5000/api/links/<link-id>/click
```

---

### Subscription Flow

#### 1. View available plans
```bash
curl -X GET http://localhost:5000/api/subscriptions/plans
```

#### 2. Subscribe to Pro plan
```bash
curl -X POST http://localhost:5000/api/subscriptions/subscribe \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "planId": "pro-plan-id"
  }'
```

#### 3. Check my features
```bash
curl -X GET http://localhost:5000/api/subscriptions/features \
  -H "Authorization: Bearer <token>"
```

---

## Error Codes Reference

### Subscription Error Codes
- `SUBSCRIPTION_REQUIRED` - No active subscription
- `SUBSCRIPTION_EXPIRED` - Subscription expired
- `UPGRADE_REQUIRED` - Feature requires higher plan
- `FEATURE_NOT_AVAILABLE` - Feature not in current plan
- `LINK_LIMIT_REACHED` - Max links reached for plan

---

## Middleware Flow

### Authentication Flow
```
Request → Rate Limiter → Auth Middleware → Controller
                              ↓
                         Attach req.user
```

### Subscription Check Flow
```
Request → Auth Middleware → Subscription Middleware → Controller
              ↓                     ↓
         Attach user        Check plan/feature
```

---

## Database Enums

### TitleType
- `TEXT`
- `LOGO`

### ProfileLayout
- `CLASSIC`
- `HERO`

### ProfileSize
- `SMALL`
- `MEDIUM`
- `LARGE`

### WallpaperStyle
- `SOLID`
- `GRADIENT`
- `IMAGE`
- `VIDEO`
- `PATTERN`

### PatternType
- `DOTS`
- `GRID`
- `LINES`
- `WAVES`
- `DIAGONAL`
- `CIRCLES`

### LinkType
- `STANDARD`
- `HEADER`
- `SOCIAL`
- `EMBED`
- `EMAIL`
- `PHONE`

### SubscriptionStatus
- `ACTIVE`
- `CANCELED`
- `EXPIRED`
- `PAST_DUE`
- `TRIALING`

### PaymentStatus
- `PENDING`
- `SUCCEEDED`
- `FAILED`
- `REFUNDED`

---

## Rate Limiting

Default: 100 requests per 15 minutes per IP

Can be configured in `.env`:
```env
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

---

## CORS Configuration

Default: `http://localhost:3000`

Configure in `.env`:
```env
FRONTEND_URL=http://localhost:3000
```

For multiple origins, modify `server.js`:
```javascript
cors({
  origin: [
    'http://localhost:3000',
    'https://yourdomain.com'
  ],
  credentials: true
})
```
