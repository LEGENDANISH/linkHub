# 📁 LinkHub Backend - Project Structure

## Complete File Tree

```
linkhub-backend/
├── prisma/
│   ├── schema.prisma          # Database schema with all models
│   └── seed.js                # Initial data seeding (subscription plans)
│
├── src/
│   ├── config/
│   │   └── database.js        # Prisma client configuration
│   │
│   ├── controllers/
│   │   ├── auth.controller.js         # Authentication logic
│   │   ├── profile.controller.js      # Profile management
│   │   ├── link.controller.js         # Link CRUD operations
│   │   └── subscription.controller.js # Subscription & payment logic
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js         # JWT authentication
│   │   ├── subscription.middleware.js # Feature & plan gating
│   │   ├── validation.middleware.js   # Request validation
│   │   └── error.middleware.js        # Global error handling
│   │
│   ├── routes/
│   │   ├── index.js                   # Main router (combines all routes)
│   │   ├── auth.routes.js             # Auth endpoints with validation
│   │   ├── profile.routes.js          # Profile endpoints
│   │   ├── link.routes.js             # Link endpoints
│   │   └── subscription.routes.js     # Subscription endpoints
│   │
│   └── server.js              # Express app configuration & startup
│
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies & scripts
├── README.md                  # Full documentation
├── API_ROUTES.md              # API reference guide
└── QUICKSTART.md              # 5-minute setup guide
```

## 📋 File Descriptions

### Core Files

#### `src/server.js` (Main Entry Point)
- Express app initialization
- Middleware setup (CORS, helmet, rate limiting)
- Route mounting
- Error handling
- Server startup

#### `prisma/schema.prisma` (Database Schema)
Defines all database models:
- **User & Auth**: User, Account, Session, VerificationToken
- **Subscription**: Subscription, Plan, Payment
- **Content**: Profile, Link, LinkClick, Analytics
- **Enums**: All status types and options

### Controllers (Business Logic)

#### `auth.controller.js`
- `register` - Create new user account
- `login` - Authenticate user
- `refreshToken` - Renew access token
- `getMe` - Get current user data
- `updateUser` - Update user info
- `changePassword` - Password management
- `deleteAccount` - Account deletion

#### `profile.controller.js`
- `getPublicProfile` - Public profile view (by slug)
- `getMyProfile` - Get authenticated user's profile
- `updateProfile` - Update design & content
- `getProfileAnalytics` - View analytics (Pro/Premium)
- `checkSlugAvailability` - Validate slug uniqueness

#### `link.controller.js`
- `getLinks` - List all user links
- `getLink` - Single link details
- `createLink` - Add new link (with limit check)
- `updateLink` - Modify link
- `deleteLink` - Remove link
- `reorderLinks` - Change link order
- `trackClick` - Record click event (public)
- `getLinkAnalytics` - Link performance data

#### `subscription.controller.js`
- `getPlans` - List available plans
- `getPlan` - Plan details
- `getMySubscription` - Current subscription status
- `subscribeToPlan` - Create/update subscription
- `upgradePlan` - Upgrade to higher tier
- `downgradePlan` - Downgrade plan
- `cancelSubscription` - Cancel at period end
- `resumeSubscription` - Reactivate cancelled subscription
- `getPaymentHistory` - Payment records
- `getFeatures` - Available features by plan

### Middleware (Request Processing)

#### `auth.middleware.js`
- `authenticate` - Verify JWT, attach user to req
- `optionalAuth` - Non-required authentication

#### `subscription.middleware.js`
- `requireSubscription(['PRO'])` - Require specific plans
- `requireFeature('analytics')` - Feature-based access
- `checkLinkLimit` - Validate link count vs plan
- `attachSubscription` - Add subscription to request

#### `validation.middleware.js`
- `validate` - Process express-validator results
- `checkOwnership` - Resource ownership verification

#### `error.middleware.js`
- `errorHandler` - Global error processing
- `notFound` - 404 handler

### Routes (API Endpoints)

All routes use express-validator for input validation.

#### `auth.routes.js` - `/api/auth`
```
POST   /register         - Create account
POST   /login            - Login
POST   /refresh          - Refresh token
GET    /me               - Current user
PUT    /update           - Update user
PUT    /change-password  - Change password
DELETE /delete           - Delete account
```

#### `profile.routes.js` - `/api/profile`
```
GET    /:slug            - Public profile
GET    /me/profile       - My profile
PUT    /update           - Update profile
GET    /me/analytics     - Profile analytics (Pro+)
GET    /check-slug/:slug - Check availability
```

#### `link.routes.js` - `/api/links`
```
GET    /                 - List links
GET    /:id              - Single link
POST   /                 - Create link (checks limit)
PUT    /:id              - Update link
DELETE /:id              - Delete link
PUT    /bulk/reorder     - Reorder links
POST   /:id/click        - Track click (public)
GET    /:id/analytics    - Link analytics (Pro+)
```

#### `subscription.routes.js` - `/api/subscriptions`
```
GET    /plans            - All plans
GET    /plans/:id        - Plan details
GET    /my-subscription  - My subscription
POST   /subscribe        - Subscribe
PUT    /upgrade          - Upgrade plan
PUT    /downgrade        - Downgrade plan
PUT    /cancel           - Cancel subscription
PUT    /resume           - Resume subscription
GET    /payment-history  - Payments
GET    /features         - Available features
```

## 🔑 Key Features

### 1. Authentication System
- JWT-based with access & refresh tokens
- Secure password hashing (bcrypt)
- Token expiration handling
- User session management

### 2. Subscription System
- Three-tier plans (Free, Pro, Premium)
- Feature gating middleware
- Link limit enforcement
- Payment tracking
- Plan upgrades/downgrades
- Cancellation with grace period

### 3. Profile Customization
- Multiple layout options (Classic, Hero)
- Background styles (Solid, Gradient, Image, Video, Pattern)
- Visual effects (Blur, Noise)
- Custom branding
- SEO metadata

### 4. Link Management
- CRUD operations
- Drag-and-drop ordering
- Link scheduling (Pro+)
- Multiple link types
- Custom styling per link

### 5. Analytics Tracking
- Profile view counting
- Link click tracking
- Detailed visitor metrics
- Time-based analytics
- Conversion tracking

### 6. Security Features
- Helmet.js for HTTP headers
- Rate limiting
- CORS configuration
- Input validation
- SQL injection prevention (Prisma)
- XSS protection

## 🗄️ Database Models

### User Management
- `User` - Account information
- `Account` - OAuth accounts
- `Session` - Active sessions
- `VerificationToken` - Email verification

### Subscription & Billing
- `Subscription` - User subscriptions
- `Plan` - Available plans
- `Payment` - Payment records

### Content
- `Profile` - User profiles with design
- `Link` - User links
- `LinkClick` - Click tracking
- `Analytics` - Profile analytics

## 🔒 Access Control

### Public Endpoints
- Get public profile
- Track link clicks
- View plans
- Check slug availability

### Authenticated Endpoints
- Profile management
- Link CRUD
- User settings
- Subscription management

### Feature-Gated Endpoints
- Analytics (Pro+)
- Scheduled links (Pro+)
- Video backgrounds (Pro+)
- Custom themes (Pro+)

## 🚀 Performance Optimizations

1. **Database Indexing**: Key fields indexed for fast queries
2. **Prisma Connection Pooling**: Efficient database connections
3. **Rate Limiting**: Prevent abuse
4. **Selective Field Selection**: Only fetch needed data
5. **Transaction Support**: Data consistency

## 📊 Subscription Plans Comparison

| Feature | Free | Pro ($9.99) | Premium ($29.99) |
|---------|------|-------------|------------------|
| Links | 5 | 50 | Unlimited |
| Analytics | ❌ | ✅ | ✅ |
| Custom Domain | ❌ | ✅ | ✅ |
| Scheduled Links | ❌ | ✅ | ✅ |
| Video Background | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ❌ | ✅ |

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Security**: helmet, bcryptjs, cors
- **Rate Limiting**: express-rate-limit

## 📝 Environment Variables

Required in `.env`:
```env
DATABASE_URL          # PostgreSQL connection string
JWT_SECRET            # Token signing secret
JWT_REFRESH_SECRET    # Refresh token secret
PORT                  # Server port (default: 5000)
FRONTEND_URL          # CORS origin
NODE_ENV              # development/production
```

Optional (for payments):
```env
STRIPE_SECRET_KEY     # Stripe API key
STRIPE_WEBHOOK_SECRET # Webhook verification
```

## 🎯 Design Patterns Used

1. **MVC Pattern**: Models (Prisma), Views (JSON), Controllers
2. **Middleware Chain**: Request → Auth → Validation → Controller
3. **Repository Pattern**: Prisma as data access layer
4. **Factory Pattern**: Token generation
5. **Strategy Pattern**: Multiple auth strategies
6. **Singleton Pattern**: Prisma client

## 📈 Scalability Considerations

1. **Stateless Auth**: JWT tokens (horizontal scaling ready)
2. **Database Pooling**: Prisma connection management
3. **Async/Await**: Non-blocking operations
4. **Indexing**: Optimized queries
5. **Modular Structure**: Easy to split into microservices

---

**Total Lines of Code**: ~3,500+
**Total Files**: 20+
**Controllers**: 4
**Routes**: 4
**Middleware**: 4
**Database Models**: 13
