// app/admin/page.tsx — Dashboard
import { createClient } from '@/lib/supabase/server'
import { getPendingReviews } from '@/lib/supabase/queries'
import AdminDashboardClient from './AdminDashboardClient'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Stats globales
  const [
    { count: destCount   },
    { count: hotelCount  },
    { count: actCount    },
    { count: reviewCount },
  ] = await Promise.all([
    supabase.from('destinations').select('*', { count: 'exact', head: true }),
    supabase.from('hotels').select('*', { count: 'exact', head: true }),
    supabase.from('activities').select('*', { count: 'exact', head: true }),
    supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('approved', false),
  ])

  const pendingReviews = await getPendingReviews()

  return (
    <AdminDashboardClient
      stats={{
        destinations: destCount ?? 0,
        hotels: hotelCount ?? 0,
        activities: actCount ?? 0,
        pendingReviews: reviewCount ?? 0,
      }}
      pendingReviews={pendingReviews}
    />
  )
}