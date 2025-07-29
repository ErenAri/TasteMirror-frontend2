import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface FormProps {
  onSubmit: (formData: {
    movies: string;
    music: string;
    brands: string;
    gender: string;
    language: string;
  }) => void;
  loading: boolean;
}

const Form: React.FC<FormProps> = ({ onSubmit, loading }) => {
  const { t, i18n } = useTranslation();
  const [movies, setMovies] = useState('');
  const [music, setMusic] = useState('');
  const [brands, setBrands] = useState('');
  const [gender, setGender] = useState('');

  // Dil değiştiğinde tab title'ını güncelle
  useEffect(() => {
    const updateTabTitle = (language: string) => {
      const titles = {
        tr: 'Taste Mirror - Kültürel İkizinizi Keşfedin',
        en: 'Taste Mirror - Discover Your Cultural Twin',
        es: 'Taste Mirror - Descubre tu Gemelo Cultural',
        fr: 'Taste Mirror - Découvrez votre Jumeau Culturel',
        de: 'Taste Mirror - Entdecke deinen Kulturellen Zwilling',
        hi: 'Taste Mirror - अपने सांस्कृतिक जुड़वां को खोजें',
        it: 'Taste Mirror - Scopri il tuo Gemello Culturale',
        zh: 'Taste Mirror - 发现你的文化双胞胎'
      };
      document.title = titles[language as keyof typeof titles] || titles.en;
    };
    
    updateTabTitle(i18n.language);
  }, [i18n.language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      movies,
      music,
      brands,
      gender,
      language: i18n.language,
    };

    // Form verilerini localStorage'a kaydet
    localStorage.setItem('tasteMirror_form_movies', movies);
    localStorage.setItem('tasteMirror_form_music', music);
    localStorage.setItem('tasteMirror_form_brands', brands);
    localStorage.setItem('tasteMirror_form_gender', gender);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex flex-col gap-6 max-w-md w-full text-black border border-white/20 animate-fade-in-up">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('form.title')}</h2>
        <p className="text-gray-600 text-sm">{t('form.subtitle')}</p>
        
        {/* Language Switcher - Prominent on form page */}
        <div className="mt-6 flex justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-1 shadow-lg">
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg border-0 shadow-sm hover:bg-white transition-colors duration-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Select language"
            >
              <option value="tr">🇹🇷 Türkçe</option>
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="hi">🇮🇳 हिंदी</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="zh">🇨🇳 中文</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="movies" className="font-semibold text-gray-700">{t('form.movies')}</label>
        <input
          id="movies"
          value={movies}
          onChange={e => {
            setMovies(e.target.value);
          }}
          placeholder={t('form.moviesPlaceholder')}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          required
          aria-describedby="movies-help"
        />
        <p id="movies-help" className="text-xs text-gray-500">
          {t('form.movies_help')}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="music" className="font-semibold text-gray-700">{t('form.music')}</label>
        <input
          id="music"
          value={music}
          onChange={e => {
            setMusic(e.target.value);
          }}
          placeholder={t('form.musicPlaceholder')}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          required
          aria-describedby="music-help"
        />
        <p id="music-help" className="text-xs text-gray-500">
          {t('form.music_help')}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="brands" className="font-semibold text-gray-700">{t('form.brands')}</label>
        <input
          id="brands"
          value={brands}
          onChange={e => {
            setBrands(e.target.value);
          }}
          placeholder={t('form.brandsPlaceholder')}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          required
          aria-describedby="brands-help"
        />
        <p id="brands-help" className="text-xs text-gray-500">
          {t('form.brands_help')}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="gender" className="font-semibold text-gray-700">{t('form.gender')}</label>
        <select
          id="gender"
          value={gender}
          onChange={e => {
            setGender(e.target.value);
          }}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          required
          aria-describedby="gender-help"
        >
          <option value="">{t('form.genderSelect')}</option>
          <option value="male">{t('form.genderMale')}</option>
          <option value="female">{t('form.genderFemale')}</option>
          <option value="nonbinary">{t('form.genderNonBinary')}</option>
          <option value="other">{t('form.genderOther')}</option>
        </select>
        <p id="gender-help" className="text-xs text-gray-500">
          {t('form.gender_help')}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl mt-4 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {t('form.loading')}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            {t('form.submit')}
          </span>
        )}
      </button>
    </form>
  );
};

export default Form;
