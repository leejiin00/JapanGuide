// app/destination/[nom]/hotels/page.tsx — Server Component

// Cette partie concerne la gestion du routage et des erreurs côté serveur.
import { notFound } from 'next/navigation'
import { getDestinationBySlug } from '@/lib/supabase/queries'
import Hotelsclient from './Hotelsclient'

// Cette partie là sert à définir la structure de nos paramètres d'URL (les "props").
// Le dossier s'appelant "[nom]", Next.js va nous passer ce paramètre sous la forme d'une promesse.
interface Props { params: Promise<{ nom: string }> }

export default async function HotelsPage({ params }: Props) {
  // J'ai fait ça pour extraire le fameux "nom" (slug) de l'URL de manière asynchrone. C'est la nouvelle norme en Next.js pour éviter les avertissements dans la console.
  const { nom } = await params
  
  // Cette partie là sert à aller chercher toutes les informations de la destination, y compris sa liste d'hôtels, directement dans la base de données.
  const dest    = await getDestinationBySlug(nom)
  
  // J'ai fait ça pour sécuriser l'application : si la requête ne trouve aucune destination avec ce nom-là, on stoppe tout et on affiche la page 404 par défaut.
  if (!dest) notFound()
  
  // Cette partie concerne le passage de flambeau au front-end. 
  // On envoie les données formatées et sécurisées au Client Component qui va s'occuper de générer les onglets et les animations qu'on a vus tout à l'heure.
  return <Hotelsclient dest={dest} />
}