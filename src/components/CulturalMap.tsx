import React from 'react';
import { useTranslation } from 'react-i18next';

interface CulturalMapProps {
  insights: {
    [country: string]: {
      country: string;
      culturalInsight: string;
      recommendation: string;
    };
  };
}

const CulturalMap: React.FC<CulturalMapProps> = ({ insights }) => {
  const { t } = useTranslation();
  const countries = Object.keys(insights);

  if (!countries.length) return null;

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 mt-6 text-white w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">🌍 {t('ai_powered_cultural_map')}</h2>
      <div className="space-y-4">
        {countries.map((country) => {
          const info = insights[country];
          return (
            <div
              key={country}
              className="bg-white/10 p-4 rounded-lg border border-white/20"
            >
              <h3 className="text-lg font-semibold mb-1">🌐 {country}</h3>
              <p className="text-sm text-white/90 italic mb-1">
                {info.culturalInsight}
              </p>
              <p className="text-sm text-white/80">
                💡 {t('recommendation')}: <strong>{info.recommendation}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CulturalMap;
