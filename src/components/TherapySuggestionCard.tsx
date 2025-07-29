import React from "react";
import { useTranslation } from "react-i18next";

interface TherapySuggestion {
  summary?: string;
  recommendation?: string;
  resources?: string[];
  dailyTip?: string;
}

interface TherapySuggestionCardProps {
  suggestion: TherapySuggestion;
}

const TherapySuggestionCard: React.FC<TherapySuggestionCardProps> = ({ suggestion }) => {
  const { t } = useTranslation();
  
  return (
    <div className="relative group">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 via-emerald-400/30 to-green-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-teal-500/20 via-emerald-500/15 to-green-500/20 backdrop-blur-xl border border-teal-400/40 hover:border-teal-300/60 rounded-3xl shadow-2xl p-8 text-white space-y-6 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
        <h3 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-teal-200 to-emerald-200 bg-clip-text text-transparent flex items-center gap-3">
          <span className="text-2xl xl:text-3xl">🧘</span> {t('ai_therapy_suggestion')}
        </h3>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Summary */}
          {suggestion.summary && (
            <div className="bg-gradient-to-r from-teal-50/10 to-emerald-50/10 rounded-2xl p-6 border border-teal-200/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🧠</span>
                <h4 className="font-bold text-teal-200 text-lg">{t('summary')}</h4>
              </div>
              <p className="text-white/90 italic leading-relaxed">{suggestion.summary}</p>
            </div>
          )}
          
          {/* Recommendation */}
          {suggestion.recommendation && (
            <div className="bg-gradient-to-r from-emerald-50/10 to-green-50/10 rounded-2xl p-6 border border-emerald-200/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💡</span>
                <h4 className="font-bold text-emerald-200 text-lg">{t('recommendation')}</h4>
              </div>
              <p className="text-white/90 leading-relaxed">{suggestion.recommendation}</p>
            </div>
          )}
          
          {/* Daily Tip */}
          {suggestion.dailyTip && (
            <div className="bg-gradient-to-r from-green-50/10 to-teal-50/10 rounded-2xl p-6 border border-green-200/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌞</span>
                <h4 className="font-bold text-green-200 text-lg">{t('daily_tip')}</h4>
              </div>
              <p className="text-green-100 leading-relaxed font-medium">{suggestion.dailyTip}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapySuggestionCard;
