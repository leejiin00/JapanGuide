export const destinationsData = [
  {
    id: "tokyo",
    nom: "Tokyo",
    description: "La mégalopole ultra-moderne.",
    contenuDetaille: "Tokyo est une ville fascinante où les gratte-ciel futuristes côtoient les temples anciens. Ne manquez pas le carrefour de Shibuya, le temple Senso-ji et le quartier électronique d'Akihabara.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80",
    
    //Les hôtels
    hotels: [
      { nom: "Shinjuku Granbell Hotel", prix: "120€", type: "Moderne", image: "https://images.unsplash.com/photo-1551882547-ff40eb0d13c0?w=500&q=80" },
      { nom: "Nine Hours Capsule", prix: "40€", type: "Capsule", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&q=80" }
    ],
    
    //Les activités
   activites: [
      { 
        titre: "Visite du Senso-ji", 
        categorie: "Culture", 
        duree: "2h",
        image: "https://images.unsplash.com/photo-1532236204992-f5e85c024202?w=300&q=80"
      },
      { 
        titre: "Mario Kart dans les rues", 
        categorie: "Fun", 
        duree: "1h30",
        image: "https://images.unsplash.com/photo-1542051841857-4190651f600c?w=300&q=80"
      },
      { 
        titre: "Dégustation au marché", 
        categorie: "Gastronomie", 
        duree: "3h",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&q=80"
      }
    ],
    
    //Les faux avis
    avis: [
      { auteur: "Sophie L.", note: 5, commentaire: "Une ville incroyable, propre et sécurisée. Le choc culturel est total !" },
      { auteur: "Marc D.", note: 4, commentaire: "Génial, mais attention au monde dans les transports aux heures de pointe." },
      { auteur: "Julie & Tom", note: 5, commentaire: "La nourriture est exceptionnelle. Le meilleur voyage de notre vie." }
    ]
  },
  {
    id: "kyoto",
    nom: "Kyoto",
    description: "Le cœur historique du Japon.",
    contenuDetaille: "Ancienne capitale impériale, Kyoto regorge de sanctuaires shinto, de temples bouddhistes et de sublimes jardins zen. Le Pavillon d'Or (Kinkaku-ji) est un incontournable.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80",
    hotels: [], activites: [], avis: [] // On les laisse vides pour l'instant
  },
  {
    id: "osaka",
    nom: "Osaka",
    description: "Capitale de la gastronomie.",
    contenuDetaille: "Réputée pour sa street-food et son ambiance chaleureuse, Osaka est une ville dynamique. Le quartier de Dotonbori s'illumine de mille feux à la nuit tombée.",
    image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=500&q=80",
    hotels: [], activites: [], avis: [] // On les laisse vides pour l'instant
  }

];