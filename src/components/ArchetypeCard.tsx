import React from "react";
import { useTranslation } from 'react-i18next';

interface Props {
  name: string;
  description: string;
}

const ArchetypeCard: React.FC<Props> = ({ name, description }) => {
  const { t } = useTranslation();
  
  return (
  <div className="relative group">
    {/* Glowing background effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 via-blue-400/30 to-purple-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative bg-gradient-to-br from-indigo-500/20 via-blue-500/15 to-purple-500/20 backdrop-blur-xl border border-indigo-400/40 hover:border-indigo-300/60 p-8 rounded-3xl shadow-2xl text-white space-y-4 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
      <h3 className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent flex items-center gap-3">
        <span className="text-3xl xl:text-4xl">🗺️</span> {t('archetype')}: {name}
      </h3>
      <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-4 border border-white/20">
        <p className="italic text-white/90 text-lg xl:text-xl leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  </div>
  );
};

export default ArchetypeCard;
