type PageDestinationProps = {
    params: {
        nom : string;
    }
};

const PageDestination = ({params}: PageDestinationProps) => {
    const nomDeLaVille = params.nom;

    return (
        <main className="min-h-screen p-10 flex flex-col items-center bg-slate-50">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl text-center">

                <h1 className="text-4xl font-bold text-red-600 mb-6 capitalize">
                    Découvrir {nomDeLaVille}
                </h1>

                <p className="text-xl  text-gray-700">
                    Bienvenue sur la page dédiée à {nomDeLaVille}. 
                    C'est ici que nous mettrons bientôt toutes les informations détaillées, les meilleurs restaurants et les lieux à visiter !
                </p>

            </div>
        </main>
    );
};

export default PageDestination;
