import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  result: any;
  userPreferences?: {
    movies: string;
    music: string;
    brands: string;
    gender: string;
  };
}

const PersonalityBadges: React.FC<Props> = ({ result, userPreferences }) => {
  const { t } = useTranslation();

  // Generate dynamic badges based on user preferences and analysis result
  const generateBadges = () => {
    const badges = [];
    
    // Badge 1: Movie Genre Badge
    if (userPreferences?.movies) {
      const movieLower = userPreferences.movies.toLowerCase();
      if (movieLower.includes('iron man') || movieLower.includes('marvel')) {
        badges.push({
          id: 'superhero_fan',
          title: t('badges.superhero_fan.title'),
          description: t('badges.superhero_fan.description'),
          icon: '🦸‍♂️',
          color: 'from-red-500 to-orange-500'
        });
      } else if (movieLower.includes('inception') || movieLower.includes('matrix')) {
        badges.push({
          id: 'mind_bender',
          title: t('badges.mind_bender.title'),
          description: t('badges.mind_bender.description'),
          icon: '🧠',
          color: 'from-purple-500 to-blue-500'
        });
      } else {
        badges.push({
          id: 'cinema_lover',
          title: t('badges.cinema_lover.title'),
          description: t('badges.cinema_lover.description'),
          icon: '🎬',
          color: 'from-yellow-500 to-orange-500'
        });
      }
    }

    // Badge 2: Music Genre Badge
    if (userPreferences?.music) {
      const musicLower = userPreferences.music.toLowerCase();
      if (musicLower.includes('acdc') || musicLower.includes('rock')) {
        badges.push({
          id: 'rock_star',
          title: t('badges.rock_star.title'),
          description: t('badges.rock_star.description'),
          icon: '🎸',
          color: 'from-gray-600 to-black'
        });
      } else if (musicLower.includes('pop') || musicLower.includes('swift')) {
        badges.push({
          id: 'pop_sensation',
          title: t('badges.pop_sensation.title'),
          description: t('badges.pop_sensation.description'),
          icon: '🎤',
          color: 'from-pink-500 to-purple-500'
        });
      } else {
        badges.push({
          id: 'music_explorer',
          title: t('badges.music_explorer.title'),
          description: t('badges.music_explorer.description'),
          icon: '🎵',
          color: 'from-green-500 to-blue-500'
        });
      }
    }

    // Badge 3: Brand Preference Badge
    if (userPreferences?.brands) {
      const brandLower = userPreferences.brands.toLowerCase();
      if (brandLower.includes('nike')) {
        badges.push({
          id: 'sports_enthusiast',
          title: t('badges.sports_enthusiast.title'),
          description: t('badges.sports_enthusiast.description'),
          icon: '🏃‍♂️',
          color: 'from-green-500 to-blue-500'
        });
      } else if (brandLower.includes('apple') || brandLower.includes('iphone')) {
        badges.push({
          id: 'tech_innovator',
          title: t('badges.tech_innovator.title'),
          description: t('badges.tech_innovator.description'),
          icon: '💻',
          color: 'from-gray-700 to-black'
        });
      } else {
        badges.push({
          id: 'style_conscious',
          title: t('badges.style_conscious.title'),
          description: t('badges.style_conscious.description'),
          icon: '👔',
          color: 'from-purple-500 to-pink-500'
        });
      }
    }

    // Badge 4: Cultural Twin Badge
    if (result?.culturalTwin) {
              badges.push({
          id: 'cultural_twin_finder',
          title: t('badges.cultural_twin_finder.title'),
          description: t('badges.cultural_twin_finder.description', { twinName: result.culturalTwin }),
          icon: '👥',
          color: 'from-indigo-500 to-purple-500'
        });
    }

    // Badge 5: Personality Type Badge
    if (result?.archetype?.name) {
              badges.push({
          id: 'personality_explorer',
          title: t('badges.personality_explorer.title'),
          description: t('badges.personality_explorer.description', { archetypeName: result.archetype.name }),
          icon: '🔍',
          color: 'from-yellow-500 to-orange-500'
        });
    }

    return badges.slice(0, 3); // Show only first 3 badges
  };

  const badges = generateBadges();
  const unlockedCount = badges.length;
  const totalBadges = 3;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center space-x-3">
        <span className="text-2xl">🏆</span>
        <h3 className="text-xl font-bold text-yellow-300">
          {t('personality_badges')}
        </h3>
      </div>

      {/* Badge Summary */}
      <div className="text-center space-y-2">
        <div className="flex justify-center space-x-4 text-sm">
          <span className="text-yellow-400 font-semibold">
            {unlockedCount} {t('badges.unlocked')}
          </span>
          <span className="text-gray-400">
            {totalBadges - unlockedCount} {t('badges.locked')}
          </span>
        </div>
      </div>

      {/* Badge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div
            key={badge.id}
            className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
          >
            {/* Badge Icon */}
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl mb-4`}>
              {badge.icon}
            </div>

            {/* Badge Content */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-lg">{badge.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {badge.description}
              </p>
            </div>

            {/* Status Tag */}
            <div className="absolute top-4 right-4">
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                {t('badges.unlocked')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">{t('badges.progress')}</span>
          <span className="text-yellow-400 font-semibold">{unlockedCount}/{totalBadges}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(unlockedCount / totalBadges) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityBadges; 