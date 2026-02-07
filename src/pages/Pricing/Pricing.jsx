import React, { useState } from 'react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Free',
      description: 'Get started with your own personal Linktree',
      price: { monthly: 0, annual: 0 },
      priceLabel: 'Free, forever',
      buttonText: 'Get started',
      buttonStyle: 'bg-white border-2 border-gray-300 text-gray-800 hover:border-gray-400',
      features: [
        { icon: '🔗', text: 'Unlimited links' },
        { icon: '📱', text: 'Social icons, videos & embeds' },
        { icon: '📊', text: 'Essential analytics' },
        { icon: '🔍', text: 'SEO optimized, high-converting design' },
        { icon: '📲', text: 'Unique QR code' },
      ],
      moneyFeatures: [
        { icon: '🛍️', text: 'Linktree Shops & sponsored links', subtitle: 'Build a shop and get paid for space on your Linktree by trusted brands.' },
        { icon: '💎', text: 'Digital products and courses', subtitle: 'Build courses and sell digital products like eBooks, music files and images.' },
      ]
    },
    {
      name: 'Starter',
      description: 'For creators and brands, just getting started',
      price: { monthly: 360, annual: 220 },
      priceLabel: isAnnual ? 'Billed annually, or ₹360 monthly' : 'Billed monthly',
      buttonText: 'Get started',
      buttonStyle: 'bg-white border-2 border-gray-300 text-gray-800 hover:border-gray-400',
      includedPlan: 'Everything in Free, plus:',
      features: [
        { icon: '🔗', text: 'Link in bio' },
        { icon: '🎨', text: 'Custom themes', subtitle: 'Custom color palettes and fresh themes to match your style' },
        { icon: '👥', text: 'Own your audience', subtitle: 'Collect and manage your subscribers' },
        { icon: '↗️', text: 'Redirect links', subtitle: 'Temporarily send visitors to one key link, perfect for promos or launches' },
      ],
      growthTools: [
        { icon: '📅', text: 'Social media scheduling', subtitle: 'Plan and auto-publish your posts across all major social networks', new: true },
      ]
    },
    {
      name: 'Pro',
      description: 'For creators and solopreneurs looking to grow and monetize',
      price: { monthly: 650, annual: 440 },
      priceLabel: isAnnual ? 'Billed annually, or ₹650 monthly' : 'Billed monthly',
      buttonText: 'Try free for 7 days',
      buttonStyle: 'bg-purple-300 text-purple-900 hover:bg-purple-400',
      recommended: true,
      cardStyle: 'bg-gradient-to-br from-purple-900 to-purple-800 text-white',
      includedPlan: 'Everything in Starter, plus:',
      features: [
        { icon: '🔗', text: 'Link in bio' },
        { icon: '✨', text: 'Personalized Linktree', subtitle: 'Add your own logo, full-screen visuals and personalized design styles' },
        { icon: '⭐', text: 'Highlight key links', subtitle: 'Prioritize what matters with eye-catching featured and animated links' },
        { icon: '📈', text: 'Comprehensive analytics', subtitle: 'See top-performing links & optimize content that drives growth' },
      ],
      growthTools: [
        { icon: '📅', text: 'Social media scheduling', subtitle: 'Plan and auto-publish your posts across all major social networks', new: true },
        { icon: '🤖', text: 'Automated Instagram replies' },
      ]
    },
  ];

  return (
    <div className='bg-[#f6f7f5] min-h-screen w-full py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-4'>
            Pick your plan. Make it yours.
          </h1>
          <p className='text-gray-600 text-lg mb-8'>
            Simple pricing with powerful features, cancel anytime.
          </p>
          
          {/* Toggle Button */}
          <div className='inline-flex items-center bg-white rounded-full p-1 shadow-sm'>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isAnnual ? 'bg-gray-900 text-white' : 'text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isAnnual ? 'bg-gray-900 text-white' : 'text-gray-700'
              }`}
            >
              Annually <span className='text-xs'>(save up to 20%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 ${
                plan.cardStyle || 'bg-white'
              } ${plan.recommended ? 'ring-4 ring-purple-400' : ''} relative`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className='absolute top-6 right-6'>
                  <span className='bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full'>
                    Recommended
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className='mb-6'>
                <h2 className={`text-3xl font-bold mb-2 ${plan.cardStyle ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h2>
                <p className={`text-sm ${plan.cardStyle ? 'text-purple-200' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Pricing */}
              <div className='mb-6'>
                <div className='flex items-baseline'>
                  <span className={`text-5xl font-bold ${plan.cardStyle ? 'text-white' : 'text-gray-900'}`}>
                    ₹{isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className={`ml-2 ${plan.cardStyle ? 'text-purple-200' : 'text-gray-600'}`}>
                      INR/mo
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-2 ${plan.cardStyle ? 'text-purple-200' : 'text-gray-600'}`}>
                  {plan.priceLabel}
                </p>
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3.5 rounded-full font-semibold transition-all mb-8 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>

              {/* Features */}
              <div>
                {plan.includedPlan && (
                  <p className={`font-bold mb-4 ${plan.cardStyle ? 'text-white' : 'text-gray-900'}`}>
                    {plan.includedPlan}
                  </p>
                )}
                {!plan.includedPlan && (
                  <p className={`font-bold mb-4 ${plan.cardStyle ? 'text-white' : 'text-gray-900'}`}>
                    Key features:
                  </p>
                )}

                <ul className='space-y-4'>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className='flex items-start'>
                      <span className='mr-3 text-xl flex-shrink-0'>{feature.icon}</span>
                      <div>
                        <p className={`font-medium ${plan.cardStyle ? 'text-white' : 'text-gray-900'}`}>
                          {feature.text}
                        </p>
                        {feature.subtitle && (
                          <p className={`text-sm mt-1 ${plan.cardStyle ? 'text-purple-200' : 'text-gray-600'}`}>
                            {feature.subtitle}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Growth Tools */}
                {plan.growthTools && (
                  <div className='mt-6'>
                    <p className={`font-bold mb-3 flex items-center ${plan.cardStyle ? 'text-white' : 'text-gray-900'}`}>
                      Growth tools
                      <span className='ml-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full'>NEW</span>
                    </p>
                    <ul className='space-y-4'>
                      {plan.growthTools.map((tool, idx) => (
                        <li key={idx} className='flex items-start'>
                          <span className='mr-3 text-xl flex-shrink-0'>{tool.icon}</span>
                          <div>
                            <p className={`font-medium ${plan.cardStyle ? 'text-white' : 'text-gray-900'}`}>
                              {tool.text}
                            </p>
                            {tool.subtitle && (
                              <p className={`text-sm mt-1 ${plan.cardStyle ? 'text-purple-200' : 'text-gray-600'}`}>
                                {tool.subtitle}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Money Features */}
                {plan.moneyFeatures && (
                  <div className='mt-6'>
                    <p className='font-bold mb-3 text-gray-900'>Make money*</p>
                    <ul className='space-y-4'>
                      {plan.moneyFeatures.map((feature, idx) => (
                        <li key={idx} className='flex items-start'>
                          <span className='mr-3 text-xl flex-shrink-0'>{feature.icon}</span>
                          <div>
                            <p className='font-medium text-gray-900'>{feature.text}</p>
                            {feature.subtitle && (
                              <p className='text-sm mt-1 text-gray-600'>{feature.subtitle}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
     <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] mt-12 text-sm text-gray-600">
  
  <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl text-left mb-4 sm:mb-6">
    Agency or Enterprise
  </h1>

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
    
    <span className="font-semibold text-base sm:text-lg md:max-w-[70%]">
      Big teams, big goals. Connect with us and we'll build a custom plan to get you there.
    </span>

    <div className="flex md:justify-end">
      <button className="bg-[#e9c0e9] hover:bg-[#e2b3e2] transition-colors px-20 py-7 rounded-full text-base sm:text-lg font-semibold text-black whitespace-nowrap">
        Get in touch
      </button>
    </div>

  </div>

</div>

      </div>
    </div>
  );
};

export default Pricing;