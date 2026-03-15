import DestinationCard from "../components/DestinationCard";
import Link from "next/link";
import { destinationsData } from "../data/destinations";

const PageAccueil = () => {
    return (
    <main className="min-h-screen p-10 flex flex-col items-center justify-center bg-slate-50">
      {/*En-tête*/}
      <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-6 text-center"> 
        Bienvenue sur mon guide du Japon 
      </h1>
      <p className="text-xl text-gray-700 mb-12 text-center max-w-2xl">
        Bienvenue sur le site qui va vous faire découvrir le pays du soleil levant
      </p>

      {/*Lien vers la page "À propos"*/}
      <Link 
        href="/a-propos" 
        className="mt-4 mb-12 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
      >
        En savoir plus sur l'auteur
      </Link>

        
      {/*Conteneur principal*/}
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-red-200 pb-2 inline-block">
          Destinations Incontournables :
        </h2>

        {/*Grid des cartes de destination*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
