// app/page.tsx — Server Component (pas de 'use client')
// Fetche les destinations depuis Supabase au moment du rendu.

import { getDestinations } from '@/lib/supabase/queries'
import HomeClient from './HomeClient'

export const revalidate = 3600 // ISR — revalidation toutes les heures

export default async function HomePage() {
  const destination = await getDestinations()
  return <HomeClient destinations={destination} />
}