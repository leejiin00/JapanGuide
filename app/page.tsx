import { getDestinations } from '@/lib/supabase/queries'
import HomeClient from './HomeClient'

export const revalidate = 3600

export const metadata = {
  title:       'Nihon Guide — Guide de Voyage au Japon',
  description: 'Découvrez le Japon comme jamais : Kyoto, Tokyo, Hakone, Osaka, Nara, Hiroshima.',
}

export default async function HomePage() {
  const destinations = await getDestinations()
  return <HomeClient destinations={destinations} />
}