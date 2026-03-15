// 1. On importe notre base de données
import { destinationsData } from "../../../data/destinations";

type PageDestinationProps = {
  params: Promise<{
    nom: string;
  }>;
};

const PageDestination = async ({ params }: PageDestinationProps) => {
  const parametresResolus = await params;
  const nomDeLaVilleDansLUrl = parametresResolus.nom.toLowerCase();

  // 2. On cherche la ville dont l'ID correspond au mot dans l'URL
  const villeTrouvee = destinationsData.find(
    (destination) => destination.id === nomDeLaVilleDansLUrl
  );

  // 3. Sécurité : Si quelqu'un tape /destination/paris, on affiche une erreur
  if (!villeTrouvee) {
    return (
      <main className="min-h-screen p-10 flex justify-center bg-slate-50">
        <h1 className="text-3xl text-red-600 font-bold mt-20">Oups ! Cette ville n'est pas dans notre guide.</h1>
      </main>
    );
  }

  // 4. Si on a trouvé la ville, on affiche ses VRAIES informations !
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Une grande image d'en-tête */}
      <div className="w-full h-64 md:h-96 relative">
        <img 
          src={villeTrouvee.image} 
          alt={`Paysage de ${villeTrouvee.nom}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-widest uppercase shadow-lg">
            {villeTrouvee.nom}
          </h1>
        </div>
      </div>

      {/* Le contenu détaillé */}
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 mt-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-red-500 pb-2 inline-block">
          À propos de {villeTrouvee.nom}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {villeTrouvee.contenuDetaille}
        </p>
      </div>
    </main>
  );
};

export default PageDestination;