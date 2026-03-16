// lib/queries.ts
import { createClient } from '@/lib/supabase/server'
import type { DestinationFull, DestinationWithStats, ReviewInsert, ReviewRow } from '@/types/database'

// ─── Destinations ─────────────────────────────────────────────

export async function getDestinations(): Promise<DestinationWithStats[]> {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

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
    .select(`
      *,
      hotels ( * ),
      activities ( * ),
      reviews ( * )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .order('sort_order', { referencedTable: 'hotels',     ascending: true })
    .order('sort_order', { referencedTable: 'activities', ascending: true })
    .order('created_at', { referencedTable: 'reviews',    ascending: false })
    .eq('reviews.approved', true)
    .single()

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('[getDestinationBySlug]', error.message)
    }
    return null
  }

  return data as unknown as DestinationFull
}

export async function getDestinationMeta(slug: string) {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('destinations')
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

// ─── Reviews ──────────────────────────────────────────────────

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
  const supabase = await createClient()

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

// ─── Admin ────────────────────────────────────────────────────

export async function getPendingReviews() {
  const { createAdminClient } = await import('@/lib/supabase/server')
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('*, destinations(name, slug)')
    .eq('approved', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getPendingReviews]', error.message)
    return []
  }

  return (data ?? []) as unknown as Array<{
    id: string
    author: string
    country: string
    flag: string
    rating: number
    review_date: string
    body: string
    highlight: string
    created_at: string
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