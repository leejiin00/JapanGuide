import { getDestinations } from '@/lib/supabase/queries'
import DestinationsPageClient from './destination/DestinationsPageClient'

export const revalidate = 3600

export const metadata = {
  title:       'Destinations — Nihon Guide',
  description: 'Explorez toutes nos destinations au Japon : Kyoto, Tokyo, Hakone, Osaka, Nara, Hiroshima.',
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()
  return <DestinationsPageClient destinations={destinations} />
}