# LinkHub Backend API

A complete backend API for LinkHub - a link-in-bio application with subscription system.

## 🚀 Features

- **Authentication & Authorization** - JWT-based auth with refresh tokens
- **Profile Management** - Customizable profiles with multiple design options
- **Link Management** - Create, update, delete, and reorder links
- **Subscription System** - Three-tier subscription (Free, Pro, Premium)
- **Analytics** - Track profile views and link clicks
- **Scheduled Links** - Schedule links to appear at specific times
- **Feature Gating** - Restrict features based on subscription plan

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (or MySQL/SQLite)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd linkhub-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and configure your database and other settings:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/linkhub"
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
PORT=5000
```

4. **Set up database**
```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed initial data (plans)
node prisma/seed.js
```

5. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_access_token>
```

---

## 🔐 Auth Endpoints

### Register User
```http
POST /api/auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "username": "johndoe",
      "name": "John Doe"
    },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

### Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /api/auth/me
```
*Requires authentication*

### Update User
```http
PUT /api/auth/update
```
*Requires authentication*

**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Change Password
```http
PUT /api/auth/change-password
```
*Requires authentication*

**Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

## 👤 Profile Endpoints

### Get Public Profile
```http
GET /api/profile/:slug
```

**Example:**
```http
GET /api/profile/johndoe
```

### Get My Profile
```http
GET /api/profile/me/profile
```
*Requires authentication*

### Update Profile
```http
PUT /api/profile/update
```
*Requires authentication*

**Body:**
```json
{
  "slug": "johndoe",
  "bio": "Welcome to my profile!",
  "profileImage": "https://example.com/image.jpg",
  "titleType": "TEXT",
  "titleText": "John Doe",
  "profileLayout": "CLASSIC",
  "profileSize": "MEDIUM",
  "wallpaperStyle": "GRADIENT",
  "backgroundColor": "#ffffff",
  "gradientFrom": "#667eea",
  "gradientTo": "#764ba2",
  "gradientAngle": 135,
  "blurEffect": false,
  "noiseEffect": false,
  "footerVisible": true,
  "footerText": "© 2024 John Doe"
}
```

### Get Profile Analytics
```http
GET /api/profile/me/analytics?days=30
```
*Requires authentication and analytics feature*

### Check Slug Availability
```http
GET /api/profile/check-slug/:slug
```

**Example:**
```http
GET /api/profile/check-slug/johndoe
```

---

## 🔗 Link Endpoints

### Get All Links
```http
GET /api/links
```
*Requires authentication*

### Get Single Link
```http
GET /api/links/:id
```
*Requires authentication*

### Create Link
```http
POST /api/links
```
*Requires authentication*

**Body:**
```json
{
  "title": "My Website",
  "url": "https://example.com",
  "icon": "🌐",
  "linkType": "STANDARD",
  "buttonStyle": "rounded",
  "buttonColor": "#667eea",
  "textColor": "#ffffff",
  "isActive": true,
  "isScheduled": false
}
```

### Update Link
```http
PUT /api/links/:id
```
*Requires authentication*

**Body:**
```json
{
  "title": "Updated Title",
  "url": "https://newurl.com",
  "isActive": true
}
```

### Delete Link
```http
DELETE /api/links/:id
```
*Requires authentication*

### Reorder Links
```http
PUT /api/links/bulk/reorder
```
*Requires authentication*

**Body:**
```json
{
  "linkOrders": [
    { "id": "link-1", "order": 0 },
    { "id": "link-2", "order": 1 },
    { "id": "link-3", "order": 2 }
  ]
}
```

### Track Link Click
```http
POST /api/links/:id/click
```
*Public endpoint*

### Get Link Analytics
```http
GET /api/links/:id/analytics?days=30
```
*Requires authentication and analytics feature*

---

## 💳 Subscription Endpoints

### Get All Plans
```http
GET /api/subscriptions/plans
```

### Get Plan Details
```http
GET /api/subscriptions/plans/:id
```

### Get My Subscription
```http
GET /api/subscriptions/my-subscription
```
*Requires authentication*

### Subscribe to Plan
```http
POST /api/subscriptions/subscribe
```
*Requires authentication*

**Body:**
```json
{
  "planId": "plan-id-here",
  "paymentMethod": "card"
}
```

### Upgrade Plan
```http
PUT /api/subscriptions/upgrade
```
*Requires authentication*

**Body:**
```json
{
  "planId": "premium-plan-id"
}
```

### Cancel Subscription
```http
PUT /api/subscriptions/cancel
```
*Requires authentication*

### Resume Subscription
```http
PUT /api/subscriptions/resume
```
*Requires authentication*

### Get Payment History
```http
GET /api/subscriptions/payment-history
```
*Requires authentication*

### Get Available Features
```http
GET /api/subscriptions/features
```
*Requires authentication*

---

## 📊 Subscription Plans

| Feature | Free | Pro | Premium |
|---------|------|-----|---------|
| Max Links | 5 | 50 | Unlimited |
| Custom Domain | ❌ | ✅ | ✅ |
| Remove Branding | ❌ | ✅ | ✅ |
| Analytics | ❌ | ✅ | ✅ |
| Scheduled Links | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ❌ | ✅ |
| Custom Themes | ❌ | ✅ | ✅ |
| Video Background | ❌ | ✅ | ✅ |
| **Price** | Free | $9.99/mo | $29.99/mo |

---

## 🔒 Middleware

### Authentication Middleware
- `authenticate` - Requires valid JWT token
- `optionalAuth` - Attaches user if token provided

### Subscription Middleware
- `requireSubscription(['PRO', 'PREMIUM'])` - Requires specific plan
- `requireFeature('analytics')` - Requires specific feature
- `checkLinkLimit` - Validates link count against plan limit

### Validation Middleware
- `validate` - Handles express-validator errors

---

## 🗄️ Database Schema

The database uses Prisma ORM with the following main models:

- **User** - User accounts
- **Profile** - User profiles with design settings
- **Link** - User links
- **Subscription** - User subscriptions
- **Plan** - Subscription plans
- **Payment** - Payment records
- **Analytics** - Profile view analytics
- **LinkClick** - Link click analytics

---

## 🛡️ Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors (if applicable)
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden (subscription required)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

---

## 📝 Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
npm run prisma:generate # Generate Prisma Client
npm run prisma:push    # Push schema to database
npm run prisma:studio  # Open Prisma Studio
npm run prisma:migrate # Create migration
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙋‍♂️ Support

For support, email support@linkhub.com or open an issue in the repository.

---

## 🎯 Next Steps

- [ ] Implement Stripe payment integration
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add file upload for profile images
- [ ] Add webhooks for subscription events
- [ ] Implement rate limiting per plan
- [ ] Add custom domain verification
- [ ] Implement 2FA authentication
- [ ] Add team/organization features
- [ ] Create admin dashboard

---

**Built with ❤️ for creators and professionals**
