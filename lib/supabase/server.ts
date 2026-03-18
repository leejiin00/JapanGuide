// lib/supabase/server.ts
// Cette partie concerne les imports des outils de Supabase et de Next.js.
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

/**
 * Client SSR pour les Server Components et Route Handlers.
 */
export async function createClient() {
  // J'ai fait ça pour récupérer l'objet qui gère les cookies de la requête HTTP actuelle de manière asynchrone (obligatoire depuis Next.js 15).
  // C'est grâce à ces cookies que Supabase sait si l'utilisateur qui visite la page est connecté ou non.
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Cette partie là sert à lire tous les cookies envoyés par le navigateur.
        getAll() {
          return cookieStore.getAll()
        },
        // Cette partie concerne la mise à jour des cookies (par exemple, si Supabase a besoin de rafraîchir le jeton d'authentification).
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // J'ai fait ça (le try/catch) car dans Next.js, un Server Component (page.tsx) est en lecture seule : il a le droit de lire les cookies, mais pas de les modifier ! 
            // Si Supabase essaie de rafraîchir le jeton pendant le rendu d'une page, ça va échouer ici et tomber dans le "catch" de manière silencieuse, sans faire crasher l'application. La vraie mise à jour du cookie se fera plus tard, via un Middleware ou une Server Action.
            // Ignoré en Server Component read-only
          }
        },
      },
    }
  )
}

/**
 * Client admin avec service_role — contourne RLS.
 * Réservé aux Server Actions et Route Handlers admin.
 */
export function createAdminClient() {
  // J'ai fait ça pour créer un client Supabase totalement différent du premier. Celui-ci n'utilise pas '@supabase/ssr' car il ne se soucie pas des cookies ou de l'utilisateur connecté.
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // ATTENTION ICI : On utilise la clé "SERVICE_ROLE_KEY" au lieu de la "ANON_KEY".
    // Cette clé est un passe-partout absolu (God Mode). Elle ignore totalement les règles de sécurité (RLS) définies dans la base de données.
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        // Cette partie là sert à optimiser les ressources du serveur.
        // Puisque ce client est un "super admin" qui n'est pas lié à un utilisateur précis, il n'y a pas de session à maintenir ou de jeton à rafraîchir. On désactive tout ça pour gagner en performance.
        autoRefreshToken: false,
        persistSession:   false,
      },
    }
  )
}