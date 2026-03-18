// app/admin/page.tsx — Dashboard
import { createClient } from '@/lib/supabase/server'
import { getPendingReviews } from '@/lib/supabase/queries'
import AdminDashboardClient from './AdminDashboardClient'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Stats globales
  // Cette partie là sert à exécuter plusieurs requêtes vers la base de données exactement en même temps (en parallèle) grâce à Promise.all, au lieu d'attendre que la première finisse pour lancer la deuxième.
  // J'ai fait ça pour optimiser drastiquement le temps de chargement global du tableau de bord.
  const [
    { count: destCount   },
    { count: hotelCount  },
    { count: actCount    },
    { count: reviewCount },
  ] = await Promise.all([
    // Cette partie concerne l'optimisation des requêtes SQL.
    // J'ai fait ça pour demander à Supabase de ne faire qu'un "COUNT" (grâce à head: true), ce qui renvoie juste un nombre sans télécharger tout le contenu des tables. C'est extrêmement rapide et parfait pour des statistiques !
    supabase.from('destinations').select('*', { count: 'exact', head: true }),
    supabase.from('hotels').select('*', { count: 'exact', head: true }),
    supabase.from('activities').select('*', { count: 'exact', head: true }),
    supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('approved', false),
  ])

  // Cette partie là sert à récupérer les données complètes (texte, auteur, destination, etc.) uniquement pour les avis qui ont besoin d'être modérés, en utilisant une requête que tu as intelligemment isolée dans un autre fichier.
  const pendingReviews = await getPendingReviews()

  // Cette partie concerne l'assemblage final et le rendu.
  // J'ai fait ça pour construire un objet "stats" propre (avec des valeurs par défaut à 0 grâce à "??" si jamais la base de données renvoie null) et l'envoyer au composant front-end qui gère l'interactivité.
  return (
    <AdminDashboardClient
      stats={{
        destinations: destCount ?? 0,
        hotels: hotelCount ?? 0,
        activities: actCount ?? 0,
        pendingReviews: reviewCount ?? 0,
      }}
      pendingReviews={pendingReviews}
    />
  )
}