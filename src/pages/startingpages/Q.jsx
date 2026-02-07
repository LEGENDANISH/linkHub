import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Q1 from "./Q1";
import Q2 from "./Q2";
import Q3 from "./Q3";
import Q4 from "./Q4";
import Final from "./Final";

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // onboarding data
  const [userGoal, setUserGoal] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [platformLinks, setPlatformLinks] = useState({});
  const [profileData, setProfileData] = useState(null);

  /* ---------------- CONTINUE HANDLERS ---------------- */

  const handleQ1Continue = (goal) => {
    setUserGoal(goal);
    nextStep();
  };

  const handleQ2Continue = (platforms) => {
    setSelectedPlatforms(platforms);
    nextStep();
  };

  const handleQ3Continue = (links) => {
    setPlatformLinks(links);
    nextStep();
  };

  const handleQ4Continue = (profile) => {
    setProfileData(profile);

    console.log("ONBOARDING COMPLETE 🚀", {
      goal: userGoal,
      platforms: selectedPlatforms,
      links: platformLinks,
      profile,
    });

    // Navigate to final page
    nextStep();
  };

  /* ---------------- NAVIGATION ---------------- */

  const nextStep = () => {
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const handleSkip = () => {
    if (currentStep < 5) nextStep();
  };

  /* ---------------- UI ---------------- */

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
            onBack={prevStep}
            onSkip={handleSkip}
            direction={direction}
          />
        )}

        {currentStep === 3 && (
          <Q3
            key="q3"
            selectedPlatforms={selectedPlatforms}
            onContinue={handleQ3Continue}
            onBack={prevStep}
            onSkip={handleSkip}
            direction={direction}
          />
        )}

        {currentStep === 4 && (
          <Q4
            key="q4"
            onContinue={handleQ4Continue}
            onBack={prevStep}
            onSkip={handleSkip}
            direction={direction}
          />
        )}

        {currentStep === 5 && (
          <Final
            key="final"
            userGoal={userGoal}
            profileData={profileData}
            platformLinks={platformLinks}
            selectedPlatforms={selectedPlatforms}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;