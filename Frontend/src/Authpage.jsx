import React, { useState, useEffect } from 'react';

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
      setSuccess('Login successful! Redirecting...');
      
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => {
        window.location.href = '/dashboard';
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
        
        setSuccess('Login successful! Redirecting...');
        
        setTimeout(() => {
          window.location.href = '/dashboard';
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
        
        setSuccess('Account created successfully! Redirecting...');
        
        setTimeout(() => {
          window.location.href = '/dashboard';
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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-5 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl animate-drift" />
          <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-3xl animate-drift-delayed" />
          <div className="absolute top-[60%] left-[40%] w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-3xl animate-drift-slow" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl mb-4 shadow-lg shadow-emerald-500/30">
            <span className="text-2xl font-bold text-zinc-950">L</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-zinc-500">Connect with your audience</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl shadow-black/50 animate-fade-in-delayed">
          {/* Tabs */}
          <div className="flex gap-3 mb-8 bg-white/5 p-1.5 rounded-2xl">
            <button
              onClick={() => {
                setActiveTab('login');
                hideMessages();
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                hideMessages();
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-shake">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-5 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm animate-slide-down">
              {success}
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="animate-fade-in-form">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                </div>

                <div className="text-right">
                  <a href="#forgot" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-emerald-400 text-zinc-950 font-semibold rounded-xl hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {loading ? (
                      <span className="inline-block w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                    ) : (
                      'Log In'
                    )}
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>

              <div className="flex items-center my-7">
                <div className="flex-1 h-px bg-white/10" />
                <span className="px-4 text-sm text-zinc-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <button
                onClick={handleGoogleAuth}
                className="w-full py-3.5 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19.8055 10.2292C19.8055 9.55214 19.7501 8.86609 19.6302 8.19922H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0879V17.5866H16.825C18.7173 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
                  <path d="M10.2002 20.0006C12.9508 20.0006 15.2731 19.1151 16.8295 17.5865L13.607 15.0879C12.7065 15.6979 11.5517 16.0433 10.2047 16.0433C7.54737 16.0433 5.28609 14.2834 4.48449 11.9168H1.16602V14.4927C2.76006 17.8695 6.3129 20.0006 10.2002 20.0006Z" fill="#34A853"/>
                  <path d="M4.47992 11.9168C4.05874 10.6749 4.05874 9.33009 4.47992 8.08817V5.51221H1.16586C-0.179813 8.33752 -0.179813 11.6676 1.16586 14.4929L4.47992 11.9168Z" fill="#FBBC04"/>
                  <path d="M10.2002 3.95805C11.6246 3.93599 13.0003 4.47374 14.0408 5.45639L16.8933 2.60385C15.1858 0.990301 12.9326 0.0954727 10.2002 0.11753C6.3129 0.11753 2.76006 2.24863 1.16602 5.51217L4.48008 8.08813C5.27712 5.71695 7.54296 3.95805 10.2002 3.95805Z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <div className="animate-fade-in-form">
              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label htmlFor="signup-name" className="block text-sm font-medium text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="signup-name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="signup-username" className="block text-sm font-medium text-white mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="signup-username"
                    value={signupData.username}
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                    placeholder="Choose a username"
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    placeholder="At least 6 characters"
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-emerald-400 text-zinc-950 font-semibold rounded-xl hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group mt-6"
                >
                  <span className="relative z-10">
                    {loading ? (
                      <span className="inline-block w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                    ) : (
                      'Create Account'
                    )}
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>

              <div className="flex items-center my-7">
                <div className="flex-1 h-px bg-white/10" />
                <span className="px-4 text-sm text-zinc-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <button
                onClick={handleGoogleAuth}
                className="w-full py-3.5 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19.8055 10.2292C19.8055 9.55214 19.7501 8.86609 19.6302 8.19922H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0879V17.5866H16.825C18.7173 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
                  <path d="M10.2002 20.0006C12.9508 20.0006 15.2731 19.1151 16.8295 17.5865L13.607 15.0879C12.7065 15.6979 11.5517 16.0433 10.2047 16.0433C7.54737 16.0433 5.28609 14.2834 4.48449 11.9168H1.16602V14.4927C2.76006 17.8695 6.3129 20.0006 10.2002 20.0006Z" fill="#34A853"/>
                  <path d="M4.47992 11.9168C4.05874 10.6749 4.05874 9.33009 4.47992 8.08817V5.51221H1.16586C-0.179813 8.33752 -0.179813 11.6676 1.16586 14.4929L4.47992 11.9168Z" fill="#FBBC04"/>
                  <path d="M10.2002 3.95805C11.6246 3.93599 13.0003 4.47374 14.0408 5.45639L16.8933 2.60385C15.1858 0.990301 12.9326 0.0954727 10.2002 0.11753C6.3129 0.11753 2.76006 2.24863 1.16602 5.51217L4.48008 8.08813C5.27712 5.71695 7.54296 3.95805 10.2002 3.95805Z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, 50px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        @keyframes drift-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, -40px) scale(1.05); }
          66% { transform: translate(40px, -30px) scale(0.95); }
        }

        @keyframes drift-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.08); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delayed {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-form {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-drift {
          animation: drift 30s ease-in-out infinite;
        }

        .animate-drift-delayed {
          animation: drift-delayed 25s ease-in-out infinite;
        }

        .animate-drift-slow {
          animation: drift-slow 35s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }

        .animate-fade-in-form {
          animation: fade-in-form 0.4s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease;
        }
      `}</style>
    </div>
  );
}