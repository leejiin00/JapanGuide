// app/admin/avis/page.tsx — Server Component
// Cette partie concerne l'architecture moderne de Next.js. 
// J'ai fait ça pour séparer la récupération de données sécurisée (qui reste sur le serveur) de l'interactivité (qui part sur le navigateur avec AdminAvisClient). C'est le pattern idéal de Next.js !

import { createAdminClient } from '@/lib/supabase/server'
import AdminAvisClient from './AdminAvisClient'

// Cette partie concerne le contrat de données (Typage). 
// On duplique l'interface ici pour s'assurer que les données que le serveur extrait de la base correspondent exactement à ce que le front-end attend en entrée.
interface Review {
  id:           string
  author:       string
  country:      string
  flag:         string
  rating:       number
  body:         string
  highlight:    string
  review_date:  string
  approved:     boolean
  created_at:   string
  destinations: { name: string; slug: string; accent_color: string } | null
}

export default async function AdminAvisPage() {
  // Cette partie là sert à initialiser une connexion Supabase avec des privilèges élevés (Admin).
  // J'ai fait ça pour être sûr que l'interface d'administration puisse lire absolument TOUS les avis, y compris ceux qui sont "en attente" (approved: false), en contournant les éventuelles restrictions de sécurité (RLS) appliquées aux utilisateurs normaux.
  const supabase = createAdminClient()

  // Cette partie là sert à requêter la base de données, l'équivalent parfait d'une requête SQL "SELECT ... JOIN".
  // J'ai fait ça pour récupérer les champs précis de la table "reviews", tout en faisant une jointure (destinations(...)) pour récupérer le nom, le slug et la couleur de la destination associée à chaque avis, le tout trié du plus récent au plus ancien.
  const { data: reviews } = await supabase
    .from('reviews')
    .select('id, author, country, flag, rating, body, highlight, review_date, approved, created_at, destinations(name, slug, accent_color)')
    .order('created_at', { ascending: false })

  // Cette partie concerne le passage de relais entre le serveur et le client.
  // J'ai fait ça pour injecter le tableau de résultats (casté de manière sécurisée ou fallback sur un tableau vide) en tant que "props" (propriétés) dans le composant d'interface qu'on a vu précédemment.
  return <AdminAvisClient reviews={(reviews as Review[]) ?? []} />
}