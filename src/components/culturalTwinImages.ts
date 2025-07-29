const culturalTwinImages: Record<string, string> = {
  "Elon Musk": "https://upload.wikimedia.org/wikipedia/commons/d/dc/The_White_House_-_54409525537_%28cropped%29_%28cropped%29.jpg",
  "Emma Watson": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Emma_Watson_2013.jpg",
  "Shawn Mendes": "https://upload.wikimedia.org/wikipedia/en/0/0d/Shawn_Mendes_-_Shawn_album_cover.png",
  "Keanu Reeves": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Reuni%C3%A3o_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg/960px-Reuni%C3%A3o_com_o_ator_norte-americano_Keanu_Reeves_%2846806576944%29_%28cropped%29.jpg",
  "Beyoncé": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%2810_of_118%29_%2852946364598%29_%28best_crop%29.jpg",
  "Billie Eilish": "https://upload.wikimedia.org/wikipedia/commons/9/92/BillieEilishO2160622_%2819_of_45%29_%2852153214339%29_%28cropped_3%29.jpg",
  "Oprah Winfrey": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pre_Inaugural_Reception_%2852639556983%29_%28cropped%29.jpg",
  "Steve Jobs": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/1200px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
  "Zendaya": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Zendaya_promoting_Smallfoot_for_MTV_international.png/250px-Zendaya_promoting_Smallfoot_for_MTV_international.png",
  "Barack Obama": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Official_portrait_of_Barack_Obama.jpg/250px-Official_portrait_of_Barack_Obama.jpg",
  "Lady Gaga": "https://upload.wikimedia.org/wikipedia/commons/9/98/Lady_Gaga_at_the_White_House_in_2023_%281%29.jpg",
  "Adele": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Adele_2016.jpg",
  "Drake": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/640px-Drake_July_2016.jpg",
  "Taylor Swift": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png",
  "Timothée Chalamet": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg",
  "Ezra Miller": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ezra_Miller_by_Gage_Skidmore.jpg/250px-Ezra_Miller_by_Gage_Skidmore.jpg",
  "Johnny Depp":"https://upload.wikimedia.org/wikipedia/commons/2/21/Johnny_Depp_2020.jpg",
  "Bill Gates":"https://upload.wikimedia.org/wikipedia/commons/a/a0/Bill_Gates_2018.jpg",
  "Mark Zuckerberg": "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
  "Selena Gomez": "https://upload.wikimedia.org/wikipedia/commons/8/81/Selena_Gomez_at_the_2024_Toronto_International_Film_Festival_10_%28cropped%29.jpg",
  "BTS": "https://upload.wikimedia.org/wikipedia/commons/2/21/BTS_logo_%28Beyond_the_Story%29.png",
  "Rihanna": "https://upload.wikimedia.org/wikipedia/commons/1/16/Rihanna_visits_U.S._Embassy_in_Barbados_2024_%28cropped%29.jpg",
  "Harry Styles": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Harry_Styles_November_2014.jpg",
  "Natalie Portman": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Natalie_Portman_Cannes_2015_5_%28cropped%29.jpg",
  "Cristiano Ronaldo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ronaldo_in_2018.jpg/250px-Ronaldo_in_2018.jpg",
  "Lionel Messi": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Lionel_Messi_31mar2007.jpg/250px-Lionel_Messi_31mar2007.jpg",
  "Angelina Jolie": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg/250px-Angelina_Jolie_2_June_2014_%28cropped%29.jpg",
  "Malala Yousafzai": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Malala_Yousafzai_2015.jpg/2048px-Malala_Yousafzai_2015.jpg",
  "PewDiePie": "https://upload.wikimedia.org/wikipedia/commons/8/86/PewDiePie_at_PAX_2015_crop.jpg",
  "Jungkook": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Jeon_Jungkook_at_the_White_House%2C_31_May_2022.jpg",
  "Greta Thunberg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Greta_Thunberg_Stockholm_2024_%283x4_cropped%29.jpg/250px-Greta_Thunberg_Stockholm_2024_%283x4_cropped%29.jpg",
  "David Attenborough": "https://upload.wikimedia.org/wikipedia/commons/8/81/Weston_Library_Opening_by_John_Cairns_20.3.15-139_David_Attenborough.jpg",
  "Chris Hemsworth": "https://upload.wikimedia.org/wikipedia/commons/6/69/Chris_Hemsworth_by_Gage_Skidmore_3.jpg",
  "Christopher Nolan":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/ChrisNolanBFI150224_%2810_of_12%29_%2853532289710%29_%28cropped2%29.jpg/250px-ChrisNolanBFI150224_%2810_of_12%29_%2853532289710%29_%28cropped2%29.jpg",
  "Jonah Hill":"https://upload.wikimedia.org/wikipedia/commons/0/0e/Jonah_Hill-4939_%28cropped%29_%28cropped%29.jpg",
  "Angus Young":"https://upload.wikimedia.org/wikipedia/commons/0/07/AngusYoung.JPG",
  "Ellen Page":"https://upload.wikimedia.org/wikipedia/commons/b/b6/2023_National_Book_Festival_%2853122454007%29_%28cropped%29.jpg",
  "Robert Downey Jr.":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Robert_Downey%2C_Jr._2012.jpg/1200px-Robert_Downey%2C_Jr._2012.jpg",
  "Christian Bale":"https://upload.wikimedia.org/wikipedia/commons/0/0a/Christian_Bale-7837.jpg", 
  "Leonardo DiCaprio":"https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_Dicaprio_Cannes_2019.jpg",
  "Lana Wachowski":"https://upload.wikimedia.org/wikipedia/commons/5/55/Lana_Wachowski-2787_%283x4_cropped%29.jpg",
  "Bruce Willis":"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bruce_Willis_by_Gage_Skidmore_3.jpg",
  "Neil Armstrong":"https://upload.wikimedia.org/wikipedia/commons/0/0d/Neil_Armstrong_pose.jpg",
  "Scarlett Johansson":"https://upload.wikimedia.org/wikipedia/commons/a/ad/Scarlett_Johansson-8588.jpg",
  "Tom Hanks":"https://upload.wikimedia.org/wikipedia/commons/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg",
  "Emma Stone":"https://upload.wikimedia.org/wikipedia/commons/9/9b/Emma_Stone_at_the_2025_Cannes_Film_Festival_03_%28cropped%29.jpg",
  "Bruce Springsteen":"https://upload.wikimedia.org/wikipedia/commons/f/f2/SpringsteenCardiff050524_%28138_of_166%29_%2853704146372%29_%28cropped%29.jpg",
  "Elton John":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/EltonDocBFILFF101024_%284_of_17%29_%28cropped%29.jpg/640px-EltonDocBFILFF101024_%284_of_17%29_%28cropped%29.jpg"
};

// Get celebrity image with fallback to initials
export const getCelebrityImage = (celebrityName: string): string => {
  // If celebrity has a specific image in our list, use it
  if (culturalTwinImages[celebrityName]) {
    return culturalTwinImages[celebrityName];
  }
  
  // Try case-insensitive match
  const lowerName = celebrityName.toLowerCase();
  for (const [key, value] of Object.entries(culturalTwinImages)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  // Otherwise, generate initials-based image
  const initials = getInitials(celebrityName);
  return generateInitialsImage(initials);
};

// Get initials from celebrity name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Generate initials-based image URL
const generateInitialsImage = (initials: string): string => {
  const colors = [
    'FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7',
    'DDA0DD', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E9'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${randomColor}&color=fff&size=400&font-size=0.4&bold=true`;
};

export default culturalTwinImages;
