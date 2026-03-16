// app/destination/[nom]/layout.tsx — Server Component
import { notFound } from 'next/navigation'
import { getDestinationMeta, getAllSlugs } from '@/lib/supabase/queries'
import Destinationlayoutclient from './Destinationlayoutclient'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params:   Promise<{ nom: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ nom: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ nom: string }> }) {
  const { nom } = await params
  const dest    = await getDestinationMeta(nom)
  if (!dest) return {}
  return {
    title:       `${dest.name} — Nihon Guide`,
    description: dest.description,
  }
}

export default async function DestinationLayout({ children, params }: Props) {
  const { nom } = await params
  const dest    = await getDestinationMeta(nom)
  if (!dest) notFound()
  return <Destinationlayoutclient dest={dest}>{children}</Destinationlayoutclient>
}