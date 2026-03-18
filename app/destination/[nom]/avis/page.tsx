// app/destination/[nom]/avis/page.tsx — Server Component
// Cette partie là sert à importer la fonction d'erreur 404 de Next.js et nos requêtes personnalisées vers Supabase.
import { notFound } from 'next/navigation'
import { getDestinationMeta, getApprovedReviews } from '@/lib/supabase/queries'
import Avisclient from './Avisclient'

// Cette partie concerne le typage attendu pour une page dynamique dans Next.js.
// Le dossier s'appelle "[nom]", donc on précise à TypeScript qu'on va recevoir ce "nom" dans les paramètres (sous forme de promesse).
interface Props { params: Promise<{ nom: string }> }

export default async function AvisPage({ params }: Props) {
  // J'ai fait ça pour extraire le nom de la destination depuis l'URL (par exemple "tokyo" dans /destination/tokyo/avis) de manière asynchrone.
  const { nom } = await params
  
  // Cette partie là sert à chercher les métadonnées de la destination (le nom réel, les couleurs de thème, l'ID) pour configurer l'affichage.
  const dest    = await getDestinationMeta(nom)
  
  // J'ai fait ça pour protéger la page : si un petit malin tape une destination qui n'existe pas dans l'URL, on le redirige instantanément vers une page 404 Not Found.
  if (!dest) notFound()

  // Cette partie concerne la sécurité et la récupération de données.
  // J'ai fait ça pour m'assurer qu'on ne récupère que les avis qui ont été préalablement validés (approved = true) depuis le fameux Dashboard Admin qu'on a codé plus tôt !
  const reviews = await getApprovedReviews(dest.id)
  
  // Cette partie là sert à injecter nos données sécurisées et prêtes à l'emploi dans le Client Component (qui contient tout le code visuel et interactif qu'on a examiné au fichier précédent).
  return <Avisclient dest={dest} reviews={reviews} />
}