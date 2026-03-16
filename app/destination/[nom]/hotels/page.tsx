// app/destination/[nom]/hotels/page.tsx — Server Component
import { notFound } from 'next/navigation'
import { getDestinationBySlug } from '@/lib/supabase/queries'
import Hotelsclient from './Hotelsclient'

interface Props { params: Promise<{ nom: string }> }

export default async function HotelsPage({ params }: Props) {
  const { nom } = await params
  const dest    = await getDestinationBySlug(nom)
  if (!dest) notFound()
  return <Hotelsclient dest={dest} />
}