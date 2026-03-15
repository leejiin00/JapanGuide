const PageAPropos = () => {
  return (
    <main className="min-h-screen p-10 flex flex-col items-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">À propos de l'auteur 🏯</h1>
        <p className="text-lg text-gray-700 mb-4">
          Bonjour ! Je suis un passionné du Japon et j'apprends actuellement à développer avec Next.js et React.
        </p>
        <p className="text-lg text-gray-700">
          Ce guide de voyage est mon premier projet concret. J'espère qu'il vous donnera envie de visiter ce pays magnifique !
        </p>
      </div>
    </main>
  );
};

export default PageAPropos;