// app/destinations/page.tsx — Server Component

// Cette partie concerne les imports de notre logique de base de données et du composant d'interface interactif.
import { getDestinations } from '@/lib/supabase/queries'
import DestinationsPageClient from './DestinationsPageClient'

// Cette partie là sert à définir la durée de vie du cache côté serveur (ISR - Incremental Static Regeneration).
// J'ai fait ça pour indiquer à Next.js de conserver une version statique de cette page pendant une heure (3600 secondes). Ça permet de servir la page instantanément à des milliers d'utilisateurs sans jamais solliciter ta base de données, sauf une fois par heure pour rafraîchir les données.
export const revalidate = 3600

// Cette partie concerne le référencement naturel (SEO).
// J'ai fait ça pour personnaliser le titre de l'onglet du navigateur et la balise meta description. C'est crucial pour que ta page ressorte bien sur Google avec un texte d'accroche pertinent.
export const metadata = {
  title:       'Destinations — Nihon Guide',
  description: 'Explorez toutes nos destinations au Japon : Kyoto, Tokyo, Hakone, Osaka, Nara, Hiroshima.',
}

export default async function DestinationsPage() {
  // Cette partie là sert à aller chercher la liste complète de tes destinations avec leurs statistiques (nombre d'hôtels, etc.) directement depuis le serveur, de manière sécurisée et rapide.
  const destinations = await getDestinations()
  
  // J'ai fait ça pour injecter ces données toutes propres dans notre "DestinationsPageClient", qui va s'occuper d'afficher la barre de recherche, les filtres par région et les animations.
  return <DestinationsPageClient destinations={destinations} />
}