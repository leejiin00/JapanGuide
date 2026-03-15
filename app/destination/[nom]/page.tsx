// 1. On précise que params est maintenant une "Promise" (une promesse)
type PageDestinationProps = {
  params: Promise<{
    nom: string;
  }>;
};

// 2. On ajoute "async" devant notre composant pour l'autoriser à patienter
const PageDestination = async ({ params }: PageDestinationProps) => {
  
  // 3. On ajoute "await" pour dire : "Attends d'avoir lu l'URL avant de continuer"
  const parametresResolus = await params;
  const nomDeLaVille = parametresResolus.nom;

  return (
    <main className="min-h-screen p-10 flex flex-col items-center justify-center bg-slate-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl text-center border-t-4 border-red-600">
        
        <h1 className="text-5xl font-bold text-red-600 mb-6 capitalize">
          Découvrir {nomDeLaVille} 🎌
        </h1>
        
        <p className="text-xl text-gray-700">
          Bienvenue sur la page dédiée à <span className="font-bold capitalize">{nomDeLaVille}</span>. 
          C'est ici que nous mettrons bientôt toutes les informations détaillées, les meilleurs restaurants et les lieux à visiter !
        </p>
        
      </div>
    </main>
  );
};

export default PageDestination;