const PageAccueil = () => {
  const destination = [
    {
      nom : "Tokyo",
      description : "La capitale du Japon, une métropole dynamique mêlant modernité et tradition.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80"
    },
    {
      nom : "Kyoto",
      description : "Ancienne capitale du Japon, célèbre pour ses temples, jardins et traditions culturelles.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80"
    },
    {
      nom : "Osaka",
      description : "Une ville animée connue pour sa cuisine de rue, son château et sa vie nocturne.",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&q=80"
    },
    {
      nom : "Hiroshima",
      description : "Ville historique marquée par les événements de la Seconde Guerre mondiale, avec des sites commémoratifs importants.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80"
    },
    {
      nom : "Nara",
      description : "Ancienne capitale du Japon, célèbre pour ses temples, ses cerfs en liberté et son patrimoine culturel.",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&q=80"
    }
  ]
    return (
    <main className="min-h-screen p-10 flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-5xl font-bold text-red-500 mb-6"> Bienvenue sur mon guide du Japon </h1>
      <p className="text-xl text-gray-700 mb-10"> Bienvenue sur le site qui va vous faire découvrir le pays du soleil levant </p>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800"> Destinations Incontournables :</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {destination.map((ville, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <img 
                  src={ville.image}
                  alt={"`Photo de ${ville.nom}`"}
                  className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {ville.nom}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {ville.description}
                    </p>
                  </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};


export default PageAccueil;
