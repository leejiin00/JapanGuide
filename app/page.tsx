import { getDestinations } from '@/lib/supabase/queries'
import HomeClient from './HomeClient'

// Cette partie là sert à configurer le cache de la page d'accueil (ISR - Incremental Static Regeneration).
// J'ai fait ça pour dire au serveur Next.js de garder le résultat complet de cette page en mémoire pendant 3600 secondes (1 heure). Ainsi, même si 10 000 personnes visitent le site, ton serveur Supabase ne sera interrogé qu'une seule fois par heure ! C'est ultra optimisé.
export const revalidate = 3600

// Cette partie concerne le référencement naturel (SEO) de ta page racine.
// J'ai fait ça pour définir le titre de l'onglet et la description spécifique qui apparaîtront dans les résultats des moteurs de recherche comme Google.
export const metadata = {
  title:       'Nihon Guide — Guide de Voyage au Japon',
  description: 'Découvrez le Japon comme jamais : Kyoto, Tokyo, Hakone, Osaka, Nara, Hiroshima.',
}

export default async function HomePage() {
  // Cette partie là sert à interroger la base de données Supabase de manière totalement sécurisée, cachée sur le serveur.
  const destinations = await getDestinations()
  
  // J'ai fait ça pour transmettre la liste des destinations récupérées au composant client (HomeClient) qui s'occupera de toute la magie visuelle : les animations complexes, le Torii en parallaxe et les Kanjis flottants qu'on a vus au fichier précédent.
  return <HomeClient destinations={destinations} />
}