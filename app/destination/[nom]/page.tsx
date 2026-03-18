// app/destination/[nom]/page.tsx — Server Component
// Cette partie concerne les imports natifs de Next.js et de notre logique métier (les requêtes Supabase).
import { notFound } from 'next/navigation'
import { getDestinationBySlug } from '@/lib/supabase/queries'
import Destinationoverviewclient from './Destinationoverviewclient'

// Cette partie là sert à typer les paramètres de notre route dynamique.
interface Props { params: Promise<{ nom: string }> }

export default async function DestinationPage({ params }: Props) {
  // J'ai fait ça pour respecter la nouvelle convention de Next.js (depuis la version 15) qui demande d'attendre (await) la résolution des paramètres de l'URL.
  const { nom } = await params
  
  // Cette partie concerne la récupération des données.
  // J'ai fait ça pour interroger la base de données et récupérer toutes les informations nécessaires à la page d'aperçu de la destination.
  const dest    = await getDestinationBySlug(nom)
  
  // J'ai fait ça pour protéger la page : si le nom dans l'URL ne correspond à aucune destination dans la base de données, on affiche une page d'erreur 404 au lieu de faire planter l'application.
  if (!dest) notFound()
  
  // Cette partie là sert à faire le rendu final en injectant les données de la destination dans le composant client qui gère l'interface visuelle.
  return <Destinationoverviewclient dest={dest} />
}