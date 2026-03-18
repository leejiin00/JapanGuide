// lib/queries.ts
import { createClient } from '@/lib/supabase/server'
import type {
  DestinationFull,
  DestinationWithStats,
  ReviewInsert,
  ReviewRow,
  AppWithStats,
  AppFull,
  AppCategory,
} from '@/types/database'

// ─── Destinations ─────────────────────────────────────────────

export async function getDestinations(): Promise<DestinationWithStats[]> {
  // Cette partie concerne l'initialisation du client de base de données.
  // Tu importes dynamiquement le client "Admin" (qui utilise probablement la Service Role Key de Supabase, ignorant les règles de sécurité RLS).
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  // J'ai fait ça pour utiliser une vue SQL ('destinations_with_stats') plutôt que la table de base. C'est une excellente pratique pour éviter de faire des "COUNT" lourds côté serveur Node.js.
  const { data, error } = await supabase
    .from('destinations_with_stats')
    .select('*')
    .order('name')

  if (error) {
    console.error('[getDestinations]', error.message)
    return []
  }

  return (data ?? []) as DestinationWithStats[]
}

export async function getDestinationBySlug(slug: string): Promise<DestinationFull | null> {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('destinations')
    // Cette partie concerne une jointure profonde (Deep Join).
    // J'ai fait ça pour récupérer en une seule requête réseau la destination ET tous ses hôtels, activités et avis. C'est ultra-performant.
    .select(`
      *,
      hotels ( * ),
      activities ( * ),
      reviews ( * )
    `)
    .eq('slug', slug)
    .eq('published', true)
    // C'est très malin d'utiliser "referencedTable" pour trier les données des tables enfants (les hôtels et activités) directement depuis la requête SQL parente !
    .order('sort_order', { referencedTable: 'hotels',     ascending: true })
    .order('sort_order', { referencedTable: 'activities', ascending: true })
    .order('created_at', { referencedTable: 'reviews',    ascending: false })
    .eq('reviews.approved', true) // On filtre les enfants : uniquement les avis approuvés.
    .single() // On exige un seul résultat.

  if (error) {
    // J'ai fait ça car l'erreur "PGRST116" signifie "0 ligne retournée par .single()". Ce n'est pas un vrai "bug", ça veut juste dire que la destination n'existe pas (404). On ignore donc silencieusement cette erreur spécifique.
    if (error.code !== 'PGRST116') {
      console.error('[getDestinationBySlug]', error.message)
    }
    return null
  }

  // L'utilisation de "as unknown as" permet de forcer TypeScript à accepter le type complexe de notre jointure.
  return data as unknown as DestinationFull
}

export async function getDestinationMeta(slug: string) {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('destinations')
    // Cette partie là sert à faire ce qu'on appelle une "projection" partielle. On ne demande à la BDD que les colonnes dont on a besoin pour le Layout/SEO, ça allège le téléchargement.
    .select('id, slug, kanji, name, subtitle, region, description, tags, icon, accent_color, secondary_color, shadow_color, hero_gradient, best_months, budget, language, timezone, quick_facts')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('[getDestinationMeta]', error.message)
    return null
  }

  return data
}

export async function getAllSlugs(): Promise<string[]> {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('destinations')
    .select('slug')
    .eq('published', true)

  if (error) {
    console.error('[getAllSlugs]', error.message)
    return []
  }

  return (data ?? []).map((d) => (d as { slug: string }).slug)
}

// ─── Reviews destinations ─────────────────────────────────────

export async function getApprovedReviews(destinationId: string): Promise<ReviewRow[]> {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('destination_id', destinationId)
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getApprovedReviews]', error.message)
    return []
  }

  return (data ?? []) as ReviewRow[]
}

export async function submitReview(review: ReviewInsert) {
  // ATTENTION ICI : Contrairement aux requêtes précédentes, on utilise le "createClient" normal (non-admin).
  // C'est très bien : comme c'est une action déclenchée par l'utilisateur final, on veut que les règles de sécurité RLS de Supabase s'appliquent !
  const supabase = await createClient()

  // On force le statut "approved" à false côté serveur, par sécurité, même si quelqu'un essayait de le forcer à true depuis le front-end.
  const payload = { ...review, approved: false }

  const { data, error } = await supabase
    .from('reviews')
    .insert(payload as any)
    .select()
    .single()

  if (error) {
    console.error('[submitReview]', error.message)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// ─── Apps ─────────────────────────────────────────────────────

/**
 * Toutes les apps publiées avec leurs stats.
 * Optionnellement filtrées par catégorie.
 */
export async function getApps(category?: AppCategory): Promise<AppWithStats[]> {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  let query = supabase
    .from('apps_with_stats')
    .select('*')
    .order('essential', { ascending: false })
    .order('sort_order', { ascending: true })

  // Cette partie concerne la construction dynamique de la requête SQL. Si une catégorie est fournie, on ajoute une clause "WHERE" (.eq).
  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('[getApps]', error.message)
    return []
  }

  return (data ?? []) as AppWithStats[]
}

/**
 * Toutes les apps groupées par catégorie.
 * Utilisé pour la page /apps complète.
 */
export async function getAppsGrouped(): Promise<Record<AppCategory, AppWithStats[]>> {
  // On récupère toutes les apps en une seule requête.
  const apps = await getApps()

  const grouped: Record<string, AppWithStats[]> = {
    transport:     [],
    traduction:    [],
    paiement:      [],
    hebergement:   [],
    nourriture:    [],
    communication: [],
    culture:       [],
  }

  // Cette partie là sert à trier les applications dans leurs "tiroirs" respectifs en JavaScript, ce qui nous évite de faire 7 requêtes SQL différentes.
  apps.forEach((app) => {
    if (grouped[app.category]) {
      grouped[app.category].push(app)
    }
  })

  return grouped as Record<AppCategory, AppWithStats[]>
}

/**
 * Une app par son slug avec ses avis approuvés.
 */
export async function getAppBySlug(slug: string): Promise<AppFull | null> {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('apps')
    .select('*, app_reviews(*)')
    .eq('slug', slug)
    .eq('published', true)
    .eq('app_reviews.approved', true)
    .order('created_at', { referencedTable: 'app_reviews', ascending: false })
    .single()

  if (error) {
    if (error.code !== 'PGRST116') console.error('[getAppBySlug]', error.message)
    return null
  }

  return data as unknown as AppFull
}

// ─── Admin ────────────────────────────────────────────────────

export async function getPendingReviews() {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('reviews')
    // Jointure vers le haut : on récupère l'avis ET le nom/slug de la destination associée.
    .select('*, destinations(name, slug)')
    .eq('approved', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getPendingReviews]', error.message)
    return []
  }

  // Un peu de forçage de type pour s'assurer que TypeScript comprend la forme du retour.
  return (data ?? []) as unknown as Array<{
    id:           string
    author:       string
    country:      string
    flag:         string
    rating:       number
    review_date:  string
    body:         string
    highlight:    string
    created_at:   string
    destinations: { name: string; slug: string } | null
  }>
}

export async function approveReview(reviewId: string) {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('reviews')
    .update({ approved: true } as any)
    .eq('id', reviewId)
  return { success: !error, error: error?.message }
}

export async function deleteReview(reviewId: string) {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
  return { success: !error, error: error?.message }
}

export async function updateDestination(id: string, updates: Record<string, unknown>) {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('destinations')
    .update(updates as any)
    .eq('id', id)
    .select()
    .single()
  return { success: !error, data, error: error?.message }
}