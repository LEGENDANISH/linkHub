import React, { useState, useEffect } from 'react';
import { rehydrateLinksForUser } from './pages/mainsections/middle/links/Selectionmanager';     // 👈 update path
import { rehydrateDesignForUser } from './pages/mainsections/middle/Design/DesignSelectionManager'; // 👈 update path

// Configuration - UPDATE THIS WITH YOUR BACKEND URL
const API_BASE_URL = 'http://localhost:5000/api';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const refresh = urlParams.get('refresh');
    const errorParam = urlParams.get('error');

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (token && refresh) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refresh);
      const user = JSON.parse(localStorage.getItem('user'));

      localStorage.setItem(
        'onboarding_data',
        JSON.stringify({
          username: user?.username || '',
          authToken: token
        })
      );

      localStorage.setItem(
        'onboarding_step',
        user?.username ? '1' : '0'
      );

      localStorage.setItem('onboarding_step', '1');

      // ✅ Rehydrate stores for OAuth user
      if (user?.id) {
        rehydrateLinksForUser(user.id);
        rehydrateDesignForUser(user.id);
      }

      setSuccess('Login successful! Redirecting...');
      
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => {
        window.location.href = '/onboard';
      }, 1500);
    }

    // Check if already logged in
    if (localStorage.getItem('accessToken')) {
      // Optionally redirect to dashboard
      // window.location.href = '/dashboard';
    }
  }, []);

  const hideMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    hideMessages();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));

        // 👇 IMPORTANT
        localStorage.setItem(
          'onboarding_data',
          JSON.stringify({
            username: data.data.user.username,
            authToken: data.data.accessToken
          })
        );

        // skip username step → go to Q1
        localStorage.setItem('onboarding_step', '1');

        // ✅ Rehydrate stores — mounts saved data if userId matches, resets if different user
        rehydrateLinksForUser(data.data.user.id);
        rehydrateDesignForUser(data.data.user.id);

        setSuccess('Login successful! Redirecting...');

        setTimeout(() => {
          window.location.href = '/edit';
        }, 1500);

      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    hideMessages();

    // Validation
    if (signupData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));

        localStorage.setItem(
          'onboarding_data',
          JSON.stringify({
            username: data.data.user.username,
            authToken: data.data.accessToken
          })
        );

        // new signup → go directly to Q1
        localStorage.setItem('onboarding_step', '1');

        // ✅ Rehydrate stores — new user gets fresh defaults automatically
        rehydrateLinksForUser(data.data.user.id);
        rehydrateDesignForUser(data.data.user.id);

        setTimeout(() => {
          window.location.href = '/onboard';
        }, 1500);

      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
  <div className="min-h-screen bg-white flex">
    
    {/* LEFT SIDE — AUTH */}
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-black">
            Linktree<span className="text-emerald-500">*</span>
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-gray-500 mb-8">Log in to your Linktree</p>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-600 text-sm">
            {success}
          </div>
        )}

        {/* LOGIN FORM */}
        {activeTab === "login" && (
          <>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email or username"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
              >
                {loading ? "Logging in..." : "Continue"}
              </button>
            </form>

            <div className="text-center my-6 text-gray-400">OR</div>

            {/* Google */}
            <button
              onClick={handleGoogleAuth}
              className="w-full border border-gray-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50"
            >
              Continue with Google
            </button>

            {/* Apple */}
            <button className="w-full border border-gray-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 mt-3 hover:bg-gray-50">
              Continue with Apple
            </button>

            <div className="mt-6 text-sm text-center">
              <a href="#" className="text-purple-600">
                Forgot password?
              </a>
            </div>

            <div className="mt-4 text-center text-sm">
              Don’t have an account?{" "}
              <span
                onClick={() => setActiveTab("signup")}
                className="text-purple-600 cursor-pointer"
              >
                Sign up
              </span>
            </div>
          </>
        )}

        {/* SIGNUP FORM */}
        {activeTab === "signup" && (
          <>
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200"
              />

              <input
                type="text"
                placeholder="Username"
                value={signupData.username}
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200"
              />

              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200"
              />

              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
              >
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>

    {/* RIGHT SIDE — IMAGE PANEL */}
    <div className="hidden lg:flex flex-1 relative overflow-hidden bg-lime-400">
      
      {/* Background shapes */}
      <div className="absolute inset-0 bg-blue-600 w-[60%] right-0" />

      {/* Main image */}
      <img
        src="/signin-visual.png" 
        alt="signin visual"
        className="absolute bottom-0 right-10 h-[85%] object-contain"
      />

      {/* Floating UI cards */}
      <div className="absolute top-16 left-10 bg-white rounded-2xl shadow-lg p-3">
        <img src="/demo-video.png" className="w-48 rounded-xl" />
      </div>

      <div className="absolute bottom-20 right-10 bg-white rounded-2xl shadow-lg p-4">
        <img src="/demo-product.png" className="w-24" />
        <p className="text-center mt-2 font-semibold">$36</p>
      </div>
    </div>
  </div>
);
}