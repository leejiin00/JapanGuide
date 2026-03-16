// app/admin/destinations/page.tsx — Server Component
import { createClient } from '@/lib/supabase/server'
import type { DestinationWithStats } from '@/types/database'
import AdminDestinationsClient from './AdminDestinationsClient'

export default async function AdminDestinationsPage() {
  const supabase = await createClient()

  const { data: destinations } = await supabase
    .from('destinations_with_stats')
    .select('*')
    .order('name')

  return <AdminDestinationsClient destinations={(destinations as DestinationWithStats[]) ?? []} />
}