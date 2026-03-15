// ─── Types ────────────────────────────────────────────────────────────────────

export interface Hotel {
  name: string;
  type: string;
  priceRange: string;
  stars: number;
  description: string;
  highlights: string[];
  accentColor: string;
}

export interface Activity {
  name: string;
  category: string;
  duration: string;
  difficulty: string;
  description: string;
  bestTime: string;
  icon: string;
  accentColor: string;
}

export interface Review {
  author: string;
  country: string;
  flag: string;
  rating: number;
  date: string;
  text: string;
  highlight: string;
}

export interface Destination {
  slug: string;
  kanji: string;
  name: string;
  subtitle: string;
  region: string;
  description: string;
  longDescription: string;
  heroGradient: string;
  accentColor: string;
  secondaryColor: string;
  shadowColor: string;
  tags: string[];
  icon: string;
  bestMonths: string;
  budget: string;
  language: string;
  timezone: string;
  quickFacts: { label: string; value: string }[];
  hotels: Hotel[];
  activities: Activity[];
  reviews: Review[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const destinations: Destination[] = [
  {
    slug: 'kyoto',
    kanji: '京都',
    name: 'Kyoto',
    subtitle: "L'Âme Ancienne",
    region: 'Kansai',
    description:
      'Mille temples dormant sous les cerisiers. Chaque ruelle murmure des secrets de geishas et de samouraïs oubliés dans le brouillard du matin.',
    longDescription:
      "Kyoto fut la capitale impériale du Japon pendant plus de mille ans, et son âme n'a jamais vraiment changé. Ici, les traditions sont gardées avec une ferveur presque religieuse. Les geishas glissent dans les ruelles pavées de Gion comme des fantômes de soie. Les jardins de pierres zen invitent au silence absolu. Et quand les cerisiers explosent en mars, la ville entière se transforme en un tableau d'Hokusai vivant.",
    heroGradient:
      'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(109,40,217,0.6) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 70% 70%, rgba(30,27,75,0.8) 0%, transparent 60%)',
    accentColor: '#c084fc',
    secondaryColor: '#a855f7',
    shadowColor: 'rgba(192,132,252,0.4)',
    tags: ['Temples', 'Geishas', 'Jardins Zen', 'Sakura'],
    icon: '⛩️',
    bestMonths: 'Mars – Mai · Oct – Nov',
    budget: '80–150€/jour',
    language: 'Japonais',
    timezone: 'JST (UTC+9)',
    quickFacts: [
      { label: 'Population', value: '1,46M hab.' },
      { label: 'Temples & Sanctuaires', value: '+1 600' },
      { label: 'Sites UNESCO', value: '17' },
      { label: 'Altitude', value: '50m' },
    ],
    hotels: [
      {
        name: 'Hiiragiya Ryokan',
        type: 'Ryokan Traditionnel',
        priceRange: '350–600€/nuit',
        stars: 5,
        description:
          'Un ryokan fondé en 1818, fréquenté par des empereurs et des artistes. Chaque chambre est un sanctuaire de bois et de papier washi.',
        highlights: ['Bains thermaux privés', 'Kaiseki dinner', 'Jardin intérieur', 'Yukata fourni'],
        accentColor: '#c084fc',
      },
      {
        name: 'Ace Hotel Kyoto',
        type: 'Design Hotel',
        priceRange: '180–280€/nuit',
        stars: 4,
        description:
          "Une collaboration avec le studio Kengo Kuma. L'architecture dialogue entre béton brut et textiles artisanaux de Nishijin.",
        highlights: ['Rooftop bar', 'Design japonais contemporain', 'Café Ogawa', 'Emplacement central'],
        accentColor: '#818cf8',
      },
      {
        name: 'Len Kyoto Kawaramachi',
        type: 'Hostel Boutique',
        priceRange: '35–90€/nuit',
        stars: 3,
        description:
          "Hostel concept minimaliste au cœur de la ville. Espaces communs soignés, bar à sake, communauté de voyageurs curieux.",
        highlights: ['Bar à sake intégré', 'Dortoirs design', 'Communauté', 'Idéal solo/couple'],
        accentColor: '#34d399',
      },
    ],
    activities: [
      {
        name: 'Fushimi Inari à l\'Aube',
        category: 'Randonnée spirituelle',
        duration: '3–4h',
        difficulty: 'Modéré',
        description:
          "10 000 torii vermillon qui s'enfoncent dans la montagne. Arrivez à 6h pour vivre quelque chose de presque mystique.",
        bestTime: 'Aube (5h30–8h)',
        icon: '⛩️',
        accentColor: '#fb923c',
      },
      {
        name: 'Gion Machiya Walk',
        category: 'Culture & Histoire',
        duration: '2h',
        difficulty: 'Facile',
        description:
          "Déambuler dans les ruelles de Gion au crépuscule. Si vous avez de la chance, vous croiserez une maiko entre deux rendez-vous.",
        bestTime: 'Crépuscule (17h–19h)',
        icon: '🏮',
        accentColor: '#c084fc',
      },
      {
        name: 'Atelier Céramique Kiyomizu',
        category: 'Artisanat',
        duration: '2h30',
        difficulty: 'Facile',
        description:
          "Apprenez les techniques de la céramique Kiyomizuyaki avec un maître artisan. Repartez avec votre propre bol à thé.",
        bestTime: 'Matin ou après-midi',
        icon: '🏺',
        accentColor: '#38bdf8',
      },
      {
        name: 'Cérémonie du Thé',
        category: 'Expérience culturelle',
        duration: '1h30',
        difficulty: 'Facile',
        description:
          "Dans un pavillon de thé caché dans un jardin, apprenez les gestes millimétrés du chado. Un moment de pleine conscience absolu.",
        bestTime: 'Toute la journée',
        icon: '🍵',
        accentColor: '#4ade80',
      },
    ],
    reviews: [
      {
        author: 'Margaux D.',
        country: 'France',
        flag: '🇫🇷',
        rating: 5,
        date: 'Octobre 2024',
        text: "Kyoto m'a complètement transformée. J'y suis allée pour 3 jours et j'y suis restée 10. Fushimi Inari au lever du soleil est une expérience spirituelle inracontable.",
        highlight: 'Fushimi Inari à l\'aube',
      },
      {
        author: 'Thomas K.',
        country: 'Allemagne',
        flag: '🇩🇪',
        rating: 5,
        date: 'Avril 2024',
        text: 'Les cerisiers en fleur dans les jardins du Palais Impérial... Je n\'ai jamais rien vécu de tel. La foule est gérée, l\'atmosphère est magique.',
        highlight: 'Sakura Season',
      },
      {
        author: 'Sofia R.',
        country: 'Espagne',
        flag: '🇪🇸',
        rating: 4,
        date: 'Novembre 2024',
        text: "L'automne à Kyoto est peut-être encore plus beau que le printemps. Les érables rouges dans le Tofuku-ji... j'en ai encore des frissons.",
        highlight: 'Momiji Season',
      },
    ],
  },
  {
    slug: 'tokyo',
    kanji: '東京',
    name: 'Tokyo',
    subtitle: 'Lumières Infinies',
    region: 'Kantō',
    description:
      'Néons qui percent la nuit comme des katanas. Une métropole qui ne dort jamais, oscillant entre futurisme vertigineux et nostalgies cachées.',
    longDescription:
      "Tokyo est une contradiction permanente et magnifique. C'est la ville la plus peuplée du monde, et pourtant on y trouve des temples zen dans lesquels règne un silence parfait. C'est la capitale du kawaii et du manga, mais aussi d'une gastronomie d'une raffinement extrême. Ses néons illuminent Shibuya comme une aurore boréale artificielle, pendant qu'à Yanaka, le temps semble s'être arrêté en 1960.",
    heroGradient:
      'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(7,89,133,0.7) 0%, transparent 60%), radial-gradient(ellipse 50% 80% at 80% 30%, rgba(0,30,60,0.8) 0%, transparent 60%)',
    accentColor: '#38bdf8',
    secondaryColor: '#0ea5e9',
    shadowColor: 'rgba(56,189,248,0.4)',
    tags: ['Néons', 'Technologie', 'Street Food', 'Anime'],
    icon: '🏙️',
    bestMonths: 'Mars – Mai · Sept – Nov',
    budget: '100–200€/jour',
    language: 'Japonais',
    timezone: 'JST (UTC+9)',
    quickFacts: [
      { label: 'Population', value: '13,96M hab.' },
      { label: 'Arrondissements', value: '23 Special Wards' },
      { label: 'Restaurants étoilés', value: '+230 Michelin' },
      { label: 'Altitude', value: '40m' },
    ],
    hotels: [
      {
        name: 'Park Hyatt Tokyo',
        type: 'Luxury Hotel',
        priceRange: '400–800€/nuit',
        stars: 5,
        description:
          "Rendu célèbre par Lost in Translation. Au 41ème étage avec vue sur le Mont Fuji par temps clair. Le New York Bar est une icône.",
        highlights: ['Vue sur le Fuji', 'New York Bar', 'Piscine panoramique', 'Service légendaire'],
        accentColor: '#38bdf8',
      },
      {
        name: 'Trunk Hotel Shibuya',
        type: 'Lifestyle Hotel',
        priceRange: '250–400€/nuit',
        stars: 4,
        description:
          "L'hôtel le plus cool de Shibuya. Design japonais contemporain, rooftop animé, et une vision forte de l'hospitalité comme expérience sociale.",
        highlights: ['Rooftop events', 'Design Nakameguro', 'Restaurant farm-to-table', 'Bar vivant'],
        accentColor: '#fb923c',
      },
      {
        name: 'BnA Alter Museum',
        type: 'Art Hotel',
        priceRange: '120–200€/nuit',
        stars: 3,
        description:
          "Chaque chambre est une oeuvre d'art créée par un artiste différent. Dormir dans une installation artistique — l'expérience ultime.",
        highlights: ['Chambre = oeuvre d\'art', 'Artistes locaux', 'Café galerie', 'Kabukicho adjacent'],
        accentColor: '#f472b6',
      },
    ],
    activities: [
      {
        name: 'Shibuya Scramble at Night',
        category: 'Urbain',
        duration: '1h',
        difficulty: 'Facile',
        description:
          "Le croisement le plus fréquenté du monde illuminé par 3000 enseignes lumineuses. Une chorégraphie humaine hypnotique.",
        bestTime: 'Nuit (20h–23h)',
        icon: '🚦',
        accentColor: '#38bdf8',
      },
      {
        name: 'Tsukiji Outer Market',
        category: 'Gastronomie',
        duration: '2–3h',
        difficulty: 'Facile',
        description:
          "Le meilleur sushi du monde au comptoir d'un minuscule restaurant, à 7h du matin. Les thons entiers sur glace, l'effervescence des chefs.",
        bestTime: 'Tôt le matin (7h–10h)',
        icon: '🐟',
        accentColor: '#fb923c',
      },
      {
        name: 'Akihabara Deep Dive',
        category: 'Pop Culture',
        duration: '3–4h',
        difficulty: 'Facile',
        description:
          "Immersion totale dans la culture otaku. Arcades sur 8 étages, figurines rarissimes, cafés à thème. Un autre monde dans la ville.",
        bestTime: 'Après-midi (14h–19h)',
        icon: '🎮',
        accentColor: '#c084fc',
      },
      {
        name: 'Yanaka Shitamachi Walk',
        category: 'Culture & Histoire',
        duration: '2h',
        difficulty: 'Facile',
        description:
          "Le quartier qui a survécu aux bombes et aux séismes. Ruelles de l'ère Edo, boutiques artisanales, chats errants et silence inattendu.",
        bestTime: 'Matin (9h–12h)',
        icon: '🏘️',
        accentColor: '#34d399',
      },
    ],
    reviews: [
      {
        author: 'Pierre M.',
        country: 'France',
        flag: '🇫🇷',
        rating: 5,
        date: 'Septembre 2024',
        text: "Tokyo est la seule ville où je n'ai jamais voulu partir. La sécurité, la propreté, la gastronomie, l'énergie... C'est une expérience totale.",
        highlight: 'L\'expérience globale',
      },
      {
        author: 'Yuki A.',
        country: 'Australie',
        flag: '🇦🇺',
        rating: 5,
        date: 'Mars 2024',
        text: "Being Japanese-Australian, Tokyo always feels like coming home but also like landing on another planet. The sakura season 2024 was exceptional.",
        highlight: 'Shinjuku Gyoen Sakura',
      },
      {
        author: 'Carlos F.',
        country: 'Mexique',
        flag: '🇲🇽',
        rating: 4,
        date: 'Juillet 2024',
        text: "L'été est chaud et humide mais les festivals matsuri compensent largement. Voir les feux d'artifice de Sumida depuis une terrasse... inoubliable.",
        highlight: 'Sumida Fireworks',
      },
    ],
  },
  {
    slug: 'hakone',
    kanji: '箱根',
    name: 'Hakone',
    subtitle: 'Le Souffle du Fuji',
    region: 'Kantō',
    description:
      "Le Mont Fuji émerge des nuages comme un rêve. Sources thermales brûlantes, forêts de bambou et silence absolu.",
    longDescription:
      "À seulement 90 minutes de Tokyo, Hakone est la grande échappatoire. C'est ici que les Japonais viennent se ressourcer, dans des ryokans nichés dans les forêts de cèdres, à tremper dans des onsen sulfurés face au Fuji. Par temps clair — et il faut avoir de la chance — la silhouette parfaite du volcan se découpe sur un ciel d'un bleu irréel. Le lac Ashinoko reflète ses pentes neigeuses comme un miroir de nacre.",
    heroGradient:
      'radial-gradient(ellipse 70% 70% at 40% 30%, rgba(154,52,18,0.6) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 70% 70%, rgba(120,53,15,0.5) 0%, transparent 60%)',
    accentColor: '#fb923c',
    secondaryColor: '#f97316',
    shadowColor: 'rgba(251,146,60,0.4)',
    tags: ['Onsen', 'Mont Fuji', 'Nature', 'Ryokan'],
    icon: '🗻',
    bestMonths: 'Oct – Déc · Mars – Mai',
    budget: '200–500€/nuit (ryokan)',
    language: 'Japonais',
    timezone: 'JST (UTC+9)',
    quickFacts: [
      { label: 'Altitude max', value: '1 438m (Komagatake)' },
      { label: 'Distance Tokyo', value: '90 min en train' },
      { label: 'Lac Ashinoko', value: '7,8 km²' },
      { label: 'Fuji', value: '3 776m' },
    ],
    hotels: [
      {
        name: 'Gora Kadan',
        type: 'Ryokan de Luxe',
        priceRange: '600–1200€/nuit',
        stars: 5,
        description:
          "Ancienne résidence d'été de la famille impériale, transformé en ryokan d'exception. Jardins de pierres, bains d'eau thermale, kaiseki sublime.",
        highlights: ['Ancienne résidence impériale', 'Onsen privés', 'Kaiseki gastronomique', 'Jardins zen'],
        accentColor: '#fb923c',
      },
      {
        name: 'Hakone Tent',
        type: 'Guesthouse Boutique',
        priceRange: '80–150€/nuit',
        stars: 3,
        description:
          "Une guesthouse qui a redéfini l'hospitalité à Hakone. Chambres minimalistes, bains publics partagés d'eau thermale, vue sur la montagne.",
        highlights: ['Communauté de voyageurs', 'Onsen partagé', 'Vue montagne', 'Rapport qualité/prix'],
        accentColor: '#34d399',
      },
    ],
    activities: [
      {
        name: 'Croisière Lac Ashinoko',
        category: 'Nature',
        duration: '30–45min',
        difficulty: 'Facile',
        description:
          "Sur un bateau pirate (oui, vraiment), traverser le lac avec la silhouette du Fuji en arrière-plan. Par temps clair, c'est une image d'éternité.",
        bestTime: 'Matin (9h–11h, temps plus clair)',
        icon: '⛵',
        accentColor: '#38bdf8',
      },
      {
        name: 'Bain Onsen au Coucher du Soleil',
        category: 'Bien-être',
        duration: '1–2h',
        difficulty: 'Facile',
        description:
          "Glisser dans un bain d'eau sulfureuse à 40°C pendant que le soleil teint le Fuji en orange. Le temps s'arrête.",
        bestTime: 'Fin d\'après-midi (16h–18h)',
        icon: '♨️',
        accentColor: '#fb923c',
      },
      {
        name: 'Randonnée Owakudani',
        category: 'Volcanique',
        duration: '1h30',
        difficulty: 'Modéré',
        description:
          "Zone volcanique active avec des fumeroles de soufre. Le téléphérique offre des vues vertigineuses. Les œufs noirs cuits dans les sources chaudes sont de rigueur.",
        bestTime: 'Matin (8h–11h)',
        icon: '🌋',
        accentColor: '#fbbf24',
      },
    ],
    reviews: [
      {
        author: 'Isabelle T.',
        country: 'Belgique',
        flag: '🇧🇪',
        rating: 5,
        date: 'Décembre 2024',
        text: "Deux nuits au Gora Kadan en hiver. Voir le Fuji enneigé depuis mon bain privatif à 6h du matin... Je n'ai plus de mots.",
        highlight: 'Onsen privé face au Fuji',
      },
      {
        author: 'Luca B.',
        country: 'Italie',
        flag: '🇮🇹',
        rating: 5,
        date: 'Novembre 2024',
        text: "Hakone en automne avec les érables rouges et le lac... L'une des plus belles images de mon existence. Réservez vite, ça part en quelques heures.",
        highlight: 'Lac Ashinoko en automne',
      },
    ],
  },
  {
    slug: 'osaka',
    kanji: '大阪',
    name: 'Osaka',
    subtitle: "L'Art de Vivre",
    region: 'Kansai',
    description:
      "La cuisine comme religion, le rire comme philosophie. Osaka pulse d'une énergie brute et généreuse, festive jusqu'à l'aube.",
    longDescription:
      "Les Japonais ont un mot pour la philosophie d'Osaka : kuidaore — se ruiner en mangeant. C'est la ville de la joie de vivre assumée, du takoyaki dévoré debout dans la rue, du dotonbori illuminé jusqu'à 3h du matin. Plus directe et chaleureuse que Tokyo, plus populaire que Kyoto, Osaka est le Japon sans filtre. Et son château, illuminé la nuit, domine la ville comme un seigneur bienveillant.",
    heroGradient:
      'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(157,23,77,0.6) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 75% 30%, rgba(80,10,40,0.7) 0%, transparent 60%)',
    accentColor: '#f472b6',
    secondaryColor: '#ec4899',
    shadowColor: 'rgba(244,114,182,0.4)',
    tags: ['Gastronomie', 'Vie Nocturne', 'Château', 'Street Food'],
    icon: '🏯',
    bestMonths: 'Mars – Mai · Oct – Nov',
    budget: '70–130€/jour',
    language: 'Japonais (accent Kansai)',
    timezone: 'JST (UTC+9)',
    quickFacts: [
      { label: 'Population', value: '2,76M hab.' },
      { label: 'Restaurants', value: '+50 000' },
      { label: 'Distance Kyoto', value: '15 min en Shinkansen' },
      { label: 'Spécialité', value: 'Takoyaki & Okonomiyaki' },
    ],
    hotels: [
      {
        name: 'Cross Hotel Osaka',
        type: 'Design Hotel',
        priceRange: '120–200€/nuit',
        stars: 4,
        description:
          "À deux minutes de Dotonbori, design soigné et chambres avec vue sur la ville. Le rooftop bar est parmi les meilleurs de la ville.",
        highlights: ['Position Dotonbori', 'Rooftop bar', 'Design contemporain', 'Service attentionné'],
        accentColor: '#f472b6',
      },
      {
        name: 'Mitsui Garden Shinsaibashi',
        type: 'Business Hotel Premium',
        priceRange: '100–160€/nuit',
        stars: 4,
        description:
          "La chaîne Mitsui au meilleur de sa forme. Chambres spacieuses (pour Osaka), onsen sur le toit, accès direct au métro.",
        highlights: ['Onsen rooftop', 'Chambres spacieuses', 'Accès métro direct', 'Petit-déjeuner japonais'],
        accentColor: '#fb923c',
      },
    ],
    activities: [
      {
        name: 'Dotonbori Food Walk',
        category: 'Gastronomie',
        duration: '3h',
        difficulty: 'Facile',
        description:
          "Takoyaki, okonomiyaki, kushikatsu, fugu... Le long du canal illuminé, manger devient une aventure de neon et de saveurs inattendues.",
        bestTime: 'Nuit (19h–23h)',
        icon: '🐙',
        accentColor: '#f472b6',
      },
      {
        name: 'Château d\'Osaka Illuminé',
        category: 'Histoire',
        duration: '2h',
        difficulty: 'Facile',
        description:
          "De jour le château impressionne, de nuit il subjugue. Les jardins illuminés en automne sont parmi les plus beaux spectacles du Japon.",
        bestTime: 'Soirée (19h–21h)',
        icon: '🏯',
        accentColor: '#fbbf24',
      },
      {
        name: 'Kuromon Ichiba Market',
        category: 'Marché',
        duration: '1h30',
        difficulty: 'Facile',
        description:
          "Le \"garde-manger d'Osaka\". 170 échoppes de produits frais où les marchands vous font goûter tout. Oursins, fruits de mer, wagashi...",
        bestTime: 'Matin (9h–12h)',
        icon: '🦞',
        accentColor: '#34d399',
      },
    ],
    reviews: [
      {
        author: 'Emma L.',
        country: 'Royaume-Uni',
        flag: '🇬🇧',
        rating: 5,
        date: 'Octobre 2024',
        text: "Osaka est la ville où j'ai le mieux mangé de ma vie. Et j'en suis encore à rêver de ce ramen dans une ruelle de Shinsekai à minuit.",
        highlight: 'Gastronomie de rue',
      },
      {
        author: 'Romain V.',
        country: 'Suisse',
        flag: '🇨🇭',
        rating: 4,
        date: 'Juin 2024',
        text: "Osaka is Tokyo's cooler, friendlier, funnier sister. Less polished but so much more alive. Dotonbori at 2am is unforgettable.",
        highlight: 'Ambiance Dotonbori',
      },
    ],
  },
  {
    slug: 'nara',
    kanji: '奈良',
    name: 'Nara',
    subtitle: 'Les Gardiens Sacrés',
    region: 'Kansai',
    description:
      "Des cerfs sacrés errent librement entre d'immenses Bouddhas de bronze. Ici, le temps a suspendu son souffle depuis le VIIIe siècle.",
    longDescription:
      "Nara fut la première capitale permanente du Japon, et sa grandeur n'a pas disparu — elle s'est simplement transformée. Aujourd'hui, des cerfs considérés comme des messagers divins déambulent librement dans les parcs, inclinant la tête pour réclamer des crackers. Le Tōdai-ji abrite le plus grand Bouddha de bronze du monde, et la forêt de lanternes de pierre du Kasuga-taisha éclaire les nuits d'une lumière dorée et mystérieuse.",
    heroGradient:
      'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(6,78,59,0.6) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 70% 70%, rgba(2,44,34,0.7) 0%, transparent 60%)',
    accentColor: '#34d399',
    secondaryColor: '#10b981',
    shadowColor: 'rgba(52,211,153,0.4)',
    tags: ['Cerfs Sacrés', 'Bouddha', 'Forêts', 'Lanternes'],
    icon: '🦌',
    bestMonths: 'Mars – Mai · Oct – Nov',
    budget: '50–100€/jour',
    language: 'Japonais',
    timezone: 'JST (UTC+9)',
    quickFacts: [
      { label: 'Population', value: '360 000 hab.' },
      { label: 'Cerfs dans le parc', value: '+1 200' },
      { label: 'Bouddha Daibutsu', value: '14,98m de haut' },
      { label: 'Fondée en', value: '710 ap. J.-C.' },
    ],
    hotels: [
      {
        name: 'Edosan Nara',
        type: 'Ryokan & Spa',
        priceRange: '250–450€/nuit',
        stars: 5,
        description:
          "Dans le parc de Nara, avec vue sur les cerfs depuis les chambres. Architecture traditionnelle, bains de sources naturelles, silence parfait.",
        highlights: ['Vue sur le parc aux cerfs', 'Sources thermales', 'Cuisine kaiseki', 'Architecture Meiji'],
        accentColor: '#34d399',
      },
      {
        name: 'Guest House Nara Komachi',
        type: 'Guesthouse Japonaise',
        priceRange: '40–70€/nuit',
        stars: 3,
        description:
          "Petite guesthouse familiale à quelques minutes des temples. Petits-déjeuners japonais maison, conseils précieux des hôtes.",
        highlights: ['Ambiance familiale', 'Petit-déjeuner maison', 'Conseils locaux', 'Très bien situé'],
        accentColor: '#fbbf24',
      },
    ],
    activities: [
      {
        name: 'Nourrir les Cerfs Sacrés',
        category: 'Nature',
        duration: '1–2h',
        difficulty: 'Facile',
        description:
          "Acheter des shika senbei (crackers aux cerfs) et se laisser assaillir affectueusement par des cerfs qui s'inclinent pour demander leur dû.",
        bestTime: 'Toute la journée',
        icon: '🦌',
        accentColor: '#34d399',
      },
      {
        name: 'Tōdai-ji & le Grand Bouddha',
        category: 'Spirituel',
        duration: '1h30',
        difficulty: 'Facile',
        description:
          "Entrer dans le plus grand bâtiment en bois du monde pour y contempler un Bouddha de 15m. L'échelle humaine disparaît.",
        bestTime: 'Tôt le matin (8h–10h)',
        icon: '🙏',
        accentColor: '#fbbf24',
      },
      {
        name: 'Kasuga-taisha aux Lanternes',
        category: 'Spirituel & Nocturne',
        duration: '1h',
        difficulty: 'Facile',
        description:
          "3000 lanternes de pierre et de bronze illuminées lors des festivals de février et août. Une vision hors du temps.",
        bestTime: 'Festivals Mantōrō (Fév & Août)',
        icon: '🏮',
        accentColor: '#fb923c',
      },
    ],
    reviews: [
      {
        author: 'Chloé M.',
        country: 'France',
        flag: '🇫🇷',
        rating: 5,
        date: 'Novembre 2024',
        text: "Un cerf m'a regardée droit dans les yeux pendant 30 secondes dans la forêt du Kasuga. Je n'oublierai jamais ce moment. Nara est magique.",
        highlight: 'Rencontre avec les cerfs',
      },
      {
        author: 'Jan K.',
        country: 'Pologne',
        flag: '🇵🇱',
        rating: 5,
        date: 'Avril 2024',
        text: "Le Tōdai-ji au lever du soleil, pratiquement seul dans cet espace immense avec juste le Bouddha et les cerfs qui entrent par les portes ouvertes...",
        highlight: 'Tōdai-ji à l\'aube',
      },
    ],
  },
  {
    slug: 'hiroshima',
    kanji: '広島',
    name: 'Hiroshima',
    subtitle: 'Mémoire & Renaissance',
    region: 'Chūgoku',
    description:
      "Une ville qui a transformé la tragédie en espoir. Le dôme de Genbaku se reflète dans la rivière Motoyasu, monument vivant de résilience.",
    longDescription:
      "Hiroshima porte l'une des cicatrices les plus profondes de l'histoire humaine, et pourtant, marcher dans ses rues aujourd'hui, c'est rencontrer une ville d'une vitalité et d'une beauté saisissantes. Le Mémorial de la Paix est un lieu de recueillement d'une profondeur rare. Et à 20 minutes en ferry, l'île de Miyajima révèle l'un des paysages les plus photographiés du Japon : le torii rouge flottant sur la mer au coucher du soleil.",
    heroGradient:
      'radial-gradient(ellipse 70% 60% at 40% 40%, rgba(30,41,59,0.8) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 70% 70%, rgba(15,23,42,0.7) 0%, transparent 60%)',
    accentColor: '#94a3b8',
    secondaryColor: '#64748b',
    shadowColor: 'rgba(148,163,184,0.4)',
    tags: ['Paix', 'Mémoire', 'Miyajima', 'Torii'],
    icon: '🕊️',
    bestMonths: 'Avril · Nov · Mars',
    budget: '60–110€/jour',
    language: 'Japonais',
    timezone: 'JST (UTC+9)',
    quickFacts: [
      { label: 'Population', value: '1,19M hab.' },
      { label: 'Date fatidique', value: '6 août 1945' },
      { label: 'Île Miyajima', value: '30,4 km²' },
      { label: 'Torii de Miyajima', value: '16m de haut' },
    ],
    hotels: [
      {
        name: 'Sheraton Grand Hiroshima',
        type: 'Hotel de Luxe',
        priceRange: '180–300€/nuit',
        stars: 5,
        description:
          "Connecté à la gare, vue sur la ville et les collines. Service impeccable et position idéale pour explorer la ville et rejoindre Miyajima.",
        highlights: ['Connexion directe gare', 'Vue panoramique', 'Restaurant gastronomique', 'Spa'],
        accentColor: '#94a3b8',
      },
      {
        name: 'Orizuru Tower Hotel',
        type: 'Boutique Hotel',
        priceRange: '130–200€/nuit',
        stars: 4,
        description:
          "Surplombant le Parc du Mémorial de la Paix. Le matin, regarder le dôme de Genbaku depuis sa fenêtre est un moment de méditation inoubliable.",
        highlights: ['Vue sur le Mémorial', 'Architecture contemporaine', 'Restaurant toit terrasse', 'Emplacement unique'],
        accentColor: '#38bdf8',
      },
    ],
    activities: [
      {
        name: 'Musée Mémorial de la Paix',
        category: 'Histoire & Mémoire',
        duration: '2–3h',
        difficulty: 'Émotionnellement intense',
        description:
          "Un lieu de mémoire d'une honnêteté et d'une dignité rares. Prenez le temps, lisez chaque panneau, et ressortez différent.",
        bestTime: 'Matin (9h–12h, moins de monde)',
        icon: '🕊️',
        accentColor: '#94a3b8',
      },
      {
        name: 'Torii de Miyajima au Coucher du Soleil',
        category: 'Nature & Spirituel',
        duration: '4–5h (aller-retour)',
        difficulty: 'Facile',
        description:
          "Le torii flottant dans la mer au coucher du soleil. À marée basse, on peut marcher jusqu'à lui. L'une des trois vues classiques du Japon.",
        bestTime: 'Coucher de soleil (vérifier les marées)',
        icon: '⛩️',
        accentColor: '#fb923c',
      },
      {
        name: 'Okonomiyaki à la Hiroshima',
        category: 'Gastronomie',
        duration: '1h',
        difficulty: 'Facile',
        description:
          "La version Hiroshima de l'okonomiyaki est différente — des couches de pâte, chou, nouilles soba, porc et œuf. Okonomi-mura rassemble 25 restaurants sur 3 étages.",
        bestTime: 'Déjeuner ou dîner',
        icon: '🥞',
        accentColor: '#f472b6',
      },
    ],
    reviews: [
      {
        author: 'Marc D.',
        country: 'France',
        flag: '🇫🇷',
        rating: 5,
        date: 'Août 2024',
        text: "Aller à Hiroshima le 6 août pour la cérémonie de commémoration fut l'expérience la plus marquante de ma vie. La dignité et l'espoir qui émanent de cette ville sont extraordinaires.",
        highlight: 'Cérémonie du 6 août',
      },
      {
        author: 'Amelia H.',
        country: 'États-Unis',
        flag: '🇺🇸',
        rating: 5,
        date: 'Octobre 2024',
        text: "Miyajima at sunset. I cried. I don't cry. The floating torii, the deer, the mountains behind... There are places that just break you open.",
        highlight: 'Miyajima au coucher du soleil',
      },
    ],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getAllSlugs(): string[] {
  return destinations.map((d) => d.slug);
}