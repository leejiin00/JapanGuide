'use client'
// app/HomeClient.tsx
// Orchestrateur de la page d'accueil — assemble les sections extraites.
// Chaque section est dans components/home/ pour respecter le principe de responsabilité unique.

import type { DestinationWithStats } from '@/types/database'
import HeroSection         from '@/components/home/HeroSection'
import StatsSection        from '@/components/home/StatsSection'
import DestinationsSection from '@/components/home/DestinationsSection'
import QuoteSection        from '@/components/home/QuoteSection'
import HomeFooter          from '@/components/home/HomeFooter'

interface Props {
  destinations: DestinationWithStats[]
}

export default function HomeClient({ destinations }: Props) {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <DestinationsSection destinations={destinations} />
      <QuoteSection />
      <HomeFooter />
    </main>
  )
}
