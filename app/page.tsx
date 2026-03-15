import DestinationCard from "../components/DestinationCard";
import { destinationsData } from "../data/destinations";

const PageAccueil = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* 1. LE HERO SECTION (En-tête immersif) */}
      <div className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        {/* L'image de fond (Le Mont Fuji) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-[10s]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1920&q=80')" }}
        ></div>
        
        {/* Le filtre sombre pour lire le texte (Overlay) */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Le texte central */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            Découvrez le <span className="text-red-500">Japon</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-2xl font-light drop-shadow-md leading-relaxed">
            Votre guide de voyage ultime pour explorer le pays du soleil levant, de l'ultra-moderne Tokyo à la traditionnelle Kyoto.
          </p>
        </div>
      </div>

      {/* 2. LA SECTION DES DESTINATIONS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
             Destinations Incontournables
           </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinationsData.map((ville, index) => (
            <DestinationCard 
              key={index}
              nom={ville.nom}
              description={ville.description}
              image={ville.image}
            />
          ))}
        </div>
      </div>

    </main>
  );
};

export default PageAccueil;