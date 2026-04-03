'use server'
// app/actions/admin.ts
// Server Actions pour la modération des avis.
// Ces fonctions s'exécutent UNIQUEMENT côté serveur et utilisent createAdminClient()
// (qui contourne RLS) de manière sécurisée, sans jamais exposer la SERVICE_ROLE_KEY au navigateur.

import { approveReview, deleteReview } from '@/lib/supabase/queries'
import { revalidatePath } from 'next/cache'

export type AdminActionResult =
  | { success: true }
  | { success: false; error: string }

/**
 * Approuve un avis en attente.
 * Utilise createAdminClient() côté serveur uniquement.
 *
 * @param reviewId - UUID de l'avis à approuver
 */
export async function approveReviewAction(reviewId: string): Promise<AdminActionResult> {
  if (!reviewId) return { success: false, error: 'ID de l\'avis manquant.' }

  const result = await approveReview(reviewId)

  if (!result.success) {
    return { success: false, error: result.error ?? 'Erreur lors de l\'approbation.' }
  }

  // Invalide le cache des pages concernées pour refléter le changement immédiatement.
  revalidatePath('/admin')
  revalidatePath('/admin/avis')

  return { success: true }
}

/**
 * Supprime définitivement un avis.
 * Utilise createAdminClient() côté serveur uniquement.
 *
 * @param reviewId - UUID de l'avis à supprimer
 */
export async function deleteReviewAction(reviewId: string): Promise<AdminActionResult> {
  if (!reviewId) return { success: false, error: 'ID de l\'avis manquant.' }

  const result = await deleteReview(reviewId)

  if (!result.success) {
    return { success: false, error: result.error ?? 'Erreur lors de la suppression.' }
  }

  revalidatePath('/admin')
  revalidatePath('/admin/avis')

  return { success: true }
}
