import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Step 1: Show logo
    const timer1 = setTimeout(() => {
      setShowLogo(true);
      setCurrentStep(1);
    }, 500);

    // Step 2: Show slogan
    const timer2 = setTimeout(() => {
      setShowSlogan(true);
      setCurrentStep(2);
    }, 1500);

    // Step 3: Show form
    const timer3 = setTimeout(() => {
      setShowForm(true);
      setCurrentStep(3);
    }, 3000);

    // Step 4: Complete animation
    const timer4 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-indigo-300 rounded-full animate-bounce opacity-40"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className={`transition-all duration-1000 ease-out transform ${
          showLogo 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-8'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Taste Mirror
          </h1>
        </div>

        {/* Slogan Animation */}
        <div className={`transition-all duration-1000 ease-out delay-500 transform ${
          showSlogan 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-xl md:text-2xl text-white/80 font-light mb-8">
            {t('form.subtitle')}
          </p>
        </div>

        {/* Loading dots */}
        <div className={`flex justify-center space-x-2 transition-opacity duration-500 ${
          showSlogan ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-white/10 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 