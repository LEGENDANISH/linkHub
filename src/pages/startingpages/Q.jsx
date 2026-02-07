// App.jsx or OnboardingFlow.jsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Q1 from "./Q1";
import Q2 from "./Q2";
import Q3 from "./Q3";

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userGoal, setUserGoal] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [platformLinks, setPlatformLinks] = useState({});
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const handleQ1Continue = (goal) => {
    setUserGoal(goal);
    setDirection(1);
    setCurrentStep(2);
  };

  const handleQ2Continue = (platforms) => {
    setSelectedPlatforms(platforms);
    setDirection(1);
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
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < 3) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        {currentStep === 1 && (
          <Q1 
            key="q1"
            onContinue={handleQ1Continue}
            onSkip={handleSkip}
            direction={direction}
          />
        )}
        {currentStep === 2 && (
          <Q2 
            key="q2"
            onContinue={handleQ2Continue}
            onBack={handleBack}
            onSkip={handleSkip}
            direction={direction}
          />
        )}
        {currentStep === 3 && (
          <Q3 
            key="q3"
            selectedPlatforms={selectedPlatforms}
            onContinue={handleQ3Continue}
            onBack={handleBack}
            onSkip={handleSkip}
            direction={direction}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;