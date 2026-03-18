// app/destination/[nom]/layout.tsx — Server Component
import { notFound } from 'next/navigation'
import { getDestinationMeta, getAllSlugs } from '@/lib/supabase/queries'
import Destinationlayoutclient from './Destinationlayoutclient'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params:   Promise<{ nom: string }>
}

// Cette partie là sert à indiquer à Next.js quelles sont toutes les routes "/destination/[nom]" qui existent, avant même que quiconque ne visite le site.
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  // J'ai fait ça pour pré-générer (compiler) toutes les pages de destinations lors du déploiement (build) du site. Résultat : quand un visiteur clique sur "Tokyo", la page se charge instantanément car elle a déjà été construite sur le serveur ! C'est ce qu'on appelle le SSG (Static Site Generation).
  return slugs.map((slug) => ({ nom: slug }))
}

// Cette partie concerne le SEO (référencement naturel) dynamique.
export async function generateMetadata({ params }: { params: Promise<{ nom: string }> }) {
  const { nom } = await params
  const dest    = await getDestinationMeta(nom)
  
  // J'ai fait ça pour éviter une erreur si l'URL est invalide au moment où les robots de Google scannent la page.
  if (!dest) return {}
  
  // Cette partie là sert à personnaliser le titre de l'onglet du navigateur et la description Google spécifiquement pour la destination affichée (ex: "Tokyo — Nihon Guide").
  return {
    title:       `${dest.name} — Nihon Guide`,
    description: dest.description,
  }
}

export default async function DestinationLayout({ children, params }: Props) {
  // Cette partie concerne la récupération des données principales qui vont nourrir toute la coquille visuelle de la destination.
  const { nom } = await params
  const dest    = await getDestinationMeta(nom)
  
  if (!dest) notFound()
  
  // J'ai fait ça pour passer les données de la destination au composant client (le menu avec les onglets), et injecter le contenu spécifique de la page (les hôtels, les avis...) via la variable "children".
  return <Destinationlayoutclient dest={dest}>{children}</Destinationlayoutclient>
}