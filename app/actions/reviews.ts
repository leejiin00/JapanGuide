'use server'

// app/actions/reviews.ts
// Server Action — s'exécute côté serveur, jamais exposé au client.
// Utilise le client anon (RLS autorise INSERT avec approved=false).

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type ReviewFormData = {
  destination_id: string
  destination_slug: string
  author:         string
  country:        string
  flag:           string
  rating:         number
  body:           string
  highlight:      string
}

export type ReviewActionResult =
  | { success: true }
  | { success: false; error: string }

export async function submitReviewAction(
  data: ReviewFormData
): Promise<ReviewActionResult> {
  // Validation basique côté serveur
  if (!data.author?.trim())    return { success: false, error: 'Le prénom est requis.' }
  if (!data.body?.trim())      return { success: false, error: 'Le témoignage est requis.' }
  if (!data.highlight?.trim()) return { success: false, error: 'Le moment phare est requis.' }
  if (data.rating < 1 || data.rating > 5) return { success: false, error: 'Note invalide.' }

  const supabase    = await createClient()
  const review_date = new Date().toLocaleDateString('fr-FR', {
    month: 'long',
    year:  'numeric',
  })

  const { error } = await supabase.from('reviews').insert({
    destination_id: data.destination_id,
    author:         data.author.trim(),
    country:        data.country,
    flag:           data.flag,
    rating:         data.rating,
    review_date,
    body:           data.body.trim(),
    highlight:      data.highlight.trim(),
    approved:       false,
  } as any) // `as any` temporaire — disparaîtra après `supabase gen types`

  if (error) {
    console.error('[submitReviewAction]', error.message)
    return { success: false, error: 'Une erreur est survenue. Réessayez.' }
  }

  // Invalide le cache de la page avis pour que les admins voient le nouvel avis
  revalidatePath(`/destination/${data.destination_slug}/avis`)
  revalidatePath('/admin')
  revalidatePath('/admin/avis')

  return { success: true }
}