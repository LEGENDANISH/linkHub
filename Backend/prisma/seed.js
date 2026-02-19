import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Found' : '❌ Not found');

const prisma = new PrismaClient()

/**
 * Database Seeding Script - LinkHub Subscription Plans
 * 
 * PRICING STRUCTURE:
 * - Annual billing: Total yearly price (shown as monthly equivalent on frontend)
 *   STARTER: ₹2,640/year (displayed as ₹220/mo)
 *   PRO: ₹5,280/year (displayed as ₹440/mo)
 * 
 * - Monthly billing: Actual monthly price
 *   STARTER: ₹360/month
 *   PRO: ₹650/month
 * 
 * STRIPE SETUP:
 * 1. Go to https://dashboard.stripe.com/test/products
 * 2. Create TWO prices for each paid plan:
 *    
 *    STARTER Product:
 *    - Price 1 (Annual): ₹2,640 recurring yearly (264000 paise)
 *    - Price 2 (Monthly): ₹360 recurring monthly (36000 paise)
 *    
 *    PRO Product:
 *    - Price 1 (Annual): ₹5,280 recurring yearly (528000 paise)
 *    - Price 2 (Monthly): ₹650 recurring monthly (65000 paise)
 * 
 * 3. Copy the Price IDs and paste below
 * 
 * Run: node prisma/seed.js
 */

async function seed() {
  console.log('🌱 Seeding LinkHub database with subscription plans...\n');

  try {
    const plans = [
      // ----------------------------------------
      // FREE PLAN
      // ----------------------------------------
      {
        name: 'FREE',
        displayName: 'Free',
        description: 'Get started with your own personal Linkhub',
        
        // Pricing
        price: 0,              // Annual: ₹0
        priceMonthly: 0,       // Monthly: ₹0
        currency: 'INR',
        interval: 'year',
        
        // Stripe
        stripePriceId: null,
        stripePriceIdMonthly: null,
        stripeProductId: null,
        
        // Features
        maxLinks: -1,
        linkInBio: true,
        customThemes: false,
        ownYourAudience: false,
        redirectLinks: false,
        socialScheduling: false,
        personalizedLinkhub: false,
        highlightKeyLinks: false,
        comprehensiveAnalytics: false,
        instagramReplies: false,
        removeBranding: false,
        videoBackground: false,
        prioritySupport: false,
        linkhubShops: true,
        digitalProducts: true,
        trialDays: 0,
        isActive: true
      },

      // ----------------------------------------
      // STARTER PLAN
      // ----------------------------------------
      {
        name: 'STARTER',
        displayName: 'Starter',
        description: 'For creators and brands, just getting started',
        
        // Pricing
        price: 2640,           // Annual: ₹2,640/year (₹220/mo shown on UI)
        priceMonthly: 360,     // Monthly: ₹360/month
        currency: 'INR',
        interval: 'year',
        
        // ⚠️ PASTE YOUR STRIPE PRICE IDs HERE
        stripePriceId: "price_1T14z7C4prk0dwLdU2WH2Sq7",         // 👈 Annual: price_xxx (₹2,640/year)
        stripePriceIdMonthly:"price_1T14z7C4prk0dwLdc2Rq7dd8",  // 👈 Monthly: price_xxx (₹360/month)
        stripeProductId: "prod_Tz353SSOyUS8E8",        // 👈 Product: prod_xxx
        
        // Features
        maxLinks: -1,
        linkInBio: true,
        customThemes: true,
        ownYourAudience: true,
        redirectLinks: true,
        socialScheduling: true,
        personalizedLinkhub: false,
        highlightKeyLinks: false,
        comprehensiveAnalytics: false,
        instagramReplies: false,
        removeBranding: false,
        videoBackground: false,
        prioritySupport: false,
        linkhubShops: true,
        digitalProducts: true,
        trialDays: 0,
        isActive: true
      },

      // ----------------------------------------
      // PRO PLAN (RECOMMENDED)
      // ----------------------------------------
      {
        name: 'PRO',
        displayName: 'Pro',
        description: 'For creators and solopreneurs looking to grow and monetize',
        
        // Pricing
        price: 5280,           // Annual: ₹5,280/year (₹440/mo shown on UI)
        priceMonthly: 650,     // Monthly: ₹650/month
        currency: 'INR',
        interval: 'year',
        
        // ⚠️ PASTE YOUR STRIPE PRICE IDs HERE
        stripePriceId: "price_1T150FC4prk0dwLdCwnanbX9",         // 👈 Annual: price_xxx (₹5,280/year)
        stripePriceIdMonthly: "price_1T150FC4prk0dwLdBnmuQVdo",  // 👈 Monthly: price_xxx (₹650/month)
        stripeProductId: "prod_Tz36g119sh64M1",        // 👈 Product: prod_xxx
        
        // Features (Everything)
        maxLinks: -1,
        linkInBio: true,
        customThemes: true,
        ownYourAudience: true,
        redirectLinks: true,
        socialScheduling: true,
        personalizedLinkhub: true,
        highlightKeyLinks: true,
        comprehensiveAnalytics: true,
        instagramReplies: true,
        removeBranding: true,
        videoBackground: true,
        prioritySupport: true,
        linkhubShops: true,
        digitalProducts: true,
        trialDays: 0,
        isActive: true
      }
    ];

    console.log('📦 Processing plans...\n');
    
    for (const planData of plans) {
      const existing = await prisma.plan.findUnique({
        where: { name: planData.name }
      });

      if (existing) {
        console.log(`📝 Updating: ${planData.name}`);
        await prisma.plan.update({
          where: { name: planData.name },
          data: planData
        });
      } else {
        console.log(`➕ Creating: ${planData.name}`);
        await prisma.plan.create({ data: planData });
      }
      console.log('   ✅ Done\n');
    }

    console.log('╔═══════════════════════════════════════════════╗');
    console.log('║        ✅ Database Seeded Successfully!        ║');
    console.log('╚═══════════════════════════════════════════════╝\n');
    
    console.log('📊 Plans:\n');
    console.log('🆓 FREE: ₹0');
    console.log('🚀 STARTER: ₹2,640/year OR ₹360/month');
    console.log('⭐ PRO: ₹5,280/year OR ₹650/month (7-day trial)\n');

  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});