import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import TransitionLayout from '../components/TransitionsLayout';

export const metadata: Metadata = {
  title: 'Nihon — Guide de Voyage Mystique au Japon',
  description:
    'Découvrez le Japon à travers un guide immersif : Kyoto, Tokyo, Hakone, Osaka, Nara, Hiroshima. Temples, onsen, gastronomie et culture japonaise.',
  keywords: ['Japon', 'voyage', 'Kyoto', 'Tokyo', 'guide', 'tourisme'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ background: '#060410' }}>
        <Navbar />
        <TransitionLayout>
          {children}
        </TransitionLayout>
      </body>
    </html>
  );
}