import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryInsight {
  country: string;
  culturalInsight: string;
  recommendation: string;
  personalizedReason?: string; // Yeni alan: kişiselleştirilmiş neden
  music?: string; // Yeni alan: müzik önerileri
  movies?: string; // Yeni alan: film önerileri
}

interface Props {
  insights: Record<string, CountryInsight>;
}

const countryCoordinates: Record<string, [number, number]> = {
  USA: [-100, 38],
  "South Korea": [127.7669, 35.9078],
  UK: [-3, 55],
  Japan: [138.2529, 36.2048],
  // Alternative names that might come from backend
  "United States": [-100, 38],
  "United States of America": [-100, 38],
  "Korea": [127.7669, 35.9078],
  "Korea, South": [127.7669, 35.9078],
  "United Kingdom": [-3, 55],
  "Great Britain": [-3, 55],
  "England": [-3, 55],
  // Add more countries for variety
  "Germany": [10.4515, 51.1657],
  "France": [2.2137, 46.2276],
  "Italy": [12.5674, 41.8719],
  "Spain": [-3.7492, 40.4637],
  "Canada": [-96, 56],
  "Australia": [133.7751, -25.2744],
  "Brazil": [-51.9253, -14.235],
  "India": [78.9629, 20.5937],
  "China": [104.1954, 35.8617],
  "Russia": [105.3188, 61.524],
};

const CulturalMapWorld = ({ insights }: Props) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<CountryInsight | null>(null);

  // Fallback data if insights is empty
  const fallbackInsights: Record<string, CountryInsight> = {
    "USA": {
      country: "USA",
      culturalInsight: t('cultural_map.usa.insight'),
      recommendation: "Inception, The Matrix, Interstellar, Avengers: Endgame",
      music: "Bruce Springsteen - Born to Run, Queen - Bohemian Rhapsody, Michael Jackson - Thriller",
      movies: "Inception, The Matrix, Interstellar, Avengers: Endgame, The Godfather",
      personalizedReason: t('cultural_map.usa.reason')
    },
    "South Korea": {
      country: "South Korea", 
      culturalInsight: t('cultural_map.south_korea.insight'),
      recommendation: "BTS - Dynamite, BlackPink - How You Like That, Squid Game, Parasite",
      music: "BTS - Dynamite, BlackPink - How You Like That, IU - Blueming, Red Velvet - Psycho",
      movies: "Parasite, Squid Game, Train to Busan, Oldboy, My Sassy Girl",
      personalizedReason: t('cultural_map.south_korea.reason')
    },
    "UK": {
      country: "UK",
      culturalInsight: t('cultural_map.uk.insight'),
      recommendation: "The Beatles - Hey Jude, Queen - Bohemian Rhapsody, Harry Potter, Sherlock",
      music: "The Beatles - Hey Jude, Queen - Bohemian Rhapsody, Adele - Rolling in the Deep, Ed Sheeran - Shape of You",
      movies: "Harry Potter serisi, Sherlock Holmes, James Bond, The King's Speech",
      personalizedReason: t('cultural_map.uk.reason')
    },
    "Japan": {
      country: "Japan",
      culturalInsight: t('cultural_map.japan.insight'),
      recommendation: "Spirited Away, Attack on Titan, Death Note, Studio Ghibli",
      music: "BABYMETAL - Gimme Chocolate, ONE OK ROCK - The Beginning, Perfume - Polyrhythm",
      movies: "Spirited Away, Attack on Titan, Death Note, Your Name, Akira",
      personalizedReason: t('cultural_map.japan.reason')
    }
  };

  // Use fallback if insights is empty
  const displayInsights = (!insights || Object.keys(insights).length === 0) ? fallbackInsights : insights;

  // Debug: Log the insights received
  console.log('=== CULTURAL MAP DEBUG ===');
  console.log('Received insights:', insights);
  console.log('Insights type:', typeof insights);
  console.log('Insights is null/undefined:', insights === null || insights === undefined);
  console.log('Available countries:', Object.keys(insights || {}));
  console.log('Available coordinates:', Object.keys(countryCoordinates));
  console.log('Using fallback:', (!insights || Object.keys(insights).length === 0));
  console.log('Display insights:', displayInsights);
  
  // Check if insights is empty
  if (!insights || Object.keys(insights).length === 0) {
    console.warn('No insights received or insights is empty, using fallback');
  }
  
  // Log each country and its coordinates
  if (displayInsights) {
    Object.entries(displayInsights).forEach(([countryName, insight]) => {
      const coords = countryCoordinates[countryName];
      console.log(`Country: ${countryName}, Has coordinates: ${!!coords}, Coordinates: ${coords}`);
    });
  }
  console.log('=== END DEBUG ===');

  return (
    <div className="relative group">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-indigo-400/30 to-purple-400/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-gray-800/30 via-gray-700/20 to-gray-800/30 backdrop-blur-xl border border-gray-600/40 hover:border-gray-500/60 rounded-3xl shadow-2xl p-8 space-y-8 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
        <h3 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent text-center flex items-center justify-center gap-3">
          <span className="text-2xl xl:text-3xl">🌍</span> {t('ai_powered_cultural_map')}
        </h3>

        {/* World Map */}
        <div className="relative">
          <ComposableMap projection="geoMercator" className="mx-auto">
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any, i: number) => (
                  <Geography
                    key={i}
                    geography={geo}
                    fill="#1e1b4b"
                    stroke="#4c3c67"
                    strokeWidth={0.8}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#312e81', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {Object.entries(displayInsights).map(([countryName, insight]) => {
              // Try to find coordinates for the country
              let coords = countryCoordinates[countryName];
              
              // If not found, try alternative names
              if (!coords) {
                // Try to find by partial match
                const countryKey = Object.keys(countryCoordinates).find(key => 
                  key.toLowerCase().includes(countryName.toLowerCase()) || 
                  countryName.toLowerCase().includes(key.toLowerCase())
                );
                if (countryKey) {
                  coords = countryCoordinates[countryKey];
                  console.log(`Found coordinates for ${countryName} using key: ${countryKey}`);
                }
              }
              
              if (!coords) {
                console.warn(`No coordinates found for country: ${countryName}`);
                return null;
              }

              const id = `tooltip-${countryName.replace(/\s/g, "")}`;

              return (
                <Marker key={countryName} coordinates={coords}>
                  <circle
                    r={6}
                    fill="#facc15"
                    stroke="#fff"
                    strokeWidth={2}
                    data-tooltip-id={id}
                    data-tooltip-content={insight.culturalInsight}
                    onClick={() => setSelectedCountry(insight)}
                    className="cursor-pointer hover:r-8 transition-all duration-300 animate-pulse"
                  />
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontFamily: "sans-serif",
                      fill: "white",
                      fontSize: 11,
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                    }}
                  >
                    {countryName}
                  </text>
                  <Tooltip id={id} className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600" />
                </Marker>
              );
            })}
          </ComposableMap>
        </div>

        {/* Cultural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(displayInsights).map((insight, idx) => (
            <div
              key={idx}
              className="group/item relative"
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-2xl blur-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-gray-800/50 via-gray-700/40 to-gray-800/50 backdrop-blur-lg text-white rounded-2xl p-6 border border-gray-600/50 hover:border-gray-500/70 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                <h4 className="text-xl xl:text-2xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent flex items-center gap-2">
                  <span className="text-xl xl:text-2xl">🌐</span> {insight.country}
                </h4>
                
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-xl p-4 mb-4 border border-gray-500/30">
                  <p className="text-sm xl:text-base italic text-gray-200 leading-relaxed">
                    {insight.culturalInsight}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
                  <p className="text-sm xl:text-base">
                    <span className="text-xl mr-2">💡</span>
                    <span className="font-semibold text-yellow-200">{t('recommendation')}:</span>{" "}
                    <span className="text-yellow-100 font-medium">
                      {insight.recommendation}
                    </span>
                  </p>
                  
                  {/* Müzik Önerileri */}
                  {insight.music && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                      <p className="text-xs xl:text-sm">
                        <span className="text-lg mr-1">🎵</span>
                        <span className="font-semibold text-purple-200">{t('music_recommendations')}:</span>{" "}
                        <span className="text-purple-100 font-medium">
                          {insight.music}
                        </span>
                      </p>
                    </div>
                  )}
                  
                  {/* Film Önerileri */}
                  {insight.movies && (
                    <div className="mt-2 p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                      <p className="text-xs xl:text-sm">
                        <span className="text-lg mr-1">🎬</span>
                        <span className="font-semibold text-blue-200">{t('movie_recommendations')}:</span>{" "}
                        <span className="text-blue-100 font-medium">
                          {insight.movies}
                        </span>
                      </p>
                    </div>
                  )}
                  
                  {insight.personalizedReason && (
                    <p className="text-xs xl:text-sm mt-2 text-yellow-200/80 italic">
                      <span className="text-sm mr-1">🎯</span>
                      {insight.personalizedReason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Country Insight Modal */}
        {selectedCountry && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl shadow-2xl w-full max-w-lg p-8 space-y-6 text-white border border-gray-600/50">
              <button
                onClick={() => setSelectedCountry(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl transition-colors duration-300"
              >
                ×
              </button>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent flex items-center gap-3">
                <span className="text-3xl">🌐</span> {selectedCountry.country}
              </h2>
              
              <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-xl p-4 border border-gray-500/30">
                <p className="italic text-gray-200 leading-relaxed text-lg">
                  {selectedCountry.culturalInsight}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
                <p className="text-lg">
                  <span className="text-2xl mr-2">💡</span>
                  <span className="font-semibold text-yellow-200">{t('recommendation')}:</span>{" "}
                  <span className="text-yellow-100 font-medium">
                    {selectedCountry.recommendation}
                  </span>
                </p>
                
                {/* Müzik Önerileri */}
                {selectedCountry.music && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                    <p className="text-base">
                      <span className="text-xl mr-2">🎵</span>
                      <span className="font-semibold text-purple-200">{t('music_recommendations')}:</span>{" "}
                      <span className="text-purple-100 font-medium">
                        {selectedCountry.music}
                      </span>
                    </p>
                  </div>
                )}
                
                {/* Film Önerileri */}
                {selectedCountry.movies && (
                  <div className="mt-3 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                    <p className="text-base">
                      <span className="text-xl mr-2">🎬</span>
                      <span className="font-semibold text-blue-200">{t('movie_recommendations')}:</span>{" "}
                      <span className="text-blue-100 font-medium">
                        {selectedCountry.movies}
                      </span>
                    </p>
                  </div>
                )}
                
                {selectedCountry.personalizedReason && (
                  <p className="text-base mt-3 text-yellow-200/80 italic">
                    <span className="text-lg mr-1">🎯</span>
                    {selectedCountry.personalizedReason}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalMapWorld;
