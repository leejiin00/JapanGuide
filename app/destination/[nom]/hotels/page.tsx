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

      {/* On vérifie s'il y a des hôtels dans notre base de données pour cette ville */}
      {villeTrouvee.hotels && villeTrouvee.hotels.length > 0 ? (
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* On utilise .map() pour afficher chaque hôtel */}
          {villeTrouvee.hotels.map((hotel, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg">
              <img src={hotel.image} alt={hotel.nom} className="w-full h-48 object-cover" />
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.nom}</h3>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                    {hotel.type}
                  </span>
                  <span className="text-red-600 font-bold text-lg">
                    {hotel.prix} <span className="text-sm text-gray-500 font-normal">/ nuit</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      ) : (
        <p className="text-gray-500 italic bg-white p-6 rounded-lg shadow-sm">
          Nous n'avons pas encore de recommandations d'hôtels pour cette ville. Revenez plus tard !
        </p>
      )}
    </div>
  );
};

export default PageHotels;