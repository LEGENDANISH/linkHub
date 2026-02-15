# 🎨 Frontend Integration Guide - Pricing with Stripe

## How Pricing Works (Frontend ↔ Backend)

### Architecture Overview

```
Frontend (React)          Backend (Express)         Stripe
     |                          |                      |
     |  1. GET /subscriptions/plans                    |
     |  ←------ Returns plan details ------            |
     |                          |                      |
     |  2. User clicks "Get started"                   |
     |  ---→ POST /payments/create-checkout-session   |
     |                          |                      |
     |                          | Create checkout      |
     |                          | ----------------→    |
     |                          |                      |
     |  ←------ Returns Stripe Checkout URL --------   |
     |                          |                      |
     |  3. Redirect to Stripe   |                      |
     |  --------------------------------→ Stripe page   |
     |                          |                      |
     |  4. User completes payment                      |
     |  ←-------------------------------- Webhook ---→  |
     |                          |  (Auto-update DB)    |
     |                          |                      |
     |  5. Redirect to success page                    |
     |  ←------ Success/Cancel URL --------            |
```

---

## ❌ What NOT to Put in Frontend

```javascript
// ❌ NEVER DO THIS - Exposing Stripe secrets
const STRIPE_PRICE_IDS = {
  STARTER: 'price_1ABC123...',  // ❌ Security risk!
  PRO: 'price_1DEF456...'
};
```

---

## ✅ What the Frontend Should Do

### Step 1: Fetch Plans from Backend

Your `Pricing.jsx` component should fetch plans dynamically:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/subscriptions/plans');
        setPlans(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId) => {
    try {
      // Get access token from your auth context/state
      const token = localStorage.getItem('accessToken');

      // Create Stripe checkout session
      const response = await axios.post(
        'http://localhost:5000/api/payments/create-checkout-session',
        { planId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Redirect to Stripe checkout
      window.location.href = response.data.data.url;
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading plans...</div>;
  }

  return (
    <div className="bg-[#f6f7f5] min-h-screen w-full py-20 px-4">
      {/* ... your existing JSX ... */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-3xl p-8 bg-white">
            {/* Plan name */}
            <h2 className="text-3xl font-bold mb-2">{plan.displayName}</h2>
            <p className="text-sm text-gray-600">{plan.description}</p>

            {/* Pricing */}
            <div className="flex items-baseline">
              <span className="text-5xl font-bold">
                ₹{isAnnual ? plan.price : plan.priceMonthly}
              </span>
              <span className="ml-2 text-gray-600">INR/mo</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleSubscribe(plan.id)}
              className="w-full py-3.5 rounded-full font-semibold bg-purple-300 hover:bg-purple-400"
            >
              {plan.name === 'PRO' ? 'Try free for 7 days' : 'Get started'}
            </button>

            {/* Features - these can still be hardcoded in frontend */}
            <div>
              <p className="font-bold mb-4">Key features:</p>
              <ul>
                {/* Map your feature icons based on plan.name */}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
```

---

## 📝 Updated Pricing Component Structure

Here's how to modify your current `Pricing.jsx`:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// ... your existing imports

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [backendPlans, setBackendPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/subscriptions/plans`
        );
        setBackendPlans(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Your existing hardcoded UI data (icons, subtitles, etc.)
  const planUIData = {
    FREE: {
      features: [
        { icon: <Link size={24} />, text: 'Unlimited links' },
        { icon: <Smartphone size={24} />, text: 'Social icons, videos & embeds' },
        // ... rest of your UI features
      ]
    },
    STARTER: {
      features: [
        { icon: <Link size={24} />, text: 'Link in bio' },
        // ... rest of your UI features
      ]
    },
    PRO: {
      features: [
        { icon: <Star size={24} />, text: 'Personalized Linkhub' },
        // ... rest of your UI features
      ]
    }
  };

  const handleSubscribe = async (planId, planName) => {
    // If FREE plan, just redirect to signup
    if (planName === 'FREE') {
      window.location.href = '/signup';
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        // Not logged in, redirect to login
        window.location.href = '/login?redirect=pricing';
        return;
      }

      // Create checkout session
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/payments/create-checkout-session`,
        { planId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Redirect to Stripe
      window.location.href = response.data.data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };

  // Merge backend data with UI data
  const mergedPlans = backendPlans.map(plan => ({
    ...plan,
    ...planUIData[plan.name] // Add UI features, icons, etc.
  }));

  return (
    <div id="pricing" className="bg-[#f6f7f5] min-h-screen w-full py-20 px-4">
      {/* ... your existing header JSX ... */}

      {loading ? (
        <div className="text-center py-20">Loading plans...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mergedPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 ${
                plan.name === 'PRO' ? 'bg-gradient-to-br from-purple-900 to-purple-800 text-white' : 'bg-white'
              }`}
            >
              {/* ... your existing plan card JSX ... */}
              
              {/* Update button to call handleSubscribe */}
              <button
                onClick={() => handleSubscribe(plan.id, plan.name)}
                className={`w-full py-3.5 rounded-full font-semibold transition-all mb-8 ${
                  plan.name === 'PRO' 
                    ? 'bg-purple-300 text-purple-900 hover:bg-purple-400'
                    : 'bg-white border-2 border-gray-300 text-gray-800 hover:border-gray-400'
                }`}
              >
                {plan.name === 'PRO' ? 'Try free for 7 days' : 'Get started'}
              </button>

              {/* ... rest of your plan card JSX ... */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pricing;
```

---

## 🔄 Complete User Flow

### 1. User Views Pricing Page
```
Frontend fetches: GET /api/subscriptions/plans
Response: [
  { id: "...", name: "FREE", price: 0, ... },
  { id: "...", name: "STARTER", price: 220, ... },
  { id: "...", name: "PRO", price: 440, ... }
]
```

### 2. User Clicks "Get started" (STARTER)
```
Frontend calls: POST /api/payments/create-checkout-session
Body: { planId: "plan-id-here" }
Headers: { Authorization: "Bearer token" }

Backend:
  1. Finds plan in database
  2. Gets stripePriceId from plan
  3. Creates Stripe checkout session
  4. Returns checkout URL

Response: { 
  success: true, 
  data: { 
    sessionId: "cs_...", 
    url: "https://checkout.stripe.com/..." 
  } 
}
```

### 3. Frontend Redirects to Stripe
```javascript
window.location.href = response.data.data.url;
```

### 4. User Completes Payment on Stripe
- Stripe processes payment
- Sends webhook to: `/api/payments/webhook`
- Backend automatically updates subscription in database

### 5. Stripe Redirects Back
```
Success: https://yoursite.com/subscription/success?session_id=cs_...
Cancel: https://yoursite.com/subscription/cancel
```

---

## 🔐 Environment Variables for Frontend

Create `.env` in your React app:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 📋 Summary

### Backend Stores (Database):
- ✅ Plan details (name, price, features flags)
- ✅ Stripe Price IDs (`stripePriceId`)
- ✅ Stripe Product IDs (`stripeProductId`)

### Frontend Stores (Code):
- ✅ UI elements (icons, colors, layout)
- ✅ Feature descriptions and subtitles
- ✅ Visual styling

### Why This Approach?
1. **Security** - Stripe secrets never exposed
2. **Flexibility** - Change prices without redeploying frontend
3. **Single Source of Truth** - Database is authoritative
4. **Easy Updates** - Update Stripe IDs via admin panel

---

## 🛠️ Quick Setup Checklist

- [ ] Set up Stripe products and get Price IDs
- [ ] Update backend database with Stripe IDs (seed.js or admin endpoint)
- [ ] Update frontend to fetch plans from API
- [ ] Update button handlers to call checkout endpoint
- [ ] Test payment flow end-to-end
- [ ] Set up Stripe webhook forwarding (dev) or webhook endpoint (prod)

---

**Need the Stripe Price IDs?** Check your Stripe Dashboard → Products → Click a product → Copy the Price ID (starts with `price_`)
