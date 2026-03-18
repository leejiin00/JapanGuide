// app/destination/[nom]/activites/page.tsx — Server Component
// Cette partie là sert à importer la fonction utilitaire de Next.js pour déclencher une page d'erreur 404 automatique.
import { notFound } from 'next/navigation'
import { getDestinationBySlug } from '@/lib/supabase/queries'
import Activitesclient from './Activitesclient'

// Cette partie concerne le typage des paramètres de l'URL.
// Le nom du dossier parent est "[nom]", donc on s'attend à recevoir une variable "nom" dans les paramètres.
interface Props { params: Promise<{ nom: string }> }

export default async function ActivitesPage({ params }: Props) {
  // J'ai fait ça pour extraire le paramètre "nom" de l'URL de manière asynchrone (Next.js demande désormais que les params soient traités comme des Promises dans les versions récentes).
  const { nom } = await params
  
  // Cette partie là sert à interroger la base de données via ton fichier de requêtes séparé, en utilisant le nom (slug) récupéré dans l'URL.
  const dest    = await getDestinationBySlug(nom)
  
  // J'ai fait ça pour empêcher le code de crasher si un utilisateur tape une URL au hasard comme "/destination/nimportequoi/activites". S'il n'y a pas de destination trouvée, on l'éjecte vers la page 404 Not Found.
  if (!dest) notFound()
  
  // Cette partie concerne l'affichage : une fois qu'on est sûr que la destination existe, on l'envoie au Client Component qu'on a vu précédemment.
  return <Activitesclient dest={dest} />
}