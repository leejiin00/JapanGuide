import Link from "next/link";

type DestinationCardProps = {
  nom: string;
  description: string;
  image: string;
};

const DestinationCard = ({ nom, description, image }: DestinationCardProps) => {
  return (
    <Link href={`/destination/${nom.toLowerCase()}`} className="group block h-full">
      {/* "group" permet d'animer l'image quand on survole n'importe où sur la carte */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100/50">
        
        {/* Conteneur de l'image avec overflow hidden pour l'effet zoom */}
        <div className="relative w-full h-64 overflow-hidden">
          <img 
            src={image} 
            alt={`Photo de ${nom}`} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          {/* Petit badge sur l'image */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
            Populaire
          </div>
        </div>
        
        {/* Zone de texte plus épurée */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
            {nom}
          </h3>
          <p className="text-gray-500 text-base leading-relaxed">
            {description}
          </p>
          
          {/* Faux bouton "Découvrir" en bas de carte */}
          <div className="mt-auto pt-6 flex items-center text-red-600 font-semibold text-sm">
            Découvrir la ville 
            <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default DestinationCard;