// app/destination/[nom]/activites/page.tsx — Server Component
import { notFound } from 'next/navigation'
import { getDestinationBySlug } from '@/lib/supabase/queries'
import Activitesclient from './Activitesclient'

interface Props { params: Promise<{ nom: string }> }

export default async function ActivitesPage({ params }: Props) {
  const { nom } = await params
  const dest    = await getDestinationBySlug(nom)
  if (!dest) notFound()
  return <Activitesclient dest={dest} />
}