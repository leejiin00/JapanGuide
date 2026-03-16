// app/admin/layout.tsx
// Protection de la zone admin via Supabase Auth.
// Redirige vers /admin/login si non authentifié.

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ReactNode } from 'react'
import AdminSidebar from './AdminSidebar'

interface Props { children: ReactNode }

export default async function AdminLayout({ children }: Props) {
  const supabase = await createClient()

  // Vérifie la session côté serveur
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#060410' }}>
      <AdminSidebar userEmail={user.email ?? ''} />
      <main className="flex-1 ml-64 p-8 pt-10">
        {children}
      </main>
    </div>
  )
}