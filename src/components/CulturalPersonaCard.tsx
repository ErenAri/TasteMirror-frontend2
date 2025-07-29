import React from 'react';

interface CulturalPersonaCardProps {
  personaName: string;
  description: string;
  traits: string[];
  emoji?: string;
}

const CulturalPersonaCard: React.FC<CulturalPersonaCardProps> = ({
  personaName,
  description,
  traits,
  emoji = '🎭',
}) => {
  return (
    <div
      className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl text-white mb-8"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{emoji}</div>
        <h3 className="text-xl font-bold">{personaName}</h3>
      </div>
      <p className="text-sm mb-4 text-violet-100">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {traits.map((trait, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs bg-violet-700/30 border border-violet-400 rounded-full"
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CulturalPersonaCard;
