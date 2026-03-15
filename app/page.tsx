const PageAccueil = () => {
  const destination = ["Tokyo", "Osaka", "Kyoto" , "Hokkaido", "Okinawa", "Nara", "Hiroshima", "Fukuoka", "Sapporo", "Yokohama"];
  return (
    <main className="min-h-screen p-10 flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-5xl font-bold text-red-500 mb-6"> Bienvenue sur mon guide du Japon </h1>
      <p className="text-xl text-gray-700 mb-10"> Bienvenue sur le site qui va vous faire découvrir le pays du soleil levant </p>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800"> Destinations Incontournables :</h2>
        
        <ul className="space-y-2">
          {destination.map((ville, index ) => (
            <li key={index} className="text-lg text-blue-600 font-medium bg-blue-50 p-2 rounded">{ville}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};


export default PageAccueil;
