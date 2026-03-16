// app/admin/avis/page.tsx — Server Component
import { createAdminClient } from '@/lib/supabase/server'
import AdminAvisClient from './AdminAvisClient'

interface Review {
  id:           string
  author:       string
  country:      string
  flag:         string
  rating:       number
  body:         string
  highlight:    string
  review_date:  string
  approved:     boolean
  created_at:   string
  destinations: { name: string; slug: string; accent_color: string } | null
}

export default async function AdminAvisPage() {
  const supabase = createAdminClient()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('id, author, country, flag, rating, body, highlight, review_date, approved, created_at, destinations(name, slug, accent_color)')
    .order('created_at', { ascending: false })

  return <AdminAvisClient reviews={(reviews as Review[]) ?? []} />
}