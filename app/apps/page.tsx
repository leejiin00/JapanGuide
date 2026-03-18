// app/apps/page.tsx — Server Component

import { getAppsGrouped } from '@/lib/supabase/queries'
import AppsPageClient from './AppsPageClient'

// Cette partie là sert à configurer le cache (ISR - Incremental Static Regeneration) de Next.js. 
// J'ai fait ça pour dire au serveur de garder le résultat de cette page en mémoire pendant 1 heure (3600 secondes). Pendant cette heure, tous les visiteurs recevront la page instantanément sans que ton serveur n'aille interroger la base de données Supabase. Ça soulage énormément ton back-end !
export const revalidate = 3600

// Cette partie concerne le SEO (référencement naturel). 
// J'ai fait ça pour définir proprement les balises <title> et <meta name="description"> qui s'afficheront dans les résultats Google et quand le lien sera partagé sur les réseaux sociaux. C'est un énorme avantage des Server Components.
export const metadata = {
  title:       'Applications — Nihon Guide',
  description: 'Les meilleures applications à télécharger avant de partir au Japon : transport, traduction, paiement, nourriture et culture.',
}

export default async function AppsPage() {
  // Cette partie là sert à exécuter la requête en base de données de manière sécurisée et cachée sur le serveur.
  const appsByCategory = await getAppsGrouped()
  
  // J'ai fait ça pour passer les données fraîchement (ou depuis le cache) récupérées directement au composant visuel (Client Component) qui va se charger de toute l'interactivité (les filtres, les animations, etc.).
  return <AppsPageClient appsByCategory={appsByCategory} />
}