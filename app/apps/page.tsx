// app/apps/page.tsx — Server Component

import { getAppsGrouped } from '@/lib/supabase/queries'
import AppsPageClient from './AppsPageClient'

export const revalidate = 3600

export const metadata = {
  title:       'Applications — Nihon Guide',
  description: 'Les meilleures applications à télécharger avant de partir au Japon : transport, traduction, paiement, nourriture et culture.',
}

export default async function AppsPage() {
  const appsByCategory = await getAppsGrouped()
  return <AppsPageClient appsByCategory={appsByCategory} />
}