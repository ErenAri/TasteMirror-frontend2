import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import Form from './components/Form';
import PersonalityInsight from './components/PersonalityInsight';
import LoadingSpinner from './components/LoadingSpinner';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorBoundary from './components/ErrorBoundary';
import SocialIcons from './components/SocialIcons';
import CulturalTwinCard from './components/CulturalTwinCard';
import CulturalMapWorld from './components/CulturalMapWorld';
import PersonalityBadges from './components/PersonalityBadges';
import CulturalCompatibility from './components/CulturalCompatibility';
import Particles from 'react-tsparticles';
import SplashScreen from './components/SplashScreen';
import './i18n/config';
import CulturalDNAScore from './components/CulturalDNAScore';

function App() {
  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [countryInsights, setCountryInsights] = useState<any>(null);
  const [lastFormData, setLastFormData] = useState<any>(null);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [loadingStage, setLoadingStage] = useState<string>('');
  const [showSplash, setShowSplash] = useState(true);
  const exportRef = useRef<HTMLDivElement>(null);
  const personaRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sayfa yüklendiğinde tab title'ını ayarla
  useEffect(() => {
    updateTabTitle(currentLanguage);
    
    // localStorage'dan lastFormData'yı yükle
    const savedLastFormData = localStorage.getItem('tasteMirror_lastFormData');
    if (savedLastFormData) {
      try {
        setLastFormData(JSON.parse(savedLastFormData));
      } catch (error) {
        console.error('Error parsing saved lastFormData:', error);
      }
    }
  }, []); // Sadece bir kez çalışsın

  // Splash screen completion handler
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Basit dil değişikliği handler'ı
  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    localStorage.setItem('tasteMirror_language', newLanguage);
    
    // Tab title'ını güncelle
    updateTabTitle(newLanguage);
  };

  // Tab title'ını dil bazında güncelle
  const updateTabTitle = (language: string) => {
    if (loading) {
      document.title = t('loading.title');
    } else if (result) {
      const personaName = result.personaName || t('result.persona');
      document.title = `${personaName} - ${t('cultural_twin_analysis')}`;
    } else {
      document.title = t('app_title');
    }
  };

  const handleSubmit = async (
    formData: {
      movies: string;
      music: string;
      brands: string;
      gender: string;
      language: string; // Form'dan gelen dil
    },
    randomSeed: number = Math.floor(Math.random() * 1000) // Generate random seed by default
  ) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setCountryInsights([]);
    
    // Form'da seçilen dili kullan
    const selectedLanguage = formData.language || currentLanguage;
    
    // Loading aşamalarını göster
    const currentStages = {
      start: t('loading.stages.start'),
      analyzing: t('loading.stages.analyzing'),
      cultural: t('loading.stages.cultural'),
      finalizing: t('loading.stages.finalizing')
    };
    
    // Başlangıç aşaması
    setLoadingStage(currentStages.start);
    updateTabTitle(selectedLanguage);
    
    // Önceki isteği iptal et
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Yeni AbortController oluştur
    abortControllerRef.current = new AbortController();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 dakika timeout
      
      // Analiz aşaması
      setTimeout(() => setLoadingStage(currentStages.analyzing), 2000);
      
      // Kültürel eşleştirme aşaması
      setTimeout(() => setLoadingStage(currentStages.cultural), 4000);
      
      // Final aşaması
      setTimeout(() => setLoadingStage(currentStages.finalizing), 6000);
      
      const requestBody = {
        ...formData,
        language: selectedLanguage, // Form'da seçilen dili kullan
        randomSeed: randomSeed, // Added randomSeed to request body
      };
      
      console.log('🔍 DEBUG: Sending request with randomSeed:', randomSeed);
      console.log('🔍 DEBUG: Full request body:', requestBody);
      console.log('🔍 DEBUG: Form data:', formData);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': selectedLanguage, // Add Accept-Language header
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.result) {
        const parsed = JSON.parse(data.result);
        setResult(parsed);
        setCountryInsights(data.countryInsights || []);
        
        // Result geldiğinde tab title'ını güncelle
        updateTabTitle(selectedLanguage);
        
        // Save to localStorage and state
        localStorage.setItem('tasteMirror_result', JSON.stringify(parsed));
        localStorage.setItem('tasteMirror_countryInsights', JSON.stringify(data.countryInsights || []));
        localStorage.setItem('tasteMirror_lastFormData', JSON.stringify(formData));
        setLastFormData(formData); // Save to state as well
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted due to timeout');
        setError('Request timeout. Please try again.');
        return;
      }
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingStage('');
      // Loading bittiğinde tab title'ını güncelle
      updateTabTitle(selectedLanguage);
    }
  };

  const handleDownload = async () => {
    if (!exportRef.current) return;

    // Get current language translations using t() function
    const cardTitle = t('card_title');
    const generatedBy = t('generated_by');
    const discoverText = t('discover_text');

    // Create a compact, horizontal card layout
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '1200px';
    tempDiv.style.height = '630px'; // Instagram story size
    tempDiv.style.backgroundColor = '#1e1b4b';
    tempDiv.style.padding = '40px';
    tempDiv.style.borderRadius = '20px';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.color = 'white';
    tempDiv.style.display = 'flex';
    tempDiv.style.flexDirection = 'column';
    tempDiv.style.justifyContent = 'space-between';
    
    // Extract key information from the result
    const personaName = result?.personaName || 'Unknown';
    const culturalTwin = result?.culturalTwin || 'Unknown';
    const traits = result?.traits?.slice(0, 3) || []; // Top 3 traits
    const topRegion = result?.culturalDNAScore ? 
      Object.entries(result.culturalDNAScore)
        .sort((a, b) => parseInt(String(b[1])) - parseInt(String(a[1])))[0] : null;
    
    // Create compact card content
    tempDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 36px; margin: 0; color: #facc15; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🌟 ${cardTitle}</h1>
        <p style="font-size: 14px; margin: 5px 0; color: #a3a3a3;">${generatedBy}</p>
      </div>
      
      <div style="display: flex; gap: 30px; flex: 1; align-items: center;">
        <!-- Left side - Persona -->
        <div style="flex: 1; background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 25px; border-radius: 15px; text-align: center;">
          <h2 style="font-size: 24px; margin: 0 0 15px 0; color: white;">🎭 ${personaName}</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 15px;">
            ${traits.map((trait: string) => `<span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; font-size: 12px;">${trait}</span>`).join('')}
          </div>
          ${topRegion ? `<p style="font-size: 14px; margin: 0; color: #e0e7ff;">${topRegion[0]}: ${topRegion[1]}</p>` : ''}
        </div>
        
        <!-- Right side - Cultural Twin -->
        <div style="flex: 1; background: linear-gradient(135deg, #ec4899, #f59e0b); padding: 25px; border-radius: 15px; text-align: center;">
          <h2 style="font-size: 24px; margin: 0 0 15px 0; color: white;">👥 ${culturalTwin}</h2>
          <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
            🎭
          </div>
          <p style="font-size: 14px; margin: 0; color: #fce7f3;">${t('your_cultural_twin')}</p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #4c3c67;">
        <p style="font-size: 12px; color: #a3a3a3; margin: 0;">${discoverText}</p>
        <p style="font-size: 10px; color: #6b7280; margin: 5px 0 0 0;">#TasteMatchAI #CulturalTwin</p>
      </div>
    `;
    
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(tempDiv, {
      useCORS: true,
      backgroundColor: '#1e1b4b',
      scale: 2,
      width: 1200,
      height: 630,
    });

    document.body.removeChild(tempDiv);

    const link = document.createElement('a');
    const fileName = t('file_name');
    link.download = `${fileName}_${result?.personaName?.replace(/[^a-zA-Z0-9]/g, '_') || 'card'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(t('discover_text'));
    const url = encodeURIComponent("https://tastemirror.online/");
    const tweetUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(tweetUrl, "_blank");
  };

  const shareOnWhatsApp = async () => {
    if (!exportRef.current) return;

    try {
      // Create the same compact card format for sharing
      const cardTitle = t('card_title');
      const generatedBy = t('generated_by');
      const discoverText = t('discover_text');

      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = '1200px';
      tempDiv.style.height = '630px';
      tempDiv.style.backgroundColor = '#1e1b4b';
      tempDiv.style.padding = '40px';
      tempDiv.style.borderRadius = '20px';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.color = 'white';
      tempDiv.style.display = 'flex';
      tempDiv.style.flexDirection = 'column';
      tempDiv.style.justifyContent = 'space-between';
      
      const personaName = result?.personaName || 'Unknown';
      const culturalTwin = result?.culturalTwin || 'Unknown';
      const traits = result?.traits?.slice(0, 3) || [];
      const topRegion = result?.culturalDNAScore ? 
        Object.entries(result.culturalDNAScore)
          .sort((a, b) => parseInt(String(b[1])) - parseInt(String(a[1])))[0] : null;
      
      tempDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 36px; margin: 0; color: #facc15; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🌟 ${cardTitle}</h1>
          <p style="font-size: 14px; margin: 5px 0; color: #a3a3a3;">${generatedBy}</p>
        </div>
        
        <div style="display: flex; gap: 30px; flex: 1; align-items: center;">
          <div style="flex: 1; background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 25px; border-radius: 15px; text-align: center;">
            <h2 style="font-size: 24px; margin: 0 0 15px 0; color: white;">🎭 ${personaName}</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 15px;">
              ${traits.map((trait: string) => `<span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; font-size: 12px;">${trait}</span>`).join('')}
            </div>
            ${topRegion ? `<p style="font-size: 14px; margin: 0; color: #e0e7ff;">${topRegion[0]}: ${topRegion[1]}</p>` : ''}
          </div>
          
          <div style="flex: 1; background: linear-gradient(135deg, #ec4899, #f59e0b); padding: 25px; border-radius: 15px; text-align: center;">
            <h2 style="font-size: 24px; margin: 0 0 15px 0; color: white;">👥 ${culturalTwin}</h2>
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
              🎭
            </div>
            <p style="font-size: 14px; margin: 0; color: #fce7f3;">${t('your_cultural_twin')}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #4c3c67;">
          <p style="font-size: 12px; color: #a3a3a3; margin: 0;">${discoverText}</p>
          <p style="font-size: 10px; color: #6b7280; margin: 5px 0 0 0;">#TasteMatchAI #CulturalTwin</p>
        </div>
      `;
      
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        useCORS: true,
        backgroundColor: '#1e1b4b',
        scale: 2,
        width: 1200,
        height: 630,
      });

      document.body.removeChild(tempDiv);

      // First, download the image so user can access it
      const link = document.createElement('a');
      const fileName = `cultural_twin_${result?.personaName?.replace(/[^a-zA-Z0-9]/g, '_') || 'card'}.png`;
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Then open WhatsApp with a message about the downloaded image
      const message = `${t('discover_text')}\n\n${t('image_downloaded_message')}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
      
      // Show a notification to the user
      setTimeout(() => {
        alert(t('whatsapp_share_instructions'));
      }, 1000);
      
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error('WhatsApp sharing failed:', error);
      const text = encodeURIComponent(t('discover_text'));
      const whatsappUrl = `https://wa.me/?text=${text}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const shareOnInstagram = async () => {
    if (!exportRef.current) return;

    try {
      // Create the same compact card format for sharing
      const cardTitle = t('card_title');
      const generatedBy = t('generated_by');
      const discoverText = t('discover_text');

      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = '1200px';
      tempDiv.style.height = '630px';
      tempDiv.style.backgroundColor = '#1e1b4b';
      tempDiv.style.padding = '40px';
      tempDiv.style.borderRadius = '20px';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.color = 'white';
      tempDiv.style.display = 'flex';
      tempDiv.style.flexDirection = 'column';
      tempDiv.style.justifyContent = 'space-between';
      
      const personaName = result?.personaName || 'Unknown';
      const culturalTwin = result?.culturalTwin || 'Unknown';
      const traits = result?.traits?.slice(0, 3) || [];
      const topRegion = result?.culturalDNAScore ? 
        Object.entries(result.culturalDNAScore)
          .sort((a, b) => parseInt(String(b[1])) - parseInt(String(a[1])))[0] : null;
      
      tempDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 36px; margin: 0; color: #facc15; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🌟 ${cardTitle}</h1>
          <p style="font-size: 14px; margin: 5px 0; color: #a3a3a3;">${generatedBy}</p>
        </div>
        
        <div style="display: flex; gap: 30px; flex: 1; align-items: center;">
          <div style="flex: 1; background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 25px; border-radius: 15px; text-align: center;">
            <h2 style="font-size: 24px; margin: 0 0 15px 0; color: white;">🎭 ${personaName}</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 15px;">
              ${traits.map((trait: string) => `<span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 20px; font-size: 12px;">${trait}</span>`).join('')}
            </div>
            ${topRegion ? `<p style="font-size: 14px; margin: 0; color: #e0e7ff;">${topRegion[0]}: ${topRegion[1]}</p>` : ''}
          </div>
          
          <div style="flex: 1; background: linear-gradient(135deg, #ec4899, #f59e0b); padding: 25px; border-radius: 15px; text-align: center;">
            <h2 style="font-size: 24px; margin: 0 0 15px 0; color: white;">👥 ${culturalTwin}</h2>
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 32px;">
              🎭
            </div>
            <p style="font-size: 14px; margin: 0; color: #fce7f3;">${t('your_cultural_twin')}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #4c3c67;">
          <p style="font-size: 12px; color: #a3a3a3; margin: 0;">${discoverText}</p>
          <p style="font-size: 10px; color: #6b7280; margin: 5px 0 0 0;">#TasteMatchAI #CulturalTwin</p>
        </div>
      `;
      
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        useCORS: true,
        backgroundColor: '#1e1b4b',
        scale: 2,
        width: 1200,
        height: 630,
      });

      document.body.removeChild(tempDiv);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });

      const file = new File([blob], 'cultural_twin.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: t('your_cultural_twin'),
          text: t('discover_text'),
          files: [file],
        });
      } else {
        const link = document.createElement('a');
        link.download = 'cultural_twin_instagram.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        alert(t('discover_text'));
      }
    } catch (error) {
      console.error('Instagram sharing failed:', error);
    }
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent("https://your-deployment-url.vercel.app/");
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, "_blank");
  };

  const handleGoHome = () => {
    setResult(null);
    setCountryInsights(null);
    setLastFormData(null);
    
    localStorage.removeItem('tasteMirror_result');
    localStorage.removeItem('tasteMirror_countryInsights');
    localStorage.removeItem('tasteMirror_lastFormData');
    localStorage.removeItem('tasteMirror_form_movies');
    localStorage.removeItem('tasteMirror_form_music');
    localStorage.removeItem('tasteMirror_form_brands');
    localStorage.removeItem('tasteMirror_form_gender');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && result) {
        handleGoHome();
      }
      if (event.key === 'Enter' && event.ctrlKey && result) {
        handleDownload();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [result]);

  const scrollToPersona = () => {
    if (personaRef.current) {
      personaRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Debug countryInsights
  // useEffect(() => {
  //   console.log('=== COUNTRY INSIGHTS DEBUG ===');
  //   console.log('countryInsights:', countryInsights);
  //   console.log('countryInsights type:', typeof countryInsights);
  //   console.log('countryInsights is null:', countryInsights === null);
  //   if (countryInsights) {
  //     console.log('countryInsights keys:', Object.keys(countryInsights));
  //     console.log('countryInsights values:', Object.values(countryInsights));
  //   }
  //   console.log('=== END COUNTRY INSIGHTS DEBUG ===');
  // }, [countryInsights]);

  // Debug language changes
  // useEffect(() => {
  //   console.log('=== LANGUAGE DEBUG ===');
  //   console.log('i18n.language:', i18n.language);
  //   console.log('currentLanguage:', currentLanguage);
  //   console.log('=== END LANGUAGE DEBUG ===');
  // }, [i18n.language, currentLanguage]);

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
        <LoadingSpinner 
          message={t('loading.title')} 
          stage={loadingStage}
        />
      </div>
    );
  }

  if (error) {
  return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">
            {t('error.analysis_failed')}
          </h1>
          <p className="text-white/70 mb-6">
            {error}
          </p>
          <button
            onClick={() => setError(null)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 {t('error.try_again')}
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex items-center justify-center p-6">
        <Form onSubmit={handleSubmit} loading={loading} />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="layout-wrapper" role="main" aria-label="Taste Mirror - Cultural Twin Discovery">
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            number: { value: 35 },
            size: { value: 3 },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.3 },
            color: { value: "#a78bfa" },
            links: {
              enable: true,
              distance: 120,
              color: "#c084fc",
              opacity: 0.3,
            }
          }
        }}
        className="fixed inset-0 -z-10"
      />

      {/* Language Switcher - Only show on form page, not on results page */}
      {!result && (
        <div className="fixed top-4 right-4 z-50">
          <select
            value={i18n.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-purple-600/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-purple-400/30 shadow-lg hover:bg-purple-500/80 transition-colors duration-300"
          >
            <option value="tr">TR Türkçe</option>
            <option value="en">EN English</option>
            <option value="es">ES Español</option>
            <option value="fr">FR Français</option>
            <option value="de">DE Deutsch</option>
            <option value="hi">HI हिन्दी</option>
            <option value="zh">ZH 中文</option>
            <option value="it">IT Italiano</option>
          </select>
        </div>
      )}

      {/* Header */}
      <header className="layout-header">
        <div className="header-content">
          <h1 className="header-title">
            🌟 {t("result.persona")}: {result.personaName}
          </h1>
          <p className="header-subtitle">{result.description}</p>
          
          {/* Navigation Menu */}
          <nav className="header-navigation">
            <div className="nav-links">
              <button 
                onClick={() => document.getElementById('persona-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="nav-link"
              >
                🎭 {t("result.persona")}
              </button>
              
              {result.archetype && (
                              <button 
                onClick={() => document.getElementById('archetype-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="nav-link"
              >
                🗺️ {t('archetype')}
              </button>
              )}
              
              {result.culturalDNAScore && (
                <button 
                  onClick={() => document.getElementById('dna-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="nav-link"
                >
                  🧬 {t('cultural_dna_match')}
                </button>
              )}
              
              {result.therapySuggestion && result.therapySuggestion.summary && (
                <button 
                  onClick={() => document.getElementById('therapy-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="nav-link"
                >
                  🧘 {t('ai_therapy_suggestion')}
                </button>
              )}
              
              <button 
                onClick={() => document.getElementById('badges-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="nav-link"
              >
                🏆 {t('personality_badges')}
              </button>
              
              <button 
                onClick={() => document.getElementById('compatibility-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="nav-link"
              >
                💕 {t('cultural_compatibility')}
              </button>
              
              {countryInsights && (
                <button 
                  onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="nav-link"
                >
                  🌍 {t('ai_powered_cultural_map')}
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Layout */}
      <div className="layout-main">
        {/* Sidebar - Cultural Twin */}
        <aside className="layout-sidebar">
          <div className="sidebar-content">
            <h2 className="sidebar-title">🎭 {t('cultural_twin_title')}</h2>
            <div className="cultural-twin-container">
              <CulturalTwinCard twinName={result.culturalTwin} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="layout-main-content" ref={personaRef}>
          <div className="main-content-wrapper">
            {/* Persona Details */}
            <section id="persona-section" className="persona-section">
              <div className="bg-gradient-to-br from-white/90 via-white/80 to-purple-50/50 text-black rounded-3xl shadow-2xl p-8 border border-white/20 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  🌟 {t("result.persona")}: {result.personaName}
                </h2>
                
                <p className="italic mb-6 text-lg leading-relaxed text-gray-700 font-medium">
                  {result.description}
                </p>

                {Array.isArray(result.traits) && result.traits.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-xl mb-4 text-purple-700 flex items-center gap-2">
                      <span className="text-2xl">🪄</span> {t("result.traits")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[...new Set(result.traits.flat())].map((trait: any, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 rounded-full text-sm font-semibold border border-purple-200/50 shadow-sm"
                        >
                          {String(trait)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.insights && (
                  <div>
                    <h3 className="font-bold text-xl mb-4 text-indigo-700 flex items-center gap-2">
                      <span className="text-2xl">💡</span> {t("result.insights")}
                    </h3>
                    <div className="space-y-3">
                      {result.insights.likelyInterests && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/50">
                          <p className="text-gray-800 font-medium">{result.insights.likelyInterests}</p>
                        </div>
                      )}
                      {result.insights.likelyBehaviors && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
                          <p className="text-gray-800 font-medium">{result.insights.likelyBehaviors}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Archetype */}
            {result.archetype && (
              <section id="archetype-section" className="archetype-section">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 via-blue-400/30 to-purple-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-indigo-500/20 via-blue-500/15 to-purple-500/20 backdrop-blur-xl border border-indigo-400/40 p-8 rounded-3xl shadow-2xl text-white space-y-4">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent flex items-center gap-3">
                      <span className="text-3xl">🗺️</span> Archetype: {result.archetype.name}
                    </h3>
                    <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-4 border border-white/20">
                      <p className="italic text-white/90 text-lg leading-relaxed font-medium">{result.archetype.description}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Cultural DNA Score */}
            {result.culturalDNAScore && (
              <section id="dna-section" className="dna-section">
                <CulturalDNAScore culturalDNAScore={result.culturalDNAScore} />
              </section>
            )}

            {/* Therapy Suggestion */}
            {result.therapySuggestion && result.therapySuggestion.summary && (
              <section id="therapy-section" className="therapy-section">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 via-emerald-400/30 to-green-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-teal-500/20 via-emerald-500/15 to-green-500/20 backdrop-blur-xl border border-teal-400/40 rounded-3xl shadow-2xl p-8 text-white space-y-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-200 to-emerald-200 bg-clip-text text-transparent flex items-center gap-3">
                      <span className="text-2xl">🧘</span> {t('ai_therapy_suggestion')}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-r from-teal-50/10 to-emerald-50/10 rounded-2xl p-6 border border-teal-200/30">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🧠</span>
                          <h4 className="font-bold text-teal-200 text-lg">{t('summary')}</h4>
                        </div>
                        <p className="text-white/90 italic leading-relaxed">{result.therapySuggestion.summary}</p>
                      </div>
                      {result.therapySuggestion.recommendation && (
                        <div className="bg-gradient-to-r from-emerald-50/10 to-green-50/10 rounded-2xl p-6 border border-emerald-200/30">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">💡</span>
                            <h4 className="font-bold text-emerald-200 text-lg">{t('recommendation')}</h4>
                          </div>
                          <p className="text-white/90 leading-relaxed">{result.therapySuggestion.recommendation}</p>
                        </div>
                      )}
                      {result.therapySuggestion.dailyTip && (
                        <div className="bg-gradient-to-r from-green-50/10 to-teal-50/10 rounded-2xl p-6 border border-green-200/30">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">🌞</span>
                            <h4 className="font-bold text-green-200 text-lg">{t('daily_tip')}</h4>
                          </div>
                          <p className="text-green-100 leading-relaxed font-medium">{result.therapySuggestion.dailyTip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Personality Badges */}
            <section id="badges-section" className="badges-section">
              <PersonalityBadges
                result={result}
                userPreferences={lastFormData}
              />
            </section>

            {/* Cultural Compatibility */}
            <section id="compatibility-section" className="compatibility-section">
              <CulturalCompatibility 
                currentUser={result} 
              />
            </section>

            {/* Cultural Map */}
            {countryInsights && (
              <section id="map-section" className="map-section">
                <CulturalMapWorld insights={countryInsights} />
              </section>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="footer-content">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleGoHome}
              className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-indigo-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="relative z-10 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span className="relative z-10">{t('home_page')}</span>
            </button>

            <button
              onClick={handleDownload}
              className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-blue-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="relative z-10 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <span className="relative z-10">{t('download_cultural_card')}</span>
            </button>

            <button
              onClick={() => lastFormData && handleSubmit(lastFormData, Math.floor(Math.random() * 100))}
              disabled={!lastFormData}
              className="group relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-pink-400/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-xl"
              title={!lastFormData ? "No previous form data available" : "Try another analysis with the same data"}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="relative z-10 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="relative z-10">{t('try_another_cultural_twin')}</span>
            </button>

            <button
              onClick={shareOnTwitter}
              className="group relative bg-gradient-to-r from-[#1DA1F2] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#0284c7] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-[#1DA1F2]/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1DA1F2]/20 to-[#0ea5e9]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <SocialIcons platform="x" className="relative z-10 w-5 h-5" />
              <span className="relative z-10">{t('share_on_x')}</span>
            </button>

            <button
              onClick={shareOnWhatsApp}
              className="group relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-green-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <SocialIcons platform="whatsapp" className="relative z-10 w-5 h-5" />
              <span className="relative z-10">{t('share_on_whatsapp')}</span>
            </button>

            <button
              onClick={shareOnInstagram}
              className="group relative bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-purple-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-orange-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <SocialIcons platform="instagram" className="relative z-10 w-5 h-5" />
              <span className="relative z-10">{t('share_on_instagram')}</span>
            </button>

            <button
              onClick={shareOnFacebook}
              className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-blue-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <SocialIcons platform="facebook" className="relative z-10 w-5 h-5" />
              <span className="relative z-10">{t('share_on_facebook')}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Exportable Card (Hidden) */}
            <div className="absolute -top-[9999px] left-0">
              <div
                ref={exportRef}
                className="w-[1000px] min-h-[1200px] bg-gradient-to-b from-[#1e1b4b] to-[#312e81] text-white p-10 rounded-[32px] shadow-2xl space-y-8 flex flex-col items-center justify-center"
              >
                <h1 className="text-4xl font-extrabold text-center text-white drop-shadow mb-6">
            {t('cultural_twin_card_title')}
                </h1>
                <PersonalityInsight analysis={result} countryInsights={countryInsights} />
                <div className="text-xs text-right text-white/30 mt-6 w-full text-end">
                  tasteMatch.ai
                </div>
              </div>
            </div>
            </div>
    </ErrorBoundary>
  );
}

export default App;
