import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import UsernameSelection from './UsernameSelection';
import Q1 from './Q1';
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';
import Final from './Final';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Service
const apiService = {
  // Check username availability
  checkUsername: async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/check-slug/${slug}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking username:', error);
      throw error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Update profile
  updateProfile: async (token, profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Create link
  createLink: async (token, linkData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(linkData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating link:', error);
      throw error;
    }
  },

  // Create multiple links
  createMultipleLinks: async (token, linksArray) => {
    try {
      const promises = linksArray.map(link => 
        apiService.createLink(token, link)
      );
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error('Error creating multiple links:', error);
      throw error;
    }
  },
};

// LocalStorage Service
const storageService = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  get: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

const OnboardingFlow = () => {
  const navigate = useNavigate();
const [currentStep, setCurrentStep] = useState(() => {
  const savedData = storageService.get('onboarding_data');
  return savedData?.username ? 1 : 0;
});
  const [direction, setDirection] = useState(1);
  
  // Onboarding data state
  const [onboardingData, setOnboardingData] = useState({
    username: '',
    userGoal: '',
    selectedPlatforms: [],
    platformLinks: {},
    profileData: {
      username: '',
      bio: '',
      image: null,
    },
    authToken: '',
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = storageService.get('onboarding_data');
    if (savedData) {
      setOnboardingData(savedData);
    }

    const savedStep = storageService.get('onboarding_step');
    if (savedStep !== null) {
      setCurrentStep(savedStep);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    storageService.save('onboarding_data', onboardingData);
    storageService.save('onboarding_step', currentStep);
  }, [onboardingData, currentStep]);

  const updateOnboardingData = (key, value) => {
    setOnboardingData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const goToStep = (step) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const handleQ1Continue = (goal) => {
    updateOnboardingData('userGoal', goal);
    goToStep(2);
  };

  const handleQ2Continue = (platforms) => {
    updateOnboardingData('selectedPlatforms', platforms);
    goToStep(3);
  };

  const handleQ3Continue = (links) => {
    updateOnboardingData('platformLinks', links);
    goToStep(4);
  };

  const handleQ4Continue = async (profileData) => {
    try {
      // Update profile data
      updateOnboardingData('profileData', profileData);

      // If we have an auth token, create links
      if (onboardingData.authToken) {
        // Prepare links data
        const linksToCreate = onboardingData.selectedPlatforms.map((platform, index) => ({
          name: platform.charAt(0).toUpperCase() + platform.slice(1),
          url: onboardingData.platformLinks[platform] || '',
          active: true,
          layout: 'classic',
          order: index,
        }));

        // Create all links
        await apiService.createMultipleLinks(onboardingData.authToken, linksToCreate);

        // Update profile with bio and image
        if (profileData.bio || profileData.image) {
          await apiService.updateProfile(onboardingData.authToken, {
            bio: profileData.bio,
            // Note: Image upload would need to be handled separately with FormData
          });
        }
      }

      goToStep(5);
    } catch (error) {
      console.error('Error saving data:', error);
      // Continue to final step even if there's an error
      goToStep(5);
    }
  };

  const handleSkip = () => {
    if (currentStep < 4) {
      goToStep(currentStep + 1);
    } else {
      goToStep(5);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

 const steps = [

  <Q1 key="q1" onContinue={handleQ1Continue} onSkip={handleSkip} direction={direction} />,
  <Q2 key="q2" onContinue={handleQ2Continue} onBack={handleBack} onSkip={handleSkip} direction={direction} />,
  <Q3 key="q3" selectedPlatforms={onboardingData.selectedPlatforms} onContinue={handleQ3Continue} onBack={handleBack} onSkip={handleSkip} direction={direction} />,
  <Q4 key="q4" onContinue={handleQ4Continue} onBack={handleBack} onSkip={handleSkip} direction={direction} />,
<Final
  key="final"
  userGoal={onboardingData.userGoal}
  profileData={onboardingData.profileData}
  platformLinks={onboardingData.platformLinks}
  selectedPlatforms={onboardingData.selectedPlatforms}
/>
];


  return (
    <AnimatePresence mode="wait" custom={direction}>
      {steps[currentStep]}
    </AnimatePresence>
  );
};

export default OnboardingFlow;  