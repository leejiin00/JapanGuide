// app/destinations/page.tsx — Server Component
import { getDestinations } from '@/lib/supabase/queries'
import DestinationsPageClient from './DestinationsPageClient'

export const revalidate = 3600

export const metadata = {
  title:       'Destinations — Nihon Guide',
  description: 'Explorez toutes nos destinations au Japon : Kyoto, Tokyo, Hakone, Osaka, Nara, Hiroshima.',
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()
  return <DestinationsPageClient destinations={destinations} />
}