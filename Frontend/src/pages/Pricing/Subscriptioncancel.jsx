import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';

const SubscriptionCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <XCircle className="text-red-600" size={64} />
          </div>
        </div>

        {/* Cancel Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Your subscription payment was not completed
          </p>
          <p className="text-gray-500 text-sm">
            No charges have been made to your account.
          </p>
        </div>

        {/* Why this happened */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <HelpCircle className="mr-2 text-orange-600" size={20} />
            Why did this happen?
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You clicked the back button during checkout</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Payment was declined by your bank</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You decided not to complete the purchase</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/pricing')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center group"
          >
            <RefreshCw className="mr-2 group-hover:rotate-180 transition-transform duration-500" size={20} />
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-full font-semibold hover:bg-gray-200 transition-all flex items-center justify-center group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to Dashboard
          </button>
        </div>

        {/* Support Information */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Need help? We're here for you!
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <button 
              onClick={() => navigate('/support')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Contact Support
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => navigate('/faq')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              View FAQ
            </button>
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <p className="text-xs text-gray-600 text-center">
            💡 <strong>Good to know:</strong> You can still use all features of the Free plan. 
            Upgrade anytime when you're ready!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCancel;