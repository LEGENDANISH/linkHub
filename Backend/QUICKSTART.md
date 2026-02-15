# 🚀 Quick Start Guide - LinkHub Backend

## Step-by-Step Setup (5 minutes)

### 1. Prerequisites Check
```bash
# Check Node.js version (need v18+)
node --version

# Check PostgreSQL is running
psql --version
```

### 2. Clone and Install
```bash
# Install dependencies
npm install
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb linkhub

# Or using psql
psql -U postgres
CREATE DATABASE linkhub;
\q

# Update .env with your database URL
DATABASE_URL="postgresql://postgres:password@localhost:5432/linkhub"
```

### 4. Initialize Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed initial data (subscription plans)
node prisma/seed.js
```

### 5. Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and set:
# - DATABASE_URL (your PostgreSQL connection)
# - JWT_SECRET (generate random string)
# - FRONTEND_URL (your frontend URL)
```

Generate a secure JWT secret:
```bash
# Option 1: Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: OpenSSL
openssl rand -hex 64
```

### 6. Start Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
╔═══════════════════════════════════════╗
║      LinkHub API Server Started      ║
╠═══════════════════════════════════════╣
║  Environment: development            ║
║  Port: 5000                          ║
║  URL: http://localhost:5000          ║
╚═══════════════════════════════════════╝
```

### 7. Test the API
```bash
# Health check
curl http://localhost:5000/api/health

# Expected response:
# {
#   "success": true,
#   "message": "LinkHub API is running",
#   "timestamp": "2024-..."
# }
```

---

## 🎯 First API Calls

### 1. Register a User
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

Save the `accessToken` from the response!

### 2. Get Your Profile
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. Update Your Profile
```bash
curl -X PUT http://localhost:5000/api/profile/update \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Hello World! This is my bio.",
    "wallpaperStyle": "GRADIENT",
    "gradientFrom": "#667eea",
    "gradientTo": "#764ba2"
  }'
```

### 4. Create a Link
```bash
curl -X POST http://localhost:5000/api/links \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Website",
    "url": "https://example.com",
    "buttonColor": "#667eea"
  }'
```

### 5. View Your Public Profile
```bash
curl http://localhost:5000/api/profile/testuser
```

---

## 🔧 Common Issues & Solutions

### Issue: "Cannot find module '@prisma/client'"
**Solution:**
```bash
npm run prisma:generate
```

### Issue: "Error: P1001: Can't reach database server"
**Solution:**
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in .env is correct
- Check PostgreSQL is accepting connections

### Issue: "JWT must be provided"
**Solution:**
- Make sure you're including the Authorization header
- Format: `Authorization: Bearer YOUR_TOKEN`
- Get token from login/register response

### Issue: Port 5000 already in use
**Solution:**
```bash
# Change port in .env
PORT=3001

# Or kill existing process
lsof -ti:5000 | xargs kill
```

---

## 📊 View Database

### Option 1: Prisma Studio (Recommended)
```bash
npm run prisma:studio
```
Opens GUI at http://localhost:5555

### Option 2: psql
```bash
psql -U postgres linkhub

# List tables
\dt

# View users
SELECT * FROM "User";

# View plans
SELECT * FROM "Plan";
```

---

## 🧪 Testing with Postman/Insomnia

### Import Base Environment
1. Create new environment
2. Set variables:
   ```
   base_url: http://localhost:5000/api
   token: (leave empty, will be set after login)
   ```

### Quick Test Collection

**1. Register**
- Method: POST
- URL: `{{base_url}}/auth/register`
- Body: JSON
```json
{
  "email": "test@example.com",
  "username": "testuser",
  "password": "password123"
}
```
- Test Script: Save token to environment

**2. Get Profile**
- Method: GET
- URL: `{{base_url}}/auth/me`
- Headers: `Authorization: Bearer {{token}}`

---

## 🎓 Next Steps

Now that your backend is running:

1. **Connect Frontend**: Update frontend `.env` with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

2. **Explore Features**:
   - Create multiple links
   - Try different profile designs
   - Test subscription features
   - View analytics (Pro plan)

3. **Customize**:
   - Modify subscription plans in `prisma/seed.js`
   - Add custom validation rules
   - Implement additional features

4. **Deploy**:
   - See DEPLOYMENT.md (if needed)
   - Set up production database
   - Configure environment variables

---

## 📚 Documentation

- **Full API Docs**: See `README.md`
- **Route Reference**: See `API_ROUTES.md`
- **Prisma Schema**: See `prisma/schema.prisma`

---

## 🆘 Need Help?

- Check the logs in your terminal
- Use `npm run prisma:studio` to inspect database
- Review error messages carefully
- Verify all environment variables are set

---

**Happy Coding! 🎉**
