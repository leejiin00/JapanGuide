'use client';
// Cette partie là sert à déclarer que ce composant a besoin du navigateur, car framer-motion et usePathname ne fonctionnent que côté client.

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// Cette partie concerne la configuration de l'animation.
// J'ai fait ça pour extraire les "états" de l'animation (variants) en dehors du composant. Ça rend le code HTML plus bas beaucoup plus facile à lire. Le petit "filter: 'blur(4px)'" ajoute un côté très cinématique au changement de page !
const variants = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  enter:   { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -8, filter: 'blur(4px)' },
};

export default function TransitionLayout({ children }: Props) {
  // J'ai fait ça pour récupérer l'URL actuelle. C'est le "déclencheur" de notre animation.
  const pathname = usePathname();

  return (
    // Cette partie concerne l'orchestration des animations de sortie.
    // J'ai fait ça (mode="wait") pour demander à Framer Motion d'attendre que l'ancienne page ait totalement terminé son animation de sortie (exit) AVANT de commencer à faire apparaître la nouvelle page. Ça évite les superpositions moches.
    // Le "initial={false}" sert à empêcher l'animation de se jouer lors du tout premier chargement du site (pour que l'utilisateur n'attende pas), elle ne se jouera qu'aux navigations suivantes.
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        // LA LIGNE MAGIQUE !
        // J'ai fait ça pour dire à React : "Si le pathname change, c'est que ce n'est plus la même div. Détruis l'ancienne et crées-en une nouvelle." C'est cette destruction qui déclenche l'animation "exit" de l'ancienne page et "initial/enter" de la nouvelle !
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        // Le "ease: [0.16, 1, 0.3, 1]" est une courbe de Bézier personnalisée (ease-out dynamique) qui donne un aspect beaucoup plus naturel et physique que les animations linéaires classiques.
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="page-wrapper"
      >
        {/* Ici, on injecte le contenu de la page visitée (ex: la page d'accueil, la page des hôtels, etc.) */}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}