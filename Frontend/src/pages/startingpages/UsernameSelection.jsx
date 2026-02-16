import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Check, X, Loader2 } from 'lucide-react';

const UsernameSelection = ({ apiService, storageService }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }

    // Check if user has existing data
    const savedData = storageService.get('onboarding_data');
    if (savedData && savedData.username) {
      setUsername(savedData.username);
    }
  }, []);

  // Debounced username check
  useEffect(() => {
    if (!username || username.length < 3) {
      setIsAvailable(null);
      setSuggestions([]);
      setError('');
      return;
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      setError('Username can only contain letters, numbers, dashes, and underscores');
      setIsAvailable(false);
      return;
    }

    setError('');
    const timeoutId = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  const checkUsernameAvailability = async (slug) => {
    setIsChecking(true);
    try {
      const response = await apiService.checkUsername(slug);
      
     if (response) {
  const available =
    response?.data?.available ??
    response?.available ??
    false;

  setIsAvailable(available);

  const suggestions =
    response?.data?.suggestions ??
    response?.suggestions ??
    [];

  if (!available && suggestions.length > 0) {
    setSuggestions(suggestions.slice(0, 3));
  } else {
    setSuggestions([]);
  }
}

    } catch (err) {
      console.error('Error checking username:', err);
      setError('Unable to check username availability. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleContinue = async () => {
    if (!isAvailable || !username) {
      return;
    }

    setIsRegistering(true);

    try {
      // Generate temporary email and password for registration
      const tempEmail = `${username}@linkhub.temp`;
      const tempPassword = Math.random().toString(36).slice(-12);

      // Register user
      const registerResponse = await apiService.register({
        email: tempEmail,
        username: username,
        password: tempPassword,
        name: username,
      });

      if (registerResponse.success) {
        // Save auth token and username
        const onboardingData = {
          username: username,
          authToken: registerResponse.data.accessToken,
          userId: registerResponse.data.user.id,
          tempEmail: tempEmail,
          tempPassword: tempPassword,
        };

        storageService.save('onboarding_data', onboardingData);
        storageService.save('auth_token', registerResponse.data.accessToken);

        // Navigate to onboarding
        navigate('/onboard');
      } else {
        setError(registerResponse.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Unable to create account. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUsername(suggestion);
    inputRef.current?.focus();
  };

  const handleBackToAdmin = () => {
    // Clear any saved data
    storageService.clear();
    // Navigate back (you can customize this)
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Link<span className="text-emerald-500">Hub</span>
              </span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleBackToAdmin}
              className="text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors"
            >
              ← Back to admin
            </motion.button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-6 pb-16">
          <motion.div
            ref={containerRef}
            className="w-full max-w-xl"
          >
            {/* Title */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Choose a username
              </h1>
              <p className="text-lg text-gray-600">
                Choose a LinkHub URL for your new LinkHub. You can always change it later.
              </p>
            </div>

            {/* Input section */}
            <div className="space-y-6">
              {/* URL input */}
              <div className="relative">
                <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:border-gray-300 transition-all focus-within:border-purple-500 focus-within:shadow-md">
                  <span className="pl-6 pr-2 text-gray-500 font-medium">
                    linkhub.com/
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    placeholder="Username"
                    className="flex-1 py-5 pr-14 text-lg font-medium text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                    maxLength={30}
                  />
                  
                  {/* Status indicator */}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    {isChecking && (
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    )}
                    {!isChecking && isAvailable === true && username.length >= 3 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <Check className="w-5 h-5 text-emerald-500" />
                      </motion.div>
                    )}
                    {!isChecking && isAvailable === false && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-red-600 ml-1"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Availability status */}
                {!error && isAvailable !== null && username.length >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 text-sm ml-1 font-medium ${
                      isAvailable ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {isAvailable 
                      ? '✓ This username is available!' 
                      : '✗ This username is taken'}
                  </motion.p>
                )}
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Available:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold rounded-full text-sm transition-colors"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Continue button */}
              <motion.button
                onClick={handleContinue}
                disabled={!isAvailable || isChecking || isRegistering}
                className={`w-full py-5 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${
                  isAvailable && !isChecking && !isRegistering
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={isAvailable && !isChecking && !isRegistering ? { y: -2 } : {}}
                whileTap={isAvailable && !isChecking && !isRegistering ? { scale: 0.98 } : {}}
              >
                {isRegistering ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating your account...
                  </span>
                ) : (
                  'Continue'
                )}
              </motion.button>
            </div>

            {/* Helper text */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-gray-500 text-center"
            >
              Your username must be at least 3 characters and can only contain letters, numbers, dashes, and underscores.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Image space */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content placeholder */}
        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center text-white"
          >
            <div className="mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <div className="w-32 h-32 bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl">
                  <span className="text-6xl">🔗</span>
                </div>
              </motion.div>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              One link to rule them all
            </h2>
            <p className="text-xl text-white text-opacity-90">
              Share your content, grow your audience, and monetize your passion.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UsernameSelection;