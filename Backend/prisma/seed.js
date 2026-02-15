import prisma from '../src/config/database.js';

async function seed() {
  console.log('🌱 Seeding database with Indian pricing plans...');

  try {
    // Create Plans based on your pricing
    const plans = [
      {
        name: 'FREE',
        displayName: 'Free',
        description: 'Get started with your own personal Linkhub',
        price: 0,
        priceMonthly: 0,
        currency: 'INR',
        interval: 'year',
        maxLinks: -1, // Unlimited
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
        linkhubShops: true, // Make money features
        digitalProducts: true,
        trialDays: 0,
        isActive: true
      },
      {
        name: 'STARTER',
        displayName: 'Starter',
        description: 'For creators and brands, just getting started',
        price: 220, // Annual price
        priceMonthly: 360,
        currency: 'INR',
        interval: 'year',
        maxLinks: -1, // Unlimited
        linkInBio: true,
        customThemes: true,
        ownYourAudience: true, // Collect and manage subscribers
        redirectLinks: true,
        socialScheduling: true, // Social media scheduling
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
      {
        name: 'PRO',
        displayName: 'Pro',
        description: 'For creators and solopreneurs looking to grow and monetize',
        price: 440, // Annual price
        priceMonthly: 650,
        currency: 'INR',
        interval: 'year',
        maxLinks: -1, // Unlimited
        linkInBio: true,
        customThemes: true,
        ownYourAudience: true,
        redirectLinks: true,
        socialScheduling: true,
        personalizedLinkhub: true, // Add your own logo, full-screen visuals
        highlightKeyLinks: true, // Eye-catching featured and animated links
        comprehensiveAnalytics: true, // See top-performing links
        instagramReplies: true, // Automated Instagram replies
        removeBranding: true,
        videoBackground: true,
        prioritySupport: true,
        linkhubShops: true,
        digitalProducts: true,
        trialDays: 7, // 7-day free trial
        isActive: true
      }
    ];

    for (const planData of plans) {
      const existingPlan = await prisma.plan.findUnique({
        where: { name: planData.name }
      });

      if (existingPlan) {
        console.log(`✓ Plan ${planData.name} already exists, updating...`);
        await prisma.plan.update({
          where: { name: planData.name },
          data: planData
        });
      } else {
        console.log(`+ Creating plan ${planData.name}...`);
        await prisma.plan.create({
          data: planData
        });
      }
    }

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Plans created with Indian pricing:');
    console.log('   - FREE: ₹0/year (Unlimited links)');
    console.log('      ✓ Social icons, videos & embeds');
    console.log('      ✓ Essential analytics');
    console.log('      ✓ Linkhub Shops & digital products');
    console.log('');
    console.log('   - STARTER: ₹220/year or ₹360/month');
    console.log('      ✓ Everything in Free');
    console.log('      ✓ Custom themes');
    console.log('      ✓ Own your audience (collect subscribers)');
    console.log('      ✓ Redirect links');
    console.log('      ✓ Social media scheduling');
    console.log('');
    console.log('   - PRO: ₹440/year or ₹650/month (7-day free trial)');
    console.log('      ✓ Everything in Starter');
    console.log('      ✓ Personalized Linkhub (logo & visuals)');
    console.log('      ✓ Highlight key links (featured & animated)');
    console.log('      ✓ Comprehensive analytics');
    console.log('      ✓ Automated Instagram replies');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
