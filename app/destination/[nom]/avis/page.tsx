// app/destination/[nom]/avis/page.tsx — Server Component
import { notFound } from 'next/navigation'
import { getDestinationMeta, getApprovedReviews } from '@/lib/supabase/queries'
import Avisclient from './Avisclient'

interface Props { params: Promise<{ nom: string }> }

export default async function AvisPage({ params }: Props) {
  const { nom } = await params
  const dest    = await getDestinationMeta(nom)
  if (!dest) notFound()

  const reviews = await getApprovedReviews(dest.id)
  return <Avisclient dest={dest} reviews={reviews} />
}