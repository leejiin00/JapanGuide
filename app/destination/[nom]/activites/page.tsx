import { destinationsData } from "../../../../data/destinations";
import { Clock, Tag, Camera } from "lucide-react";

type PageActivitesProps = {
  params: Promise<{
    nom: string;
  }>;
};

const PageActivites = async ({ params }: PageActivitesProps) => {
  const parametresResolus = await params;
  const nomDeLaVilleDansLUrl = parametresResolus.nom.toLowerCase();

  const villeTrouvee = destinationsData.find(
    (destination) => destination.id === nomDeLaVilleDansLUrl
  );

  if (!villeTrouvee) {
    return <div className="p-10 text-center text-red-500">Ville introuvable.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-red-600 pl-4">
        Que faire à {villeTrouvee.nom} ?
      </h2>

      {villeTrouvee.activites && villeTrouvee.activites.length > 0 ? (
        
        <div className="flex flex-col gap-4">
          {villeTrouvee.activites.map((activite, index) => (
            
            // Nouveau design : flexbox horizontal
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6 hover:-translate-y-1 hover:shadow-md transition-all">
              
              {/* La petite image (Vignette) */}
              <img 
                src={activite.image} 
                alt={activite.titre} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover shadow-sm shrink-0" 
              />
              
              {/* Le texte à droite */}
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{activite.titre}</h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag size={16} className="text-red-500" />
                    <span className="font-medium text-sm">{activite.categorie}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-blue-500" />
                    <span className="text-sm">Durée : {activite.duree}</span>
                  </div>
                </div>
              </div>

            </div>

          ))}
        </div>

      ) : (
        // ... (le reste du code avec le message "Nous préparons actuellement...")
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <Camera size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">Nous préparons actuellement la liste des meilleures activités.</p>
        </div>
      )}
    </div>
  );
};

export default PageActivites;