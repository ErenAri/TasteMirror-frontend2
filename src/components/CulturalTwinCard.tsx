import React from 'react';
import { useTranslation } from 'react-i18next';
import culturalTwinImages, { getCelebrityImage } from './culturalTwinImages';

interface Props {
  twinName: string | { name: string; description?: string };
}

const CulturalTwinCard: React.FC<Props> = ({ twinName }) => {
  const { t } = useTranslation();
  
  // Handle both string and object formats
  const actualTwinName = typeof twinName === 'string' ? twinName : twinName?.name || 'Unknown';
  
  // Clean the name by removing parentheses and their content
  const cleanTwinName = actualTwinName.replace(/\s*\([^)]*\)/g, '').trim();
  
  // Extract the "known for" part (everything after the first dash or comma)
  const nameParts = actualTwinName.split(/[-,]/);
  const justName = nameParts[0].trim();
  const knownFor = nameParts.length > 1 ? nameParts.slice(1).join(', ').trim() : '';
  
  // Get celebrity image with fallback to initials
  const imageUrl = getCelebrityImage(justName);
  
  const initials = justName.split(" ").map(w => w[0]).join("").toUpperCase();

  return (
    <div className="relative group">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-indigo-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-purple-600/30 via-purple-500/20 to-indigo-600/30 backdrop-blur-xl rounded-3xl p-8 xl:p-10 shadow-2xl text-center space-y-6 xl:space-y-8 w-full border border-purple-400/40 hover:border-purple-300/60 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-3xl">
        {/* Animated title */}
        <h3 className="text-2xl xl:text-4xl font-extrabold text-white tracking-wide drop-shadow-lg bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
          🎭 {t('cultural_twin_title')}: {justName}
        </h3>

        {/* Image container with enhanced styling */}
        <div className="relative">
          {/* Glowing ring around image */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
          
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={justName} 
              className="relative w-28 h-28 xl:w-40 xl:h-40 mx-auto rounded-full object-cover border-4 border-white/40 shadow-2xl group-hover:border-white/60 transition-all duration-500 transform group-hover:scale-105" 
            />
          ) : (
            <div className="relative w-28 h-28 xl:w-40 xl:h-40 mx-auto rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-700 flex items-center justify-center text-white font-bold text-3xl xl:text-5xl shadow-2xl border-4 border-white/40 group-hover:border-white/60 transition-all duration-500 transform group-hover:scale-105">
              {initials}
            </div>
          )}
        </div>

        {/* Description with enhanced styling */}
        <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-4 xl:p-6 border border-white/20">
          <p className="text-sm xl:text-base italic text-white/90 leading-relaxed font-medium">
            {knownFor ? knownFor : t('cultural_twin_description', { twinName: justName })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CulturalTwinCard;
