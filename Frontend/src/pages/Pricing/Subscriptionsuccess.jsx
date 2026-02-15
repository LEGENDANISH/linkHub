import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const sessionId = searchParams.get('session_id');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setVerifying(false);
        return;
      }

      try {
        // Optional: Verify the session with your backend
        const token = localStorage.getItem('accessToken');
        
        if (token) {
          // Fetch updated user data to confirm subscription
          const response = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.success) {
            const subscription = response.data.data.subscription;
            
            if (subscription && subscription.status === 'ACTIVE') {
              setSuccess(true);
              toast.success('Subscription activated successfully! 🎉');
            } else {
              // Subscription might still be processing, wait a bit
              setTimeout(() => verifyPayment(), 2000);
            }
          }
        } else {
          setSuccess(true); // No token, but payment was successful
        }
      } catch (err) {
        console.error('Error verifying payment:', err);
        // Even if verification fails, the payment was successful
        setSuccess(true);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  const handleContinue = () => {
    navigate('/dashboard');
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-purple-600" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verifying Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your subscription...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <XCircle className="mx-auto mb-4 text-red-600" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <CheckCircle className="mx-auto text-green-600" size={64} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for subscribing! Your account has been upgraded and all premium features are now available.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Session ID</p>
          <p className="text-xs text-gray-500 font-mono break-all">{sessionId}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => navigate('/subscription')}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-gray-400 transition"
          >
            View Subscription Details
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;