import { destinationsData } from "../../../../data/destinations";

type PageHotelsProps = {
  params: Promise<{
    nom: string;
  }>;
};

const PageHotels = async ({ params }: PageHotelsProps) => {
  // 1. On lit l'URL en attendant la promesse (comme sur la page principale)
  const parametresResolus = await params;
  const nomDeLaVilleDansLUrl = parametresResolus.nom.toLowerCase();

  // 2. On cherche la bonne ville dans notre base de données
  const villeTrouvee = destinationsData.find(
    (destination) => destination.id === nomDeLaVilleDansLUrl
  );

  // 3. Si la ville n'existe pas
  if (!villeTrouvee) {
    return <div className="p-10 text-center text-red-500">Ville introuvable.</div>;
  }

  // 4. On affiche les hôtels
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-red-600 pl-4">
        Où dormir à {villeTrouvee.nom} ?
      </h2>

      {villeTrouvee.hotels && villeTrouvee.hotels.length > 0 ? (
        
        <div className="flex flex-col gap-4">
          {villeTrouvee.hotels.map((hotel, index) => (
            
            // Nouveau design horizontal
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:-translate-y-1 hover:shadow-md transition-all">
              
              {/* La petite image */}
              <img 
                src={hotel.image} 
                alt={hotel.nom} 
                className="w-full sm:w-32 h-40 sm:h-32 rounded-lg object-cover shadow-sm shrink-0" 
              />
              
              {/* Le texte à droite */}
              <div className="flex-1 w-full flex flex-col h-full py-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.nom}</h3>
                <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium w-max mb-4">
                  {hotel.type}
                </span>
                
                <div className="mt-auto flex justify-end w-full border-t border-gray-100 pt-3">
                  <span className="text-red-600 font-bold text-xl">
                    {hotel.prix} <span className="text-sm text-gray-500 font-normal">/ nuit</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      ) : (
        // ... (message si pas d'hôtels)
        <p className="text-gray-500 italic bg-white p-6 rounded-lg shadow-sm">
          Nous n'avons pas encore de recommandations d'hôtels pour cette ville.
        </p>
      )}
    </div>
  );
};

export default PageHotels;