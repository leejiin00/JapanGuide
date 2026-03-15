import Link from "next/link";
// On importe 4 belles icônes pour notre sous-menu
import { Map, Bed, Camera, MessageSquare } from "lucide-react";

export default async function DestinationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ nom: string }>;
}) {
  const parametresResolus = await params;
  const villeUrl = parametresResolus.nom.toLowerCase();

  return (
    <div className="w-full">
      {/* Notre nouveau Sous-Menu */}
      <div className="bg-white border-b sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 flex justify-between md:justify-start md:gap-8 overflow-x-auto">
          
          <Link href={`/destination/${villeUrl}`} className="flex items-center gap-2 py-4 text-gray-600 hover:text-red-600 font-medium whitespace-nowrap border-b-2 border-transparent hover:border-red-600 transition-all">
            <Map size={18} /> Vue d'ensemble
          </Link>
          
          <Link href={`/destination/${villeUrl}/hotels`} className="flex items-center gap-2 py-4 text-gray-600 hover:text-red-600 font-medium whitespace-nowrap border-b-2 border-transparent hover:border-red-600 transition-all">
            <Bed size={18} /> Hôtels
          </Link>
          
          <Link href={`/destination/${villeUrl}/activites`} className="flex items-center gap-2 py-4 text-gray-600 hover:text-red-600 font-medium whitespace-nowrap border-b-2 border-transparent hover:border-red-600 transition-all">
            <Camera size={18} /> Activités
          </Link>
          
          <Link href={`/destination/${villeUrl}/avis`} className="flex items-center gap-2 py-4 text-gray-600 hover:text-red-600 font-medium whitespace-nowrap border-b-2 border-transparent hover:border-red-600 transition-all">
            <MessageSquare size={18} /> Avis
          </Link>

        </div>
      </div>

      {/* C'est ici que s'afficheront les pages (Vue d'ensemble, Hôtels, etc.) */}
      <div>
        {children}
      </div>
    </div>
  );
}