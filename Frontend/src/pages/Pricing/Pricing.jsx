import React, { useState, useEffect } from 'react';
import {
  Link,
  Smartphone,
  BarChart2,
  Search,
  QrCode,
  ShoppingBag,
  Gem,
  Palette,
  Users,
  ArrowUpRight,
  Calendar,
  Bot,
  Star,
  BarChart3,
  Eye,
  Loader2,
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [plans, setPlans] = useState([]); // 👈 Changed from Plans to plans
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/subscriptions/plans`);
        if (response.data.success) {
          setPlans(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast.error('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelection = async (plan) => { // 👈 Accept entire plan object
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      toast.error('Please login to subscribe');
      navigate('/login');
      return;
    }

    // Free plan - just navigate to dashboard
    if (plan.name === 'FREE') { // 👈 Check by plan name from database
      toast.success('Welcome to the Free plan!');
      navigate('/dashboard');
      return;
    }

    setLoadingPlan(plan.id);

    try {
      const billingInterval = isAnnual ? 'annual' : 'monthly';
      
      const response = await axios.post(
        `${API_BASE_URL}/payments/create-checkout-session`,
        {
          planId: plan.id, // 👈 Use plan.id from parameter
          billingInterval: billingInterval
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success && response.data.data.url) {
        window.location.href = response.data.data.url;
      } else {
        toast.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      
      if (error.response?.status === 401) {
        toast.error('Please login to continue');
        navigate('/login');
      } else if (error.response?.status === 404) {
        toast.error('Plan not found. Please try again.');
      } else {
        toast.error(
          error.response?.data?.message || 'Failed to initiate payment. Please try again.'
        );
      }
    } finally {
      setLoadingPlan(null);
    }
  };

  // Helper function to get icon based on feature
  const getFeatureIcon = (featureName) => {
    const iconMap = {
      'linkInBio': <Link size={24} />,
      'customThemes': <Palette size={24} />,
      'ownYourAudience': <Users size={24} />,
      'comprehensiveAnalytics': <BarChart3 size={24} />,
      'highlightKeyLinks': <Eye size={24} />,
      'personalizedLinkhub': <Star size={24} />,
      'socialScheduling': <Calendar size={24} />,
      'instagramReplies': <Bot size={24} />,
    };
    return iconMap[featureName] || <Link size={24} />;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-[#f6f7f5] min-h-screen w-full py-20 px-4 flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div id="pricing" className="bg-[#f6f7f5] min-h-screen w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Pick your plan. Make it yours.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Simple pricing with powerful features, cancel anytime.
          </p>

          {/* Toggle Button */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm">
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
              Annually <span className="text-xs">(save up to 20%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => { // 👈 Now using fetched plans
            const isPro = plan.name === 'PRO';
            const isFree = plan.name === 'FREE';
            
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 ${
                  isPro 
                    ? 'bg-gradient-to-br from-purple-900 to-purple-800 text-white ring-4 ring-purple-400' 
                    : 'bg-white'
                } relative`}
              >
                {/* Recommended Badge */}
                {isPro && (
                  <div className="absolute top-6 right-6">
                    <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h2 className={`text-3xl font-bold mb-2 ${isPro ? 'text-white' : 'text-gray-900'}`}>
                    {plan.displayName}
                  </h2>
                  <p className={`text-sm ${isPro ? 'text-purple-200' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-5xl font-bold ${isPro ? 'text-white' : 'text-gray-900'}`}>
                      ₹{isAnnual ? plan.price : (plan.priceMonthly || plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className={`ml-2 ${isPro ? 'text-purple-200' : 'text-gray-600'}`}>
                        /mo
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-2 ${isPro ? 'text-purple-200' : 'text-gray-600'}`}>
                    {isFree 
                      ? 'Free, forever' 
                      : isAnnual 
                        ? `Billed annually, or ₹${plan.priceMonthly} monthly`
                        : 'Billed monthly'
                    }
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelection(plan)} // 👈 Pass entire plan object
                  disabled={loadingPlan === plan.id}
                  className={`w-full py-3.5 rounded-full font-semibold transition-all mb-8 
                    ${isPro 
                      ? 'bg-purple-300 text-purple-900 hover:bg-purple-400' 
                      : 'bg-white border-2 border-gray-300 text-gray-800 hover:border-gray-400'
                    } 
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Processing...
                    </>
                  ) : isFree ? (
                    'Get started'
                  ) : isPro ? (
                    'Try free for 7 days'
                  ) : (
                    'Get started'
                  )}
                </button>

                {/* Features */}
                <div>
                  <p className={`font-bold mb-4 ${isPro ? 'text-white' : 'text-gray-900'}`}>
                    Key features:
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="mr-3 flex-shrink-0"><Link size={24} /></span>
                      <div>
                        <p className={`font-medium ${isPro ? 'text-white' : 'text-gray-900'}`}>
                          {plan.maxLinks === -1 ? 'Unlimited links' : `${plan.maxLinks} links`}
                        </p>
                      </div>
                    </li>

                    {plan.customThemes && (
                      <li className="flex items-start">
                        <span className="mr-3 flex-shrink-0"><Palette size={24} /></span>
                        <div>
                          <p className={`font-medium ${isPro ? 'text-white' : 'text-gray-900'}`}>
                            Custom themes
                          </p>
                          <p className={`text-sm mt-1 ${isPro ? 'text-purple-200' : 'text-gray-600'}`}>
                            Custom color palettes and fresh themes
                          </p>
                        </div>
                      </li>
                    )}

                    {plan.comprehensiveAnalytics && (
                      <li className="flex items-start">
                        <span className="mr-3 flex-shrink-0"><BarChart3 size={24} /></span>
                        <div>
                          <p className={`font-medium ${isPro ? 'text-white' : 'text-gray-900'}`}>
                            Comprehensive analytics
                          </p>
                          <p className={`text-sm mt-1 ${isPro ? 'text-purple-200' : 'text-gray-600'}`}>
                            See top-performing links & optimize content
                          </p>
                        </div>
                      </li>
                    )}

                    {plan.removeBranding && (
                      <li className="flex items-start">
                        <span className="mr-3 flex-shrink-0"><Star size={24} /></span>
                        <div>
                          <p className={`font-medium ${isPro ? 'text-white' : 'text-gray-900'}`}>
                            Remove branding
                          </p>
                        </div>
                      </li>
                    )}

                    {plan.prioritySupport && (
                      <li className="flex items-start">
                        <span className="mr-3 flex-shrink-0"><Users size={24} /></span>
                        <div>
                          <p className={`font-medium ${isPro ? 'text-white' : 'text-gray-900'}`}>
                            Priority support
                          </p>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Section */}
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