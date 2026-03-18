import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import TransitionLayout from '../components/TransitionsLayout';

// Cette partie concerne le référencement global (SEO) de l'application.
// J'ai fait ça pour définir les balises <title>, <meta description> et les mots-clés qui s'appliqueront par défaut à toutes les pages du site (sauf si une page spécifique décide de les écraser avec son propre objet metadata).
export const metadata: Metadata = {
  title: 'Nihon — Guide de Voyage Mystique au Japon',
  description:
    'Découvrez le Japon à travers un guide immersif : Kyoto, Tokyo, Hakone, Osaka, Nara, Hiroshima. Temples, onsen, gastronomie et culture japonaise.',
  keywords: ['Japon', 'voyage', 'Kyoto', 'Tokyo', 'guide', 'tourisme'],
};

// Cette partie là sert à créer la coquille HTML fondamentale de tout le site web. C'est le parent absolu de tous les autres composants.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // J'ai fait ça pour déclarer la langue du site aux moteurs de recherche et pour activer le défilement doux (scroll-smooth) nativement via Tailwind CSS quand on clique sur une ancre (un lien avec #).
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Cette partie concerne l'optimisation des performances (Performance & Web Vitals). */}
        {/* J'ai fait ça pour dire au navigateur de se connecter en avance (preconnect) aux serveurs de Google Fonts, ce qui permet de télécharger les polices de caractères beaucoup plus vite et d'éviter les sauts de texte au chargement. */}
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
        {/* Cette partie là sert à afficher la barre de navigation tout en haut de l'écran, pour qu'elle soit présente sur absolument TOUTES les pages du site sans avoir à la réimporter à chaque fois. */}
        <Navbar />
        
        {/* J'ai fait ça pour envelopper tout le contenu dynamique de l'application ({children}) dans ton composant personnalisé de transition. C'est ce qui permet d'avoir des fondus fluides au changement de page ! */}
        <TransitionLayout>
          {children}
        </TransitionLayout>
      </body>
    </html>
  );
}