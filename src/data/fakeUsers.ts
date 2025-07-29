// Sahte kullanıcı verileri - Cultural Compatibility Matching için
export interface FakeUser {
  id: string;
  name: string;
  age: number;
  location: string;
  culturalTwin: string;
  traits: string[];
  culturalDNAScore: Record<string, string>;
  movies: string[];
  music: string[];
  brands: string[];
  avatar: string;
  bio: string;
}

export const fakeUsers: FakeUser[] = [
  {
    id: "user-001",
    name: "Sarah Chen",
    age: 28,
    location: "San Francisco, CA",
    culturalTwin: "Lana Wachowski",
    traits: ["Movie enthusiast", "Tech-savvy", "Creative thinker"],
    culturalDNAScore: {
      "North America": "85%",
      "East Asia": "78%",
      "Europe": "72%"
    },
    movies: ["The Matrix", "Inception", "Blade Runner"],
    music: ["Electronic", "Alternative Rock", "Ambient"],
    brands: ["Apple", "Nike", "Tesla"],
    avatar: "👩‍💻",
    bio: "Tech enthusiast who loves sci-fi and electronic music. Always exploring new cultures and ideas."
  },
  {
    id: "user-002", 
    name: "Alex Rodriguez",
    age: 32,
    location: "Barcelona, Spain",
    culturalTwin: "Christopher Nolan",
    traits: ["Creative visionary", "Storyteller", "Innovation seeker"],
    culturalDNAScore: {
      "Europe": "88%",
      "North America": "75%",
      "Latin America": "70%"
    },
    movies: ["Inception", "Interstellar", "The Dark Knight"],
    music: ["Classical", "Jazz", "Progressive Rock"],
    brands: ["BMW", "Rolex", "Sony"],
    avatar: "👨‍🎨",
    bio: "Creative director with a passion for complex narratives and artistic expression."
  },
  {
    id: "user-003",
    name: "Maria Santos",
    age: 25,
    location: "São Paulo, Brazil", 
    culturalTwin: "Zendaya",
    traits: ["Fashion-forward", "Social activist", "Trendsetter"],
    culturalDNAScore: {
      "Latin America": "90%",
      "North America": "76%",
      "Africa": "68%"
    },
    movies: ["Spider-Man", "Dune", "Euphoria"],
    music: ["R&B", "Hip Hop", "Latin Pop"],
    brands: ["Nike", "Adidas", "Gucci"],
    avatar: "👩‍🎤",
    bio: "Fashion influencer and social media creator. Passionate about representation and diversity."
  },
  {
    id: "user-004",
    name: "Yuki Tanaka",
    age: 29,
    location: "Tokyo, Japan",
    culturalTwin: "Hayao Miyazaki",
    traits: ["Artistic soul", "Nature lover", "Dreamer"],
    culturalDNAScore: {
      "East Asia": "92%",
      "Europe": "74%",
      "North America": "65%"
    },
    movies: ["Spirited Away", "My Neighbor Totoro", "Akira"],
    music: ["J-Pop", "Classical", "Ambient"],
    brands: ["Uniqlo", "Sony", "Muji"],
    avatar: "👨‍🎭",
    bio: "Digital artist and animation enthusiast. Finds beauty in the intersection of technology and nature."
  },
  {
    id: "user-005",
    name: "Emma Thompson",
    age: 31,
    location: "London, UK",
    culturalTwin: "Emma Watson",
    traits: ["Intellectual", "Activist", "Global citizen"],
    culturalDNAScore: {
      "Europe": "85%",
      "North America": "78%",
      "Global": "82%"
    },
    movies: ["Harry Potter", "Little Women", "Beauty and the Beast"],
    music: ["Indie Folk", "Classical", "Alternative"],
    brands: ["Stella McCartney", "The Body Shop", "Patagonia"],
    avatar: "👩‍🎓",
    bio: "Environmental activist and book lover. Believes in the power of education and sustainable living."
  },
  {
    id: "user-006",
    name: "Ahmed Hassan",
    age: 27,
    location: "Cairo, Egypt",
    culturalTwin: "Rami Malek",
    traits: ["Cultural bridge", "Storyteller", "Innovator"],
    culturalDNAScore: {
      "Middle East": "88%",
      "North America": "76%",
      "Europe": "70%"
    },
    movies: ["Bohemian Rhapsody", "Mr. Robot", "The Pacific"],
    music: ["Rock", "Arabic Pop", "Electronic"],
    brands: ["Adidas", "Samsung", "Spotify"],
    avatar: "👨‍💼",
    bio: "Software engineer and music enthusiast. Bridging cultures through technology and art."
  },
  {
    id: "user-007",
    name: "Priya Patel",
    age: 26,
    location: "Mumbai, India",
    culturalTwin: "Mindy Kaling",
    traits: ["Comedy lover", "Writer", "Empowerment advocate"],
    culturalDNAScore: {
      "South Asia": "90%",
      "North America": "78%",
      "Global": "75%"
    },
    movies: ["The Office", "Never Have I Ever", "Bollywood classics"],
    music: ["Bollywood", "Pop", "Indie"],
    brands: ["Zara", "H&M", "Netflix"],
    avatar: "👩‍💻",
    bio: "Content creator and comedy writer. Making people laugh while breaking stereotypes."
  },
  {
    id: "user-008",
    name: "Carlos Mendez",
    age: 30,
    location: "Mexico City, Mexico",
    culturalTwin: "Guillermo del Toro",
    traits: ["Fantasy lover", "Cultural preservationist", "Storyteller"],
    culturalDNAScore: {
      "Latin America": "85%",
      "Europe": "72%",
      "North America": "70%"
    },
    movies: ["Pan's Labyrinth", "The Shape of Water", "Hellboy"],
    music: ["Mexican Folk", "Rock", "Classical"],
    brands: ["Levi's", "Coca-Cola", "Sony"],
    avatar: "👨‍🎬",
    bio: "Film enthusiast and cultural researcher. Exploring the magic in everyday life."
  }
];

// Compatibility hesaplama fonksiyonu
export const calculateCompatibility = (currentUser: any, fakeUser: FakeUser): number => {
  let score = 0;
  
  // Debug log
  console.log('=== COMPATIBILITY CALCULATION ===');
  console.log('Current user object:', currentUser);
  console.log('Current user personaName:', currentUser?.personaName);
  console.log('Current user traits:', currentUser?.traits);
  console.log('Current user DNA:', currentUser?.culturalDNAScore);
  console.log('Current user twin:', currentUser?.culturalTwin);
  console.log('Fake user:', fakeUser.name);
  
  // Basit uyumluluk hesaplama - her kullanıcıya minimum %20 ver
  score = 20;
  
  // Cultural twin uyumu: +30 puan
  if (currentUser.culturalTwin && fakeUser.culturalTwin && currentUser.culturalTwin === fakeUser.culturalTwin) {
    score += 30;
    console.log('Cultural twin match! +30 points');
  }
  
  // Trait benzerliği: +30 puan
  if (currentUser.traits && fakeUser.traits && 
      Array.isArray(currentUser.traits) && Array.isArray(fakeUser.traits) &&
      currentUser.traits.length > 0 && fakeUser.traits.length > 0) {
    
    const currentTraits = currentUser.traits.map((t: string) => t.toLowerCase());
    const fakeTraits = fakeUser.traits.map(t => t.toLowerCase());
    
    console.log('Current traits:', currentTraits);
    console.log('Fake traits:', fakeTraits);
    
    // Basit eşleşme kontrolü
    let commonTraits = 0;
    for (const currentTrait of currentTraits) {
      for (const fakeTrait of fakeTraits) {
        // Tam eşleşme veya kısmi eşleşme
        if (currentTrait.includes(fakeTrait) || fakeTrait.includes(currentTrait)) {
          commonTraits++;
          console.log(`Trait match: ${currentTrait} ↔ ${fakeTrait}`);
          break;
        }
      }
    }
    
    const traitSimilarity = commonTraits / Math.max(currentTraits.length, fakeTraits.length);
    score += traitSimilarity * 30;
    console.log('Common traits found:', commonTraits);
    console.log('Trait similarity:', traitSimilarity, '+', traitSimilarity * 30, 'points');
  }
  
  // Rastgele bonus: +20 puan (çeşitlilik için)
  const randomBonus = Math.floor(Math.random() * 20);
  score += randomBonus;
  console.log('Random bonus:', randomBonus, 'points');
  
  const finalScore = Math.min(Math.round(score), 100);
  console.log('Final score:', finalScore);
  return finalScore;
};

// En uyumlu kullanıcıları bul
export const findCompatibleUsers = (currentUser: any, limit: number = 5): Array<FakeUser & { compatibility: number }> => {
  try {
  const usersWithScores = fakeUsers.map(user => ({
    ...user,
    compatibility: calculateCompatibility(currentUser, user)
  }));
  
  return usersWithScores
    .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, limit);
  } catch (error) {
    console.error('Error calculating compatibility, using fallback scores:', error);
    
    // Fallback: Sabit skorlar kullan
    const fallbackScores = [85, 78, 72, 68, 65, 62, 58, 55];
    const usersWithFallbackScores = fakeUsers.map((user, index) => ({
      ...user,
      compatibility: fallbackScores[index] || 50
    }));
    
    return usersWithFallbackScores
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, limit);
  }
}; 