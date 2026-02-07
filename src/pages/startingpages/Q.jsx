// App.jsx or Main Component
import React, { useState } from "react";
import Q1 from "./Q1";
import Q2 from "./Q2";
import Q3 from "./Q3";

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userGoal, setUserGoal] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [platformLinks, setPlatformLinks] = useState({});

  const handleQ1Continue = (goal) => {
    setUserGoal(goal);
    setCurrentStep(2);
  };

  const handleQ2Continue = (platforms) => {
    setSelectedPlatforms(platforms);
    setCurrentStep(3);
  };

  const handleQ3Continue = (links) => {
    setPlatformLinks(links);
    console.log("Onboarding Complete!", {
      goal: userGoal,
      platforms: selectedPlatforms,
      links: links
    });
    // Navigate to dashboard or next step
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      {currentStep === 1 && (
        <Q1 
          onContinue={handleQ1Continue}
          onSkip={handleSkip}
        />
      )}
      {currentStep === 2 && (
        <Q2 
          onContinue={handleQ2Continue}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}
      {currentStep === 3 && (
        <Q3 
          selectedPlatforms={selectedPlatforms}
          onContinue={handleQ3Continue}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      )}
    </>
  );
};

export default OnboardingFlow;