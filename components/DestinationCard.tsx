type DestinationCardProps = {
  nom: string;
  description: string;
  image: string;
};

const DestinationCard = ({nom, description, image}: DestinationCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <img 
                src={image}
                alt={`Photo de ${nom}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {nom}
                </h3>
                <p className="text-gray-600 text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
};
export default DestinationCard;