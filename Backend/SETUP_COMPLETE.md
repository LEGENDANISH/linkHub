# 🚀 Complete Setup Guide - LinkHub Backend with All Features

This guide covers setting up the LinkHub backend with:
- ✅ PostgreSQL + Prisma ORM
- ✅ MinIO (Local S3) for file storage
- ✅ Stripe payments (INR currency)
- ✅ Google OAuth login
- ✅ Docker support

---

## 📋 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Docker & Docker Compose** ([Download](https://www.docker.com/))
- **Stripe Account** ([Sign up](https://stripe.com/))
- **Google Cloud Console** for OAuth ([Console](https://console.cloud.google.com/))

---

## 🎯 Quick Start (5 minutes)

### Option 1: Using Docker (Recommended)

```bash
# 1. Clone and navigate
cd linkhub-backend

# 2. Start PostgreSQL and MinIO
docker-compose up -d postgres minio minio-setup

# 3. Wait for services (30 seconds)
docker-compose ps

# 4. Copy environment file
cp .env.example .env

# 5. Edit .env with your settings (see below)
nano .env

# 6. Install dependencies
npm install

# 7. Setup database
npm run prisma:push
node prisma/seed.js

# 8. Start backend
npm run dev
```

### Option 2: Manual Setup

See "Manual Installation" section below.

---

## 🔐 Environment Configuration

Edit `.env` file:

```env
# Database (when using Docker)
DATABASE_URL="postgresql://linkhub:linkhub_password@localhost:5432/linkhub"

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Secrets (generate secure random strings)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this

# File Upload - MinIO Configuration
UPLOAD_STORAGE=s3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
AWS_S3_BUCKET=linkhub-uploads
AWS_S3_ENDPOINT=http://localhost:9000
PUBLIC_URL=http://localhost:5000

# Stripe (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_CURRENCY=INR

# Google OAuth (setup below)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

**Generate JWT Secrets:**
```bash
# Run this command twice for two different secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🗄️ MinIO Setup (Local S3)

### Access MinIO Console

1. **Open MinIO Console**: http://localhost:9001
2. **Login**:
   - Username: `minioadmin`
   - Password: `minioadmin`

3. **Verify Bucket**:
   - Go to "Buckets"
   - Should see `linkhub-uploads` bucket
   - Access Policy should be "download" (public read)

### Test File Upload

```bash
# After backend is running, test with curl:
curl -X POST http://localhost:5000/api/upload/profile-image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "profileImage=@/path/to/image.jpg"

# Response will include the file URL
```

### File URLs

Files will be accessible at:
```
http://localhost:9000/linkhub-uploads/profiles/filename.jpg
```

---

## 💳 Stripe Setup

### 1. Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy **Secret key** (starts with `sk_test_`)
3. Copy **Publishable key** (starts with `pk_test_`)
4. Add to `.env`

### 2. Create Products & Prices

**Option A: Using Stripe CLI (Recommended)**

```bash
# Install Stripe CLI
# macOS: brew install stripe/stripe-cli/stripe
# Windows/Linux: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Create FREE plan (no charge)
stripe prices create \
  --product-data[name]="Free Plan" \
  --currency=INR \
  --unit-amount=0 \
  --recurring[interval]=year

# Create STARTER plan
stripe prices create \
  --product-data[name]="Starter Plan" \
  --currency=INR \
  --unit-amount=22000 \
  --recurring[interval]=year

# Create PRO plan
stripe prices create \
  --product-data[name]="Pro Plan" \
  --currency=INR \
  --unit-amount=44000 \
  --recurring[interval]=year
```

**Option B: Using Stripe Dashboard**

1. Go to [Products](https://dashboard.stripe.com/test/products)
2. Click "Add product"
3. Create each plan:
   - **Free**: ₹0/year
   - **Starter**: ₹220/year (enter 22000 paise)
   - **Pro**: ₹440/year (enter 44000 paise)
4. Copy Price IDs (starts with `price_`)

### 3. Add Price IDs to Database

Update the seed file or manually update plans:

```javascript
// In prisma/seed.js, add stripePriceId to each plan
{
  name: 'STARTER',
  stripePriceId: 'price_xxx...', // Your Stripe price ID
  // ... other fields
}
```

### 4. Setup Webhooks

```bash
# For local development, use Stripe CLI
stripe listen --forward-to localhost:5000/api/payments/webhook

# Copy the webhook signing secret (starts with whsec_)
# Add to .env as STRIPE_WEBHOOK_SECRET
```

For production, add webhook endpoint in Stripe Dashboard:
- URL: `https://your-domain.com/api/payments/webhook`
- Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`

---

## 🔑 Google OAuth Setup

### 1. Create OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Create OAuth client:
   - **Application type**: Web application
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: 
     - `http://localhost:5000/api/auth/google/callback`
     - `http://localhost:3000/auth/callback` (frontend)

7. Copy **Client ID** and **Client Secret**
8. Add to `.env`

### 2. Test Google Login

**Frontend Integration:**

```javascript
// In your React app
const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:5000/api/auth/google';
};

// Handle callback
// The backend will redirect to: /auth/callback?token=xxx&refresh=xxx
```

---

## 📦 Docker Services

### View Running Containers

```bash
docker-compose ps
```

### Container Details

| Service | Port | Access URL | Credentials |
|---------|------|------------|-------------|
| PostgreSQL | 5432 | localhost:5432 | `linkhub` / `linkhub_password` |
| MinIO API | 9000 | localhost:9000 | `minioadmin` / `minioadmin` |
| MinIO Console | 9001 | localhost:9001 | `minioadmin` / `minioadmin` |

### Useful Commands

```bash
# View logs
docker-compose logs -f
 
# Stop all services
docker-compose down

# Remove all data (careful!)
docker-compose down -v

# Restart a service
docker-compose restart postgres

# Access PostgreSQL
docker-compose exec postgres psql -U linkhub linkhub
```

---

## 🧪 Testing the API

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

### 2. Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "name": "Test User"
  }'
```

Save the `accessToken` from response!

### 3. Upload Profile Image

```bash
curl -X POST http://localhost:5000/api/upload/profile-image \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "profileImage=@./test-image.jpg"
```

### 4. Create Checkout Session

```bash
curl -X POST http://localhost:5000/api/payments/create-checkout-session \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "planId": "PLAN_ID_FROM_DATABASE"
  }'
```

### 5. Test Google OAuth

Visit in browser:
```
http://localhost:5000/api/auth/google
```

---

## 📁 File Storage Locations

### MinIO (S3)

Files stored in MinIO at:
- **Profiles**: `linkhub-uploads/profiles/`
- **Logos**: `linkhub-uploads/logos/`
- **Backgrounds**: `linkhub-uploads/backgrounds/images/` & `/videos/`
- **Thumbnails**: `linkhub-uploads/thumbnails/`

### Local Storage (Fallback)

If `UPLOAD_STORAGE=local`, files stored at:
```
./uploads/
├── profiles/
├── logos/
├── backgrounds/
│   ├── images/
│   └── videos/
└── thumbnails/
```

Access via: `http://localhost:5000/uploads/profiles/filename.jpg`

---

## 🔄 Database Management

### Prisma Studio (Visual Database Editor)

```bash
npm run prisma:studio
```

Opens at: http://localhost:5555

### View Data

```bash
# Using Docker
docker-compose exec postgres psql -U linkhub linkhub

# SQL Commands
\dt                    # List tables
SELECT * FROM "User";  # View users
SELECT * FROM "Plan";  # View plans
```

### Reset Database

```bash
# WARNING: Deletes all data!
npm run prisma:push --force-reset
node prisma/seed.js
```

---

## 🚀 Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@your-db-host:5432/linkhub
FRONTEND_URL=https://your-frontend-domain.com

# Use real AWS S3 or MinIO server
UPLOAD_STORAGE=s3
AWS_REGION=ap-south-1  # Mumbai region
AWS_S3_ENDPOINT=        # Empty for AWS S3
AWS_ACCESS_KEY_ID=your-real-key
AWS_SECRET_ACCESS_KEY=your-real-secret

# Production Stripe keys
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Production Google OAuth
GOOGLE_CALLBACK_URL=https://api.your-domain.com/api/auth/google/callback
```

### Build Docker Image

```bash
docker build -t linkhub-backend:latest .
docker run -p 5000:5000 --env-file .env linkhub-backend:latest
```

---

## 🐛 Troubleshooting

### MinIO Connection Issues

```bash
# Check MinIO is running
curl http://localhost:9000/minio/health/live

# Recreate bucket
docker-compose up minio-setup
```

### Stripe Webhook Not Working

```bash
# Make sure Stripe CLI is forwarding
stripe listen --forward-to localhost:5000/api/payments/webhook

# Check webhook secret matches .env
```

### Google OAuth Redirect Mismatch

- Verify redirect URI in Google Console matches exactly
- Check GOOGLE_CALLBACK_URL in .env
- Ensure frontend callback handler is set up

### Database Connection Error

```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Test connection
docker-compose exec postgres psql -U linkhub -c "SELECT 1"
```

---

## 📊 Monitoring

### Check All Services

```bash
# API health
curl http://localhost:5000/api/health

# PostgreSQL
docker-compose exec postgres pg_isready

# MinIO
curl http://localhost:9000/minio/health/live
```

### View Logs

```bash
# Backend logs
npm run dev

# Docker logs
docker-compose logs -f postgres
docker-compose logs -f minio
```

---

## 📚 Additional Resources

- [Stripe API Documentation](https://stripe.com/docs/api)
- [MinIO Documentation](https://min.io/docs/minio/linux/index.html)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)
- [Prisma Documentation](https://www.prisma.io/docs/)

---

**Need Help?** Check the logs, verify environment variables, and ensure all services are running!
