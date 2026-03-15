import DestinationCard from "../components/DestinationCard";

const PageAccueil = () => {
  const destinations = [
    { nom: "Tokyo", description: "La mégalopole ultra-moderne.", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80" },
    { nom: "Kyoto", description: "Le cœur historique du Japon.", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80" },
    { nom: "Osaka", description: "Capitale de la gastronomie.", image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=500&q=80" },
    { nom: "Nara", description: "La ville aux cerfs sacrés.", image: "https://images.unsplash.com/photo-1590250024462-811c7590d970?w=500&q=80" },
    { nom: "Hiroshima", description: "Ville de paix et d'histoire.", image: "https://images.unsplash.com/photo-1512217625805-4c07929f12d5?w=500&q=80" },
    { nom: "Hakone", description: "Sources chaudes et vue sur le mont Fuji.", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=500&q=80" }
  ];
    return (
    <main className="min-h-screen p-10 flex flex-col items-center justify-center bg-slate-50">
      {/*En-tête*/}
      <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-6 text-center"> 
        Bienvenue sur mon guide du Japon 
      </h1>
      <p className="text-xl text-gray-700 mb-12 text-center max-w-2xl">
        Bienvenue sur le site qui va vous faire découvrir le pays du soleil levant
      </p>

      {/*Conteneur principal*/}
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-red-200 pb-2 inline-block">
          Destinations Incontournables :
        </h2>

        {/*Grid des cartes de destination*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {destinations.map((ville, index) => (
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
