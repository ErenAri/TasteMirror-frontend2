import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { findCompatibleUsers, FakeUser } from '../data/fakeUsers';

interface CulturalCompatibilityProps {
  currentUser: any;
}

const CulturalCompatibility: React.FC<CulturalCompatibilityProps> = ({ currentUser }) => {
  const { t, i18n } = useTranslation();
  const [compatibleUsers, setCompatibleUsers] = useState<Array<FakeUser & { compatibility: number }>>([]);
  
  // Recalculate compatible users when language or currentUser changes
  useEffect(() => {
    console.log('=== CULTURAL COMPATIBILITY RECALCULATION ===');
    console.log('Language changed to:', i18n.language);
    console.log('Current user exists:', !!currentUser);
    console.log('Current user data:', currentUser);
    
    if (currentUser) {
      try {
        const users = findCompatibleUsers(currentUser, 5);
        console.log('Calculated users:', users);
        console.log('Users with scores:', users.map(u => `${u.name}: ${u.compatibility}%`));
        setCompatibleUsers(users);
      } catch (error) {
        console.error('Error in findCompatibleUsers:', error);
        setCompatibleUsers([]);
      }
    } else {
      console.log('No current user data, setting empty array');
      setCompatibleUsers([]);
    }
  }, [currentUser, i18n.language]); // Add i18n.language as dependency
  
  console.log('=== CULTURAL COMPATIBILITY DEBUG ===');
  console.log('Current User:', currentUser);
  console.log('Current User traits:', currentUser?.traits);
  console.log('Current User DNA:', currentUser?.culturalDNAScore);
  console.log('Current User twin:', currentUser?.culturalTwin);
  console.log('Current User personaName:', currentUser?.personaName);
  console.log('Current Language:', i18n.language);
  console.log('Compatible Users:', compatibleUsers);
  console.log('=== END DEBUG ===');

  if (compatibleUsers.length === 0) {
    return (
      <div className="relative group">
        <div className="relative bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-indigo-500/20 backdrop-blur-xl border border-pink-400/40 rounded-3xl shadow-2xl p-8 text-white">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
            {t('cultural_compatibility')}
          </h3>
          <p className="text-center text-white/80 mt-4">
            No compatible users found. Try analyzing your personality again!
          </p>
        </div>
      </div>
    );
  }

  const getCompatibilityColor = (score: number): string => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 80) return 'from-blue-500 to-cyan-500';
    if (score >= 70) return 'from-purple-500 to-indigo-500';
    if (score >= 60) return 'from-orange-500 to-yellow-500';
    return 'from-red-500 to-pink-500';
  };



  return (
    <div className="relative group">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-indigo-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-indigo-500/20 backdrop-blur-xl border border-pink-400/40 hover:border-pink-300/60 rounded-3xl shadow-2xl p-8 text-white space-y-6 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
        <h3 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent flex items-center gap-3">
          {t('cultural_compatibility')}
        </h3>

        <p className="text-center text-white/80 text-lg">
          {t('compatibility_description')}
        </p>

        {/* Compatibility Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-300">{compatibleUsers.length}</div>
            <div className="text-sm text-pink-200">{t('compatible_users')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300">
              {isNaN(compatibleUsers.reduce((sum, user) => sum + user.compatibility, 0) / compatibleUsers.length) 
                ? '0' 
                : Math.round(compatibleUsers.reduce((sum, user) => sum + user.compatibility, 0) / compatibleUsers.length)
              }%
            </div>
            <div className="text-sm text-purple-200">{t('average_compatibility')}</div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {compatibleUsers.map((user) => (
            <div
              key={user.id}
              className="group/user relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
            >
              {/* Compatibility Score Badge */}
              <div className="absolute -top-2 -right-2 z-10">
                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCompatibilityColor(user.compatibility)} text-white text-xs font-bold shadow-lg`}>
                  {isNaN(user.compatibility) ? 0 : user.compatibility}%
                </div>
              </div>

              {/* User Info */}
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">{user.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">{user.name}</h4>
                  <p className="text-sm text-white/70">{user.location}</p>
                  <p className="text-xs text-white/50">{user.age} years old</p>
                </div>
              </div>

              {/* Cultural Twin */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-purple-300">🎭</span>
                  <span className="text-xs text-purple-200">{t('cultural_twin_title')}:</span>
                </div>
                <p className="text-sm font-semibold text-white">{user.culturalTwin}</p>
              </div>

              {/* Common Traits */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-pink-300">✨</span>
                  <span className="text-xs text-pink-200">{t('result.traits')}:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {user.traits.slice(0, 2).map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white text-xs rounded-full border border-pink-500/30"
                    >
                      {t(`traits.${trait.toLowerCase()}`, trait)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-3">
                <p className="text-xs text-white/80 italic leading-relaxed">
                  {t(`fake_users.${user.id}.bio`, user.bio)}
                </p>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-300">🎬</span>
                  <span className="text-xs text-white/70">{user.movies.slice(0, 2).join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-300">🎵</span>
                  <span className="text-xs text-white/70">{user.music.slice(0, 2).join(', ')}</span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover/user:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-6">
          <p className="text-white/70 text-sm">
            {t('compatibility_cta')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CulturalCompatibility; 