'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  
  // Cette partie concerne la gestion de l'état du formulaire (les variables locales du composant).
  // J'ai fait ça pour garder une trace de ce que l'utilisateur tape dans les champs de texte, ainsi que pour savoir si on doit afficher un message d'erreur ou un état de chargement.
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    // Cette partie là sert à empêcher le comportement par défaut du navigateur (qui rechargerait toute la page au clic sur un bouton submit).
    e.preventDefault();
    
    // J'ai fait ça pour indiquer à l'interface de se mettre en mode "attente" (bouton grisé) et pour effacer les éventuelles erreurs précédentes.
    setLoading(true);
    setError('');

    // Cette partie concerne l'appel au service d'authentification.
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Identifiants incorrects. Vérifiez votre email et mot de passe.');
      setLoading(false);
      return;
    }

    // Cette partie là sert à rediriger l'administrateur vers son tableau de bord une fois la connexion réussie.
    // Le "router.refresh()" force Next.js à re-calculer la route serveur pour bien prendre en compte le nouveau cookie de session.
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#060410' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(251,146,60,0.07) 0%, transparent 70%)',
      }} aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative"
      >
        {/* Card */}
        <div
          className="rounded-3xl p-10"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-4xl block mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fb923c' }}>日</span>
            <h1 className="text-2xl font-thin text-white font-display mb-1">Espace Admin</h1>
            <p className="text-xs text-white/30 font-body tracking-wider">Nihon Guide · Gestion</p>
          </div>

          {/* Form */}
          {/* Cette partie concerne la liaison entre l'interface et notre fonction React. Le "onSubmit" intercepte la validation du formulaire (clic sur le bouton ou touche Entrée). */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                // Cette partie là sert à mettre à jour notre variable d'état "email" à chaque fois que l'utilisateur tape une lettre au clavier.
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white font-body outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                // J'ai fait ça pour ajouter un effet visuel dynamique quand l'utilisateur clique dans le champ (focus) ou clique en dehors (blur).
                onFocus={(e) => e.target.style.borderColor = 'rgba(251,146,60,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                placeholder="admin@nihon.guide"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/30 font-body mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white font-body outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(251,146,60,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                placeholder="••••••••"
              />
            </div>

            {/* Cette partie concerne l'affichage conditionnel. On n'affiche ce bloc <motion.p> QUE si la variable "error" contient du texte. */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-body px-4 py-3 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, boxShadow: '0 0 40px rgba(251,146,60,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl text-sm tracking-widest uppercase font-body font-medium mt-2"
              style={{
                background: loading ? 'rgba(251,146,60,0.4)' : 'linear-gradient(135deg, #fb923c, #f59e0b)',
                color: '#000',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Connexion...' : 'Se Connecter'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}