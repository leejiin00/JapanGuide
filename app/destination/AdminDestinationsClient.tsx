'use client';
// Cette partie là sert à autoriser l'interactivité dans le navigateur, indispensable pour gérer tous nos états locaux et les requêtes Supabase depuis le client.

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { DestinationWithStats } from '@/types/database';

interface Props { destinations: DestinationWithStats[] }

export default function AdminDestinationsClient({ destinations: initial }: Props) {
  const router = useRouter();
  
  // Cette partie concerne la gestion complexe de l'état du tableau.
  const [dests, setDests] = useState(initial);
  
  // J'ai fait ça pour garder en mémoire l'ID de la destination en train d'être publiée/dépubliée, afin de bloquer uniquement SON bouton (et pas tout le tableau).
  const [toggling, setToggling] = useState<string | null>(null);
  
  // J'ai fait ça pour savoir quelle ligne du tableau doit se transformer en formulaire (inputs). Si c'est null, tout est en mode "lecture".
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBudget, setEditBudget] = useState('');
  const [editBestMonths, setEditBestMonths] = useState('');
  const [saving, setSaving] = useState(false);

  // Cette partie là sert à publier ou dépublier une destination en un clic.
  const togglePublish = async (id: string, current: boolean) => {
    setToggling(id);
    const supabase = createClient();
    
    // On inverse la valeur actuelle (!current) dans la base de données.
    const { error } = await supabase.from('destinations').update({ published: !current }).eq('id', id);
    
    if (!error) {
      // J'ai fait ça pour mettre à jour l'interface instantanément (Optimistic UI) si la requête réussit, sans avoir à recharger toute la liste depuis le serveur.
      setDests((prev) => prev.map((d) => d.id === id ? { ...d, published: !current } : d));
    }
    setToggling(null);
    router.refresh();
  };

  // Cette partie concerne le passage d'une ligne en mode "Édition".
  const startEdit = (dest: DestinationWithStats) => {
    setEditingId(dest.id);
    // On pré-remplit les champs texte avec les valeurs actuelles de la base de données.
    setEditBudget(dest.budget);
    setEditBestMonths(dest.best_months);
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('destinations')
      .update({ budget: editBudget, best_months: editBestMonths })
      .eq('id', id);
      
    if (!error) {
      // Mise à jour locale du tableau après la sauvegarde.
      setDests((prev) => prev.map((d) => d.id === id ? { ...d, budget: editBudget, best_months: editBestMonths } : d));
      // On referme le mode édition.
      setEditingId(null);
    }
    setSaving(false);
    router.refresh();
  };

  const inputStyle = {
    background:  'rgba(255,255,255,0.07)',
    border:      '1px solid rgba(255,255,255,0.15)',
    color:       '#fff',
    fontFamily:  'Outfit, sans-serif',
    fontSize:    '0.8rem',
    outline:     'none',
    borderRadius:'8px',
    padding:     '6px 12px',
    width:       '100%',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[10px] tracking-[0.4em] uppercase font-body mb-2" style={{ color: '#fb923c' }}>Gestion</p>
        <h1 className="font-display font-thin text-white" style={{ fontSize: '2.5rem' }}>Destinations</h1>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Header row */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-[10px] uppercase tracking-wider font-body"
          style={{ color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="col-span-3">Destination</span>
          <span className="col-span-2">Budget</span>
          <span className="col-span-2">Période</span>
          <span className="col-span-2">Stats</span>
          <span className="col-span-1 text-center">Publié</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        {/* Rows */}
        {dests.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-12 gap-4 px-6 py-5 items-center"
            style={{ borderBottom: i < dests.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
          >
            {/* Name */}
            <div className="col-span-3 flex items-center gap-3">
              <span className="text-xl">{dest.icon}</span>
              <div>
                <p className="text-sm font-body text-white">{dest.name}</p>
                <p className="text-[10px] font-body" style={{ color: dest.accent_color }}>{dest.kanji}</p>
              </div>
            </div>

            {/* Budget */}
            {/* Cette partie là sert à afficher conditionnellement soit le texte normal, soit le champ input si on est en mode édition. */}
            <div className="col-span-2">
              {editingId === dest.id ? (
                <input value={editBudget} onChange={(e) => setEditBudget(e.target.value)} style={inputStyle} />
              ) : (
                <p className="text-xs font-body text-white/50">{dest.budget}</p>
              )}
            </div>

            {/* Best months */}
            <div className="col-span-2">
              {editingId === dest.id ? (
                <input value={editBestMonths} onChange={(e) => setEditBestMonths(e.target.value)} style={inputStyle} />
              ) : (
                <p className="text-xs font-body text-white/50">{dest.best_months}</p>
              )}
            </div>

            {/* Stats */}
            <div className="col-span-2 flex gap-3 text-[10px] font-body text-white/30">
              <span>🏨 {dest.hotel_count}</span>
              <span>🎌 {dest.activity_count}</span>
              <span>⭐ {dest.avg_rating ?? '—'}</span>
            </div>

            {/* Published toggle */}
            <div className="col-span-1 flex justify-center">
              {/* J'ai fait ça pour créer un bouton "Switch" (interrupteur) personnalisé au lieu d'utiliser une simple case à cocher (checkbox). */}
              <motion.button
                onClick={() => togglePublish(dest.id, dest.published)}
                disabled={toggling === dest.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-6 rounded-full relative transition-colors"
                style={{ background: dest.published ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.1)', border: `1px solid ${dest.published ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.15)'}` }}
                title={dest.published ? 'Dépublier' : 'Publier'}
              >
                {/* La pastille à l'intérieur du switch s'anime sur l'axe X (gauche/droite) en fonction de l'état "published". */}
                <motion.span
                  animate={{ x: dest.published ? 18 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 w-4 h-4 rounded-full"
                  style={{ background: dest.published ? '#34d399' : 'rgba(255,255,255,0.3)' }}
                />
              </motion.button>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-end gap-2">
              {editingId === dest.id ? (
                <>
                  <motion.button
                    onClick={() => saveEdit(dest.id)}
                    disabled={saving}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-body tracking-wider"
                    style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }}
                  >
                    {saving ? '...' : '✓ Sauver'}
                  </motion.button>
                  <motion.button
                    onClick={() => setEditingId(null)}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-body tracking-wider"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                  >
                    Annuler
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => startEdit(dest)}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-body tracking-wider"
                    style={{ background: `${dest.accent_color}10`, border: `1px solid ${dest.accent_color}25`, color: dest.accent_color }}
                  >
                    ✏️ Modifier
                  </motion.button>
                  <motion.a
                    href={`/destination/${dest.slug}`}
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-body tracking-wider"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
                  >
                    👁 Voir
                  </motion.a>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] text-white/20 font-body">
        Les modifications de budget et de période sont sauvegardées immédiatement en base de données.
        Pour modifier le contenu textuel, utilisez l'éditeur SQL de Supabase.
      </p>
    </div>
  );
}