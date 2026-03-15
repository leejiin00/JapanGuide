import { destinationsData } from "../../../../data/destinations";
import { Star, MessageSquare } from "lucide-react";

type PageAvisProps = {
  params: Promise<{
    nom: string;
  }>;
};

const PageAvis = async ({ params }: PageAvisProps) => {
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
        Avis des voyageurs sur {villeTrouvee.nom}
      </h2>

      {villeTrouvee.avis && villeTrouvee.avis.length > 0 ? (
        
        <div className="space-y-6">
          {/* On boucle sur chaque avis */}
          {villeTrouvee.avis.map((avisItem, index) => (
            
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                
                {/* Nom de l'auteur */}
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {avisItem.auteur.charAt(0)} {/* Affiche la 1ère lettre du prénom */}
                  </div>
                  {avisItem.auteur}
                </h3>
                
                {/* LA MAGIE DES ÉTOILES */}
                <div className="flex gap-1">
                  {/* Cette ligne crée un tableau de 5 cases vides pour dessiner 5 étoiles */}
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      // Si le numéro de l'étoile est inférieur à la note, on la colorie en jaune, sinon en gris
                      className={i < avisItem.note ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>

              </div>
              
              {/* Le texte du commentaire */}
              <p className="text-gray-600 italic">"{avisItem.commentaire}"</p>
            </div>

          ))}
        </div>

      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">
            Aucun avis pour le moment. Soyez le premier à partager votre expérience !
          </p>
        </div>
      )}
    </div>
  );
};

export default PageAvis;