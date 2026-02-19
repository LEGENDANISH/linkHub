import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Crown,
  Settings,
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [portalLoading, setPortalLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

const fetchSubscriptionDetails = async () => {
  const token = localStorage.getItem('accessToken');
  console.log("Token:", token); // ← is it null?
  console.log("URL:", `${API_BASE_URL}/subscriptions/my-subscription`); // ← what URL?
  
  try {
    const response = await axios.get(`${API_BASE_URL}/subscriptions/my-subscription`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Response:", response.data); // ← what comes back?
    
    if (response.data.success) {
      setSubscription(response.data.data);
    }
  } catch (error) {
    console.error("Full error:", error.response?.data || error.message); // ← actual error
  } finally {
    setLoading(false);
  }
};
  const handleManageSubscription = async () => {
    setPortalLoading(true);

    try {
const token = localStorage.getItem('accessToken');
      
      const response = await axios.post(
        `${API_BASE_URL}/payments/create-portal-session`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success && response.data.data.url) {
        // Redirect to Stripe Customer Portal
        window.location.href = response.data.data.url;
      } else {
        toast.error('Failed to open customer portal');
      }
    } catch (error) {
      console.error('Portal error:', error);
      
      if (error.response?.status === 404) {
        toast.error('No active subscription found');
      } else {
        toast.error(
          error.response?.data?.message || 'Failed to open customer portal'
        );
      }
    } finally {
      setPortalLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      ACTIVE: {
        icon: <CheckCircle size={16} />,
        text: 'Active',
        className: 'bg-green-100 text-green-700 border-green-300'
      },
      PAST_DUE: {
        icon: <AlertCircle size={16} />,
        text: 'Past Due',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-300'
      },
      CANCELED: {
        icon: <XCircle size={16} />,
        text: 'Cancelled',
        className: 'bg-red-100 text-red-700 border-red-300'
      },
      EXPIRED: {
        icon: <XCircle size={16} />,
        text: 'Expired',
        className: 'bg-gray-100 text-gray-700 border-gray-300'
      }
    };

    const config = statusConfig[status] || statusConfig.EXPIRED;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${config.className}`}>
        {config.icon}
        <span className="ml-1">{config.text}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-purple-600" size={48} />
          <p className="text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Subscription Management
          </h1>
          <p className="text-gray-600">
            Manage your plan, billing, and payment methods
          </p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Crown className="text-purple-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {subscription?.plan?.name || 'Free'} Plan
                </h2>
                <p className="text-gray-600">
                  {subscription?.plan?.description || 'Your current subscription plan'}
                </p>
              </div>
            </div>
            {getStatusBadge(subscription?.status || 'ACTIVE')}
          </div>

          {/* Plan Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Billing Period */}
            {subscription?.currentPeriodStart && (
              <div className="flex items-start">
                <Calendar className="text-gray-400 mr-3 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500 font-medium">Current Period</p>
                  <p className="text-gray-900 font-semibold">
                    {formatDate(subscription.currentPeriodStart)}
                  </p>
                  <p className="text-gray-900 font-semibold">
                    to {formatDate(subscription.currentPeriodEnd)}
                  </p>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="flex items-start">
              <CreditCard className="text-gray-400 mr-3 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-500 font-medium">Payment Method</p>
                <p className="text-gray-900 font-semibold">
                  {subscription?.stripeCustomerId ? 'Card on file' : 'No payment method'}
                </p>
                {subscription?.cancelAtPeriodEnd && (
                  <p className="text-red-600 text-sm mt-1">
                    Cancels at period end
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            {subscription?.stripeCustomerId && (
              <button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {portalLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Opening Portal...
                  </>
                ) : (
                  <>
                    <Settings className="mr-2" size={20} />
                    Manage Billing
                    <ExternalLink className="ml-2" size={16} />
                  </>
                )}
              </button>
            )}
            
            <button
              onClick={() => navigate('/pricing')}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:border-gray-400 transition-all"
            >
              View All Plans
            </button>
          </div>
        </div>

        {/* Features Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Your Current Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscription?.plan?.features?.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{feature}</span>
              </div>
            )) || (
              <>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Unlimited links</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Essential analytics</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Billing Portal Info */}
        {subscription?.stripeCustomerId && (
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <Settings className="text-blue-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Stripe Customer Portal
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  Use the Stripe Customer Portal to:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Update your payment method</li>
                  <li>• View billing history and invoices</li>
                  <li>• Cancel or resume your subscription</li>
                  <li>• Update billing information</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* No Subscription Message */}
        {!subscription?.stripeCustomerId && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-purple-100 rounded-full p-2 mr-3">
                <Crown className="text-purple-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Upgrade to Premium
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Unlock advanced features and take your LinkHub to the next level!
                </p>
                <button
                  onClick={() => navigate('/pricing')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all text-sm"
                >
                  View Premium Plans
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement;