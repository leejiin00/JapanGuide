// app/destination/[nom]/page.tsx — Server Component
import { notFound } from 'next/navigation'
import { getDestinationBySlug } from '@/lib/supabase/queries'
import Destinationoverviewclient from './Destinationoverviewclient'

interface Props { params: Promise<{ nom: string }> }

export default async function DestinationPage({ params }: Props) {
  const { nom } = await params
  const dest    = await getDestinationBySlug(nom)
  if (!dest) notFound()
  return <Destinationoverviewclient dest={dest} />
}