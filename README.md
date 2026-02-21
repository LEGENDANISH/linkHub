<div align="center">

# 🔗 LinkHub

### Your All-in-One Link-in-Bio Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![Zustand](https://img.shields.io/badge/Zustand-State%20Management-FF6B35?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma%20ORM-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)](https://stripe.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

**LinkHub** is a full-stack, production-grade link-in-bio platform built from scratch.  
Create a personalized page, manage all your links, customize every pixel of your profile, and track performance — with a freemium subscription system and Stripe billing under the hood.

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📸 Preview

### Dashboard Editor

<!-- Replace the block below with your actual screenshot -->
> _Add your dashboard screenshot here — Link manager + Design panel + Live mobile preview side by side_

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│       [ SCREENSHOT: Dashboard / Editor View ]           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Public Bio Page

<!-- Replace the block below with your actual screenshot -->
> _Add your public `/u/:slug` profile page screenshot here_

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│       [ SCREENSHOT: Public Profile Page — Mobile ]      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
linkhub/
├── frontend/          # React + Tailwind CSS + GSAP + Zustand
│   └── Dockerfile
├── backend/           # Node.js + Express + Prisma + PostgreSQL
│   └── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## ✨ Features

### 🎨 Editor & Design
- **Live Mobile Preview** — 280×560px phone preview that reacts to every design change in real time via Zustand subscriptions, zero page refreshes
- **7-section Design Panel** — Header, Theme, Wallpaper, Text, Buttons, Colors, Footer, each as its own swappable module
- **Wallpaper Engine** — Solid color, multi-direction linear gradient, radial gradient, image upload (blur + tint effects), animated video background (Pro), and CSS pattern overlays
- **Button Customizer** — Fill / outline / soft / shadow / hard styles, corner roundness presets, shadow depth, per-button color and text color
- **Profile Layouts** — Classic (circular avatar) or Hero (full-width banner image) with size presets (small / medium / large)
- **Title Types** — Plain text with custom font, size, weight, and color — or logo image + text combo

### 🔗 Link Management
- Categorized link picker: Suggested, Social, Commerce, Media, Contact, Events, Text
- Per-link toggle (active / inactive), animation style, layout variant (classic / thumbnail), and lock state
- Link click tracking persisted to the database (`LinkClick` model with geo + device metadata)
- Per-user Zustand store with `localStorage` persistence, rehydrated per user ID on every login

### 🔐 Authentication
- Email / password login and signup with client-side validation
- **Google OAuth** — redirect-based flow, URL-param token parsing, automatic Zustand store rehydration on callback
- JWT access + refresh token pair stored in `localStorage`
- Route-level `AuthWrapper` guard — redirects unauthenticated users to `/login` and prevents logged-in users from re-visiting `/login` or `/`

### 💳 Subscriptions & Billing
- Three-tier plans (Free / Pro / Premium) fetched dynamically from the API — no hardcoded plan data in the frontend
- Monthly / annual billing toggle with 20% savings on the pricing page
- **Stripe Checkout** — backend creates a hosted session, frontend redirects; success and cancellation pages with session ID confirmation
- Cancel at period end, resume, and upgrade flows all wired to dedicated backend endpoints
- **ProGate component** — two modes: _page mode_ (blurs entire route and shows upgrade modal for free users) and _element mode_ (intercepts individual button clicks via `React.cloneElement` and shows the modal without touching the wrapped component)

### ⚙️ Account Settings
- **Profile** — update display name, username, bio
- **Security** — change password with current password verification and minimum length enforcement
- **Subscription** — plan card with gradient header, feature grid (✓/✕ per feature), full payment history (INR locale formatting), cancel / resume
- **Danger Zone** — account deletion with confirmation guard

### 📊 Analytics
- Profile view tracking (`Analytics` model — views, unique views, country, city, device, browser)
- Per-link click events (`LinkClick` model — IP, user agent, referrer, country, device, OS)
- Gated behind `requireFeature('analytics')` middleware; available to Pro+ subscribers

---

## 🛠 Tech Stack

### Frontend

| Technology | Role |
|---|---|
| **React 18** | Component-based SPA |
| **Tailwind CSS 3** | Utility-first responsive styling |
| **GSAP** | Landing page scroll-triggered animations & hero entrance |
| **Zustand** (+ `persist`) | Per-user link & design state, `localStorage` sync |
| **React Router v6** | SPA navigation, protected routes |
| **Axios / Fetch API** | API calls with Bearer token headers |
| **Lucide React + react-icons** | Icons — Fi, Md, Fa, Hi, Bs sets |
| **Vite** | Dev server + optimized production builds |

### Backend

| Technology | Role |
|---|---|
| **Node.js 18 + Express** | REST API server |
| **Prisma ORM** | Schema definition, migrations, typed client |
| **PostgreSQL** | Primary relational database |
| **JWT** | Access + refresh token authentication |
| **Passport.js** | Google OAuth 2.0 strategy |
| **Stripe** | Subscription billing, checkout sessions |
| **express-validator** | Request body validation middleware |
| **Docker** | Containerized services (frontend, backend, postgres) |

---

## 🗄️ Database Schema

### Entity Relationship Diagram

<!-- Replace the block below with your actual ERD image -->
> _Add your ERD diagram here_

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│            [ DATABASE ERD IMAGE ]                       │
│                                                         │
│   User ──── Profile ──── Link ──── LinkClick            │
│     │           └──────── Analytics                     │
│     └── Subscription ──── Plan                          │
│               └────────── Payment                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Model Overview

**`User`** — Core account: email, username, hashed password, OAuth accounts, one-to-one with Profile and Subscription.

**`Profile`** — Stores the complete design state (wallpaper, gradients, button styles, fonts, title config, pattern, noise, image effects) plus the public `slug` that powers the `/u/:slug` URL.

**`Link`** — Belongs to a Profile. Holds `name`, `url`, `layout`, `animation`, `active`, `locked`, `thumbnail` (supports base64), and a `schedule` JSON field. Primary key is `BigInt` autoincrement.

**`Subscription`** — One-to-one with User. Tracks `status`, billing period dates, `cancelAtPeriodEnd`, and Stripe IDs (`stripeCustomerId`, `stripeSubscriptionId`, `stripePriceId`).

**`Plan`** — Defines all feature flags (`maxLinks`, `customThemes`, `comprehensiveAnalytics`, `videoBackground`, `digitalProducts`, `linkhubShops`, `instagramReplies`, etc.), price, currency, billing interval, and Stripe price IDs for both monthly and annual billing.

**`Payment`** — Ledger of charges, linked to a Subscription with Stripe payment and invoice IDs.

**`Analytics`** — Time-series view data per profile: views, unique views, clicks, country, city, device, browser, referrer.

**`LinkClick`** — Per-click event log: IP address, user agent, referrer, country, city, device, browser, OS.

<details>
<summary><strong>📄 View full Prisma schema</strong></summary>

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  username      String    @unique
  password      String
  name          String?
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts     Account[]
  sessions     Session[]
  profile      Profile?
  subscription Subscription?

  @@index([email])
  @@index([username])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Subscription {
  id                   String             @id @default(cuid())
  userId               String             @unique
  planId               String
  status               SubscriptionStatus @default(ACTIVE)
  currentPeriodStart   DateTime
  currentPeriodEnd     DateTime
  cancelAtPeriodEnd    Boolean            @default(false)
  canceledAt           DateTime?
  stripeCustomerId     String?            @unique
  stripeSubscriptionId String?            @unique
  stripePriceId        String?
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  plan     Plan      @relation(fields: [planId], references: [id])
  payments Payment[]

  @@index([userId])
  @@index([planId])
  @@index([status])
}

model Plan {
  id                     String   @id @default(cuid())
  name                   String   @unique
  displayName            String
  description            String?  @db.Text
  price                  Float
  priceMonthly           Float?
  currency               String   @default("INR")
  interval               String   @default("year")
  maxLinks               Int      @default(-1)
  linkInBio              Boolean  @default(true)
  customThemes           Boolean  @default(false)
  ownYourAudience        Boolean  @default(false)
  redirectLinks          Boolean  @default(false)
  socialScheduling       Boolean  @default(false)
  personalizedLinkhub    Boolean  @default(false)
  highlightKeyLinks      Boolean  @default(false)
  comprehensiveAnalytics Boolean  @default(false)
  instagramReplies       Boolean  @default(false)
  removeBranding         Boolean  @default(false)
  videoBackground        Boolean  @default(false)
  prioritySupport        Boolean  @default(false)
  linkhubShops           Boolean  @default(false)
  digitalProducts        Boolean  @default(false)
  stripePriceId          String?  @unique
  stripePriceIdMonthly   String?  @unique
  stripeProductId        String?  @unique
  trialDays              Int?     @default(0)
  isActive               Boolean  @default(true)
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt

  subscriptions Subscription[]

  @@index([name])
}

model Payment {
  id              String        @id @default(cuid())
  subscriptionId  String
  amount          Float
  currency        String        @default("USD")
  status          PaymentStatus @default(PENDING)
  stripePaymentId String?       @unique
  stripeInvoiceId String?
  paidAt          DateTime?
  createdAt       DateTime      @default(now())

  subscription Subscription @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)

  @@index([subscriptionId])
  @@index([status])
}

model Profile {
  id                String         @id @default(cuid())
  userId            String         @unique
  slug              String         @unique
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt
  profileImage      String?
  bio               String?        @db.Text
  titleType         TitleType      @default(TEXT)
  titleText         String?
  logoUrl           String?
  titleAlignment    String?        @default("center")
  titleFontSize     String?        @default("24px")
  titleFontWeight   String?        @default("bold")
  titleColor        String?        @default("#000000")
  profileLayout     ProfileLayout  @default(CLASSIC)
  profileSize       ProfileSize    @default(MEDIUM)
  profileShape      String?        @default("circle")
  wallpaperStyle    WallpaperStyle @default(SOLID)
  backgroundColor   String?        @default("#ffffff")
  gradientFrom      String?
  gradientTo        String?
  gradientAngle     Int?           @default(180)
  backgroundImage   String?
  backgroundVideo   String?
  backgroundPattern PatternType?
  blurEffect        Boolean        @default(false)
  blurIntensity     Int?           @default(10)
  noiseEffect       Boolean        @default(false)
  noiseOpacity      Float?         @default(0.05)
  imageEffects      String?
  footerText        String?
  footerVisible     Boolean        @default(true)
  metaTitle         String?
  metaDescription   String?
  viewCount         Int            @default(0)
  buttonStyle       String?        @default("fill")
  cornerRoundness   String?        @default("round")
  buttonColor       String?        @default("#E058D6")
  buttonTextColor   String?        @default("#000000")
  buttonShadow      String?        @default("none")
  pageTextFont      String?        @default("Inter")
  pageTextColor     String?        @default("#ffffff")
  gradientColor     String?
  gradientDirection String?        @default("linear-down")
  noise             Boolean?       @default(false)
  imageEffect       String?        @default("none")
  imageTint         Int?           @default(0)
  titleFont         String?        @default("Inter")
  titleStyle        String?        @default("text")
  titleSize         String?        @default("small")
  theme             String?        @default("custom")

  user      User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  links     Link[]
  analytics Analytics[]

  @@index([slug])
  @@index([userId])
}

model Link {
  id            BigInt   @id @default(autoincrement())
  profileId     String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  name          String
  url           String
  iconType      String?  @default("auto")
  thumbnail     String?  @db.Text
  layout        String   @default("classic")
  animation     String   @default("none")
  thumbnailCrop Json?
  active        Boolean  @default(true)
  clicks        Int      @default(0)
  locked        Boolean  @default(false)
  schedule      Json?
  redirect      String?

  profile     Profile     @relation(fields: [profileId], references: [id], onDelete: Cascade)
  clickEvents LinkClick[]

  @@index([profileId])
  @@index([active])
}

model LinkClick {
  id        BigInt   @id @default(autoincrement())
  linkId    BigInt
  ipAddress String?
  userAgent String?
  referer   String?
  country   String?
  city      String?
  device    String?
  browser   String?
  os        String?
  clickedAt DateTime @default(now())

  link Link @relation(fields: [linkId], references: [id], onDelete: Cascade)

  @@index([linkId])
  @@index([clickedAt])
}

model Analytics {
  id          String   @id @default(cuid())
  profileId   String
  date        DateTime @default(now())
  views       Int      @default(0)
  uniqueViews Int      @default(0)
  clicks      Int      @default(0)
  country     String?
  city        String?
  device      String?
  browser     String?
  referer     String?  @db.Text

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@index([profileId])
  @@index([date])
}

enum SubscriptionStatus { ACTIVE CANCELED EXPIRED PAST_DUE TRIALING }
enum PaymentStatus      { PENDING SUCCEEDED FAILED REFUNDED }
enum TitleType          { TEXT LOGO }
enum ProfileLayout      { CLASSIC HERO }
enum ProfileSize        { SMALL MEDIUM LARGE }
enum WallpaperStyle     { SOLID GRADIENT IMAGE VIDEO PATTERN }
enum PatternType        { DOTS GRID LINES WAVES DIAGONAL CIRCLES }
enum LinkType           { STANDARD HEADER SOCIAL EMBED EMAIL PHONE }
```

</details>

---

## 📋 Subscription Plans

| Feature | Free | Pro | Premium |
|---|---|---|---|
| Max Links | 5 | 50 | Unlimited |
| Custom Themes | ❌ | ✅ | ✅ |
| Comprehensive Analytics | ❌ | ✅ | ✅ |
| Remove Branding | ❌ | ✅ | ✅ |
| Video Background | ❌ | ✅ | ✅ |
| Social Scheduling | ❌ | ✅ | ✅ |
| Digital Products | ❌ | ✅ | ✅ |
| LinkHub Shops | ❌ | ❌ | ✅ |
| Instagram Replies | ❌ | ❌ | ✅ |
| Priority Support | ❌ | ❌ | ✅ |
| **Price** | Free | ₹X/mo | ₹X/mo |

---

## 🚦 Getting Started

Two ways to run LinkHub: **Docker (recommended)** spins up the entire stack with one command. **Manual setup** gives you full control for active development.

---

### 🐳 Docker Setup (Recommended)

The entire stack — frontend (Vite/Nginx), backend (Node.js), and database (PostgreSQL) — is fully containerized.

#### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- Stripe account + Google OAuth credentials

#### 1. Clone & configure

```bash
git clone https://github.com/yourusername/linkhub.git
cd linkhub
cp .env.example .env
```

Edit `.env` at the root (shared by all containers via `docker-compose.yml`):

```env
# ── Database ──────────────────────────────────────────────
POSTGRES_USER=linkhub
POSTGRES_PASSWORD=linkhub_secret
POSTGRES_DB=linkhub
DATABASE_URL="postgresql://linkhub:linkhub_secret@db:5432/linkhub"

# ── Backend ───────────────────────────────────────────────
PORT=5000
JWT_SECRET=your-jwt-secret-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
FRONTEND_URL=http://localhost:5173

# ── Google OAuth ──────────────────────────────────────────
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# ── Stripe ────────────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ── Frontend ──────────────────────────────────────────────
VITE_API_URL=http://localhost:5000/api
```

#### 2. Build & run

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| PostgreSQL | localhost:5432 |

#### 3. Initialize the database (first run only)

```bash
# Run migrations and seed subscription plans
docker compose exec backend npx prisma db push
docker compose exec backend node prisma/seed.js
```

#### Stop / restart

```bash
docker compose down          # Stop containers (data preserved)
docker compose down -v       # Stop and delete volumes (wipes DB)
docker compose up            # Restart without rebuilding
docker compose up --build    # Rebuild images and restart
```

---

#### `docker-compose.yml`

```yaml
version: "3.9"

services:

  db:
    image: postgres:16-alpine
    restart: unless-stopped
    env_file: .env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_URL: ${DATABASE_URL}
      PORT: ${PORT}
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      FRONTEND_URL: ${FRONTEND_URL}
      GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID}
      GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
      STRIPE_WEBHOOK_SECRET: ${STRIPE_WEBHOOK_SECRET}
    ports:
      - "5000:5000"
    depends_on:
      db:
        condition: service_healthy

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        VITE_API_URL: ${VITE_API_URL}
    restart: unless-stopped
    ports:
      - "5173:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

#### `backend/Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies first (layer cache)
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "src/index.js"]
```

---

#### `frontend/Dockerfile`

```dockerfile
# ── Stage 1: Build ─────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# VITE_ vars must be available at build time
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ── Stage 2: Serve with Nginx ───────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# React Router support — all routes fall back to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### `frontend/nginx.conf`

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # React Router — serve index.html for all non-asset routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
}
```

---

### 🖥 Manual Setup (without Docker)

#### Prerequisites
- Node.js 18+
- PostgreSQL running locally
- Stripe account + Google OAuth credentials

#### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Configure `backend/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/linkhub"
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
FRONTEND_URL=http://localhost:5173
PORT=5000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

```bash
npm run prisma:generate   # Generate Prisma client
npm run prisma:push       # Sync schema to database
node prisma/seed.js       # Seed subscription plans
npm run dev               # Start dev server → localhost:5000
```

#### Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Configure `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev   # Start dev server → localhost:5173
```

---

## 🗺 Routes

### Frontend

| Path | Page | Auth |
|---|---|---|
| `/` | Landing Page | Public |
| `/login` | Login / Signup | Public (redirect if logged in) |
| `/onboard` | Onboarding Flow | Required |
| `/edit` | Dashboard Editor | Required |
| `/pricing` | Pricing Page | Public |
| `/settings` | Account Settings | Required |
| `/subscription` | Subscription Management | Required |
| `/subscription/success` | Payment Success | Required |
| `/subscription/cancel` | Payment Cancelled | Required |
| `/u/:slug` | Public Profile Page | Public |
| `/auth/callback` | OAuth Token Handler | Public |

### Backend API

```
# Auth
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/update
PUT    /api/auth/change-password
GET    /api/auth/google                  ← OAuth redirect
GET    /api/auth/google/callback         ← OAuth callback

# Profile
GET    /api/profile/:slug                ← Public, no auth
GET    /api/profile/me/profile
PUT    /api/profile/update
GET    /api/profile/me/analytics?days=30
GET    /api/profile/check-slug/:slug

# Links
GET    /api/links
POST   /api/links
PUT    /api/links/:id
DELETE /api/links/:id
PUT    /api/links/bulk/reorder
POST   /api/links/:id/click              ← Public click tracker
GET    /api/links/:id/analytics?days=30

# Subscriptions & Billing
GET    /api/subscriptions/plans
GET    /api/subscriptions/my-subscription
GET    /api/subscriptions/features
GET    /api/subscriptions/payment-history
PUT    /api/subscriptions/cancel
PUT    /api/subscriptions/resume
POST   /api/payments/create-checkout-session
```

---

## ⚙️ Architecture Notes

### Per-User Zustand Persistence

Both the links store and design store use user-scoped `localStorage` keys (`linkhub_links_<userId>`, `linkhub_design_<userId>`). On every login — including OAuth — `rehydrateLinksForUser(userId)` and `rehydrateDesignForUser(userId)` are called immediately after the token is saved. Switching accounts on the same browser always loads the correct user's data; new users always start from clean defaults.

### Live Preview Architecture

`MobilePreview` subscribes directly to both Zustand stores. Any design panel update triggers an immediate re-render — no API calls, no latency. The preview is composed of independently mounted, conditionally-rendered background layers (video, blur, pattern, noise, image effects) stacked via absolute positioning with a `z-10` content layer on top.

### ProGate — Feature Gating

```jsx
// Page mode — blurs entire route, shows upgrade modal on load
<ProGate pageMode>
  <AnalyticsDashboard />
</ProGate>

// Element mode — intercepts a single button click
<ProGate updateDesign={updateDesign} designKey="titleStyle">
  <OptionButton value="logo" label="Logo Title" />
</ProGate>
```

Element mode uses `React.cloneElement` to inject an `onClick` interceptor that shows the upgrade modal instead of the real handler, without any changes to the wrapped component.

### Backend Middleware Chain

```
Request
  → authenticate         (JWT verify, attach req.user)
  → requireFeature(...)  (check plan feature flags)
  → requireSubscription  (check plan tier)
  → checkLinkLimit       (validate count against plan.maxLinks)
  → validate             (express-validator errors)
  → Controller
```

---

## 📝 Backend Scripts

```bash
npm start                 # Production server
npm run dev               # Dev server with nodemon
npm run prisma:generate   # Regenerate Prisma client
npm run prisma:push       # Sync schema → database (no migration file)
npm run prisma:migrate    # Create a named migration
npm run prisma:studio     # Visual database browser UI
```

---

## 🔮 Roadmap

- [x] Docker containerization (frontend + backend + PostgreSQL)
- [ ] Analytics dashboard with charts (clicks over time, device breakdown, geo map)
- [ ] Drag-and-drop link reordering
- [ ] Custom domain support with DNS verification
- [ ] Email verification on signup + password reset via email
- [ ] Instagram auto-reply integration
- [ ] Digital product selling (PDFs, files direct from LinkHub)
- [ ] Stripe webhook handling for subscription lifecycle events
- [ ] Rate limiting per plan tier
- [ ] 2FA authentication
- [ ] Admin dashboard

---

## 👨‍💻 Author

Built and designed by **[Your Name]**

[![Portfolio](https://img.shields.io/badge/Portfolio-yoursite.com-8200DB?style=flat-square)](https://yoursite.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-yourhandle-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/yourhandle)
[![Twitter](https://img.shields.io/badge/X-@yourhandle-000000?style=flat-square&logo=x)](https://x.com/yourhandle)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Full-stack · React · Node.js · PostgreSQL · Stripe · Docker · Built from scratch</sub>
</div>
