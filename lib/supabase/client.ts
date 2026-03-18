// lib/supabase/client.ts

// Cette partie là sert à importer la fonction magique de Supabase spécialement conçue pour le Server-Side Rendering (SSR) de Next.js.
import { createBrowserClient } from '@supabase/ssr'
// J'ai fait ça pour importer les types TypeScript générés automatiquement depuis ma base de données. C'est ce qui permet à mon éditeur de code de connaître le nom exact de toutes mes tables et colonnes !
import type { Database } from '@/types/database'

export function createClient() {
  // Cette partie concerne la création de l'instance qui va se connecter à la base de données depuis le navigateur de l'utilisateur (Client Components).
  // On passe `<Database>` pour appliquer notre typage strict.
  return createBrowserClient<Database>(
    // J'ai fait ça pour injecter mes clés d'API sécurisées stockées dans mon fichier `.env.local`.
    // Le point d'exclamation (!) à la fin s'appelle un "Non-null assertion operator" en TypeScript. Il sert à jurer au compilateur que ces variables d'environnement existeront toujours au moment de l'exécution, pour éviter qu'il ne se plaigne qu'elles pourraient être "undefined".
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}