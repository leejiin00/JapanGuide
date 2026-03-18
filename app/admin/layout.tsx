// app/admin/layout.tsx
// Protection de la zone admin via Supabase Auth.
// Redirige vers /admin/login si non authentifié.

// Cette partie concerne l'importation des outils de navigation côté serveur de Next.js et de notre client Supabase sécurisé.
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ReactNode } from 'react'
import AdminSidebar from './AdminSidebar'

interface Props { children: ReactNode }

// Cette partie là sert à définir la structure englobante de toutes les pages qui se trouvent dans le dossier "admin".
// J'ai fait ça pour ne pas avoir à réécrire la logique de vérification de session et l'intégration de la Sidebar sur chaque sous-page (dashboard, avis, destinations...).
export default async function AdminLayout({ children }: Props) {
  const supabase = await createClient()

  // Vérifie la session côté serveur
  // Cette partie concerne l'authentification stricte. On demande directement au serveur de Supabase de valider le jeton (cookie) de l'utilisateur.
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // J'ai fait ça pour expulser automatiquement toute personne non connectée qui tenterait d'accéder directement à une URL "/admin/...". Elle est renvoyée sans délai vers la page de connexion.
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#060410' }}>
      {/* Cette partie là sert à injecter notre menu latéral en lui passant l'email de l'administrateur fraîchement récupéré. */}
      <AdminSidebar userEmail={user.email ?? ''} />
      
      {/* J'ai fait ça (ml-64, margin-left de 64 unités) pour décaler le contenu principal vers la droite afin qu'il ne passe pas en dessous de la Sidebar qui, rappelle-toi, a une position fixée. */}
      <main className="flex-1 ml-64 p-8 pt-10">
        {/* Cette partie concerne l'affichage dynamique : "children" représente la page spécifique que l'admin est en train de visiter (le dashboard, la page des avis, etc.). */}
        {children}
      </main>
    </div>
  )
}