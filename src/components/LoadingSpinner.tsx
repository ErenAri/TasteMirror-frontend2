import React from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
  message?: string;
  stage?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, stage }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-full mx-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Optimized Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-pink-500 opacity-30"></div>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-white">
              {message || t('loading.title')}
            </h3>
            {stage && (
              <p className="text-purple-200 text-sm font-medium">
                {stage}
              </p>
            )}
            <p className="text-purple-200 text-sm">
              {t('loading.subtitle')}
            </p>
          </div>
          
          {/* Progress dots */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
