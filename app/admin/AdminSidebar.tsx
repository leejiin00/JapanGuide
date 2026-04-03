'use client';
// Cette partie là sert à indiquer à Next.js qu'on est côté client. C'est obligatoire ici car on utilise des hooks liés au navigateur (usePathname, useRouter) et des événements utilisateurs (onClick).

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

interface Props { userEmail: string }

const navItems = [
  { href: '/admin',              label: 'Dashboard',    icon: '📊' },
  { href: '/admin/destinations', label: 'Destinations', icon: '🗾' },
  { href: '/admin/avis',         label: 'Avis',         icon: '⭐' },
];

export default function AdminSidebar({ userEmail }: Props) {
  // Cette partie concerne l'accès aux informations de l'URL actuelle.
  const pathname = usePathname();
  const router   = useRouter();

  // Cette partie là sert à déconnecter l'utilisateur proprement de Supabase.
  const handleLogout = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('[handleLogout] Erreur lors de la déconnexion:', error.message);
      }
    } catch (err) {
      console.error('[handleLogout] Erreur inattendue:', err);
    } finally {
      // J'ai fait ça pour renvoyer l'utilisateur sur la page de connexion dans tous les cas
      // (même si signOut échoue), et pour forcer Next.js à purger son cache de route.
      router.push('/admin/login');
      router.refresh();
    }
  };

  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 flex flex-col py-8 px-5"
      style={{
        background: 'rgba(255,255,255,0.025)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <span className="text-2xl" style={{ color: '#fb923c', fontFamily: 'Cormorant Garamond, serif' }}>日</span>
        <div>
          <p className="text-white text-sm tracking-widest uppercase font-body">Nihon Admin</p>
          <p className="text-[10px] text-white/25 font-body">Espace de gestion</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon }) => {
          // Cette partie concerne la logique de surbrillance du menu.
          // J'ai fait ça pour vérifier si l'URL actuelle (pathname) correspond au lien du bouton. La petite subtilité avec le "startsWith" permet de garder le menu "Destinations" allumé même si on est sur "/admin/destinations/tokyo".
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          
          return (
            <Link key={href} href={href}>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-all"
                style={{
                  background: isActive ? 'rgba(251,146,60,0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(251,146,60,0.2)' : '1px solid transparent',
                  color: isActive ? '#fb923c' : 'rgba(255,255,255,0.4)',
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User info + logout */}
      <div className="border-t border-white/5 pt-5 mt-5">
        <p className="text-[10px] text-white/25 font-body mb-3 px-2 truncate">{userEmail}</p>
        <motion.button
          onClick={handleLogout}
          whileHover={{ x: 4, color: '#fb923c' }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body w-full text-left"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <span>🚪</span>
          <span>Déconnexion</span>
        </motion.button>
      </div>
    </aside>
  );
}