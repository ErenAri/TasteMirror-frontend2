import React from "react";
import { useTranslation } from 'react-i18next';

interface Props {
  culturalDNAScore: Record<string, string>;
}

const CulturalDNAScore: React.FC<Props> = ({ culturalDNAScore }) => {
  const { t } = useTranslation();

  if (!culturalDNAScore || Object.keys(culturalDNAScore).length === 0) return null;

  console.log('=== CULTURAL DNA DEBUG ===');
  console.log('Raw culturalDNAScore:', culturalDNAScore);
  
  const regions = Object.entries(culturalDNAScore).sort((a, b) => {
    const scoreA = parseInt(String(a[1]).replace('%', ''));
    const scoreB = parseInt(String(b[1]).replace('%', ''));
    return scoreB - scoreA;
  });
  
  console.log('Processed regions:', regions);

  // Function to translate region names
  const translateRegion = (region: string) => {
    const regionKey = region.toLowerCase().replace(/\s+/g, '_');
    return t(`regions.${regionKey}`, region); // Fallback to original if translation not found
  };

  return (
    <div className="relative group">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-indigo-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-purple-800/30 via-purple-700/20 to-indigo-800/30 backdrop-blur-xl border border-purple-500/40 hover:border-purple-400/60 p-8 xl:p-10 rounded-3xl shadow-2xl text-white max-w-6xl mx-auto hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
        <h3 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 flex items-center gap-3">
          <span className="text-2xl xl:text-3xl">🧬</span> {t('cultural_dna_match')}
        </h3>
        
        <div className="space-y-4 xl:space-y-6">
          {regions.map(([region, score], index) => {
            // Score'u number'a çevir
            const cleanScore = String(score).replace(/%/g, '').trim();
            const numericScore = parseInt(cleanScore);
            
            console.log(`Region: ${region}, Original score: ${score}, Numeric score: ${numericScore}`);
            
            // NaN kontrolü
            if (isNaN(numericScore)) {
              console.error(`Invalid score for ${region}: ${score}`);
              return null;
            }
            
            return (
            <div key={region} className="group/item">
              <div className="flex items-center gap-4 xl:gap-6 mb-2">
                <span className="w-32 xl:w-40 font-semibold text-sm xl:text-base text-purple-100 group-hover/item:text-purple-200 transition-colors duration-300">
                  {translateRegion(region)}
                </span>
                <div className="flex-1 relative">
                  {/* Background bar */}
                  <div className="w-full bg-purple-800/50 h-4 xl:h-5 rounded-full overflow-hidden border border-purple-600/50">
                    {/* Animated progress bar - always show 100% for visual effect */}
                    <div
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 h-4 xl:h-5 rounded-full transition-all duration-1000 ease-out transform origin-left"
                      style={{ 
                        width: `${Math.min(numericScore, 100)}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                  {/* Glowing effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover/item:opacity-30 transition-opacity duration-300 blur-sm"></div>
                </div>
                <span className="text-sm xl:text-base text-purple-200 w-16 xl:w-20 text-right font-bold group-hover/item:text-purple-100 transition-colors duration-300">
                  {numericScore}%
                </span>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </div>
  );
};

export default CulturalDNAScore;
