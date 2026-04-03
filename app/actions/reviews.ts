'use server'
// Cette partie là sert à indiquer à Next.js que toutes les fonctions exportées de ce fichier doivent s'exécuter UNIQUEMENT sur le serveur.
// J'ai fait ça pour que ce code (et surtout les clés secrètes ou la logique de base de données) ne soit jamais envoyé dans le navigateur du client. C'est ce qu'on appelle une "Server Action".

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Cette partie concerne le typage strict de tes données entrantes. 
// C'est une excellente pratique de définir exactement ce qu'on attend du formulaire front-end.
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

// Cette partie là sert à standardiser la réponse du serveur.
// J'ai fait ça pour que le front-end sache facilement s'il doit afficher un message de succès ou un message d'erreur précis.
export type ReviewActionResult =
  | { success: true }
  | { success: false; error: string }

export async function submitReviewAction(
  data: ReviewFormData
): Promise<ReviewActionResult> {
  
  // Cette partie concerne la validation des données (Sanitization & Validation).
  // Même si le formulaire front-end a des champs obligatoires (required), il ne faut jamais faire confiance au client. On revérifie toujours côté serveur.
  if (!data.author?.trim())    return { success: false, error: 'Le prénom est requis.' }
  if (!data.body?.trim())      return { success: false, error: 'Le témoignage est requis.' }
  if (!data.highlight?.trim()) return { success: false, error: 'Le moment phare est requis.' }
  if (data.rating < 1 || data.rating > 5) return { success: false, error: 'Note invalide.' }

  const supabase    = await createClient()
  
  const review_date = new Date().toLocaleDateString('fr-FR', {
    month: 'long',
    year:  'numeric',
  })

  // Cette partie là sert à insérer les données de manière sécurisée dans Supabase.
  const { error } = await supabase.from('reviews').insert({
    destination_id: data.destination_id,
    author:         data.author.trim(),
    country:        data.country,
    flag:           data.flag,
    rating:         data.rating,
    review_date,
    body:           data.body.trim(),
    highlight:      data.highlight.trim(),
    approved:       false, // Toujours false côté serveur — jamais modifiable depuis le client.
  })

  if (error) {
    console.error('[submitReviewAction]', error.message)
    return { success: false, error: 'Une erreur est survenue. Réessayez.' }
  }

  // Cette partie concerne la gestion du cache de Next.js.
  // J'ai fait ça pour forcer Next.js à purger le cache de ces pages spécifiques. 
  // Sans ça, Next.js continuerait d'afficher l'ancienne version de la page (sans le nouvel avis) pour économiser des ressources.
  revalidatePath(`/destination/${data.destination_slug}/avis`)
  revalidatePath('/admin')
  revalidatePath('/admin/avis')

  return { success: true }
}