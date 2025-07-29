import React from "react";
import { useTranslation } from "react-i18next";
import CulturalTwinCard from "./CulturalTwinCard";
import TherapySuggestionCard from "./TherapySuggestionCard";
import CulturalMapWorld from "./CulturalMapWorld";
import ArchetypeCard from "./ArchetypeCard";
import CulturalDNAScore from "./CulturalDNAScore";

interface AnalysisResult {
  personaName: string;
  description: string;
  traits?: string[];
  insights?: {
    likelyInterests?: string;
    likelyBehaviors?: string;
  };
  culturalTwin: string;
  therapySuggestion?: {
    summary?: string;
    recommendation?: string;
    resources?: string[];
    dailyTip?: string;
  };
  culturalDNAScore?: Record<string, string>;
  archetype?: {
    name: string;
    description: string;
  };
}

interface PersonalityInsightProps {
  analysis: AnalysisResult | null;
  countryInsights?: any;
}

const PersonalityInsight: React.FC<PersonalityInsightProps> = ({ analysis, countryInsights }) => {
  const { t } = useTranslation();

  if (!analysis) return null;

  return (
    <div className="w-full px-4 max-w-screen-2xl mx-auto space-y-16 py-12 overflow-x-hidden">
      {/* Hero Section with Persona + Twin */}
      <div className="flex flex-col xl:flex-row gap-16 items-stretch">
        {/* Persona Card */}
        <div className="flex-1 min-w-0 max-w-full xl:max-w-[800px] flex">
          <div className="bg-gradient-to-br from-white/90 via-white/80 to-purple-50/50 text-black rounded-3xl shadow-2xl p-8 w-full flex flex-col justify-start border border-white/20 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-indigo-400/20 rounded-3xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl xl:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                🌟 {t("result.persona")}: {analysis.personaName}
              </h2>
              
              <p className="italic mb-6 text-lg xl:text-xl leading-relaxed text-gray-700 font-medium">
                {analysis.description}
              </p>

              {Array.isArray(analysis.traits) && analysis.traits.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-xl xl:text-2xl mb-4 text-purple-700 flex items-center gap-2">
                    <span className="text-2xl">🪄</span> {t("result.traits")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[...new Set(analysis.traits.flat())].map((trait, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 rounded-full text-sm xl:text-base font-semibold border border-purple-200/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                      >
                        {t(`traits.${trait.toLowerCase()}`, trait)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {analysis.insights && (
                <div>
                  <h3 className="font-bold text-xl xl:text-2xl mb-4 text-indigo-700 flex items-center gap-2">
                    <span className="text-2xl">💡</span> {t("result.insights")}
                  </h3>
                  <div className="space-y-3">
                    {analysis.insights.likelyInterests && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/50">
                        <p className="text-gray-800 font-medium">{analysis.insights.likelyInterests}</p>
                      </div>
                    )}
                    {analysis.insights.likelyBehaviors && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
                        <p className="text-gray-800 font-medium">{analysis.insights.likelyBehaviors}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cultural Twin Card */}
        <div className="flex-1 min-w-0 max-w-full xl:max-w-[800px] flex items-start">
          <CulturalTwinCard twinName={analysis.culturalTwin} />
        </div>
      </div>

      {/* Archetype Card */}
      {analysis.archetype && (
        <div className="w-full animate-fade-in">
          <ArchetypeCard
            name={analysis.archetype.name}
            description={analysis.archetype.description}
          />
        </div>
      )}

      {/* Cultural DNA Score */}
      {analysis.culturalDNAScore && (
        <div className="w-full animate-fade-in">
          <CulturalDNAScore culturalDNAScore={analysis.culturalDNAScore} />
        </div>
      )}

      {/* Therapy Suggestion */}
      {analysis.therapySuggestion && analysis.therapySuggestion.summary && (
        <div className="w-full animate-fade-in">
          <TherapySuggestionCard suggestion={analysis.therapySuggestion} />
        </div>
      )}

      {/* Cultural Map */}
      {countryInsights && (
        <div className="w-full animate-fade-in">
          <CulturalMapWorld insights={countryInsights} />
        </div>
      )}
    </div>
  );
};

export default PersonalityInsight;
