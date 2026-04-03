---
name: debug
description: Analyse une stack trace ou un comportement anormal, identifie la cause racine et propose une correction ciblée. Adapté au stack React/Next.js/Supabase/Vercel.
---

# Skill : debug

## Objectif
Diagnostiquer un bug à partir d'une erreur, d'un comportement inattendu ou d'une stack trace, et proposer une correction précise et testable.

## Stack cible
- React / Next.js 14+ (App Router)
- TypeScript
- Supabase (client/server)
- Vercel (edge/serverless)
- Tailwind CSS

## Instructions

### 1. Collecte d'informations
Demander si non fourni :
- Message d'erreur complet (stack trace)
- Contexte : navigateur, route, action utilisateur déclenchante
- Comportement attendu vs comportement observé
- Fichier(s) concerné(s)

### 2. Méthode de diagnostic

#### Étape 1 — Identifier le type d'erreur
| Type | Indices |
|------|---------|
| Erreur React | `Cannot read properties of undefined`, `Each child should have a unique key` |
| Erreur Next.js | `Error: Hydration failed`, `NEXT_NOT_FOUND`, `Module not found` |
| Erreur Supabase | `JWT expired`, `new row violates row-level security`, `relation does not exist` |
| Erreur TypeScript | `Type X is not assignable to type Y` |
| Erreur Vercel | `Function timeout`, `Edge Runtime`, `500 Internal Server Error` |
| Erreur réseau | `CORS`, `fetch failed`, `NetworkError` |

#### Étape 2 — Localiser la cause racine
- Lire la stack trace de bas en haut (la vraie cause est souvent dans les premières lignes du projet)
- Vérifier les fichiers mentionnés dans la trace
- Identifier si l'erreur est côté client ou serveur

#### Étape 3 — Proposer la correction
- Correction minimale et ciblée (ne pas refactorer tout le fichier)
- Expliquer POURQUOI l'erreur se produisait
- Proposer un test pour vérifier la correction

### 3. Erreurs fréquentes et solutions rapides

**Hydration mismatch Next.js**
```tsx
// Problème : rendu différent serveur/client
// Solution : utiliser useEffect ou dynamic avec ssr: false
const Component = dynamic(() => import('./Component'), { ssr: false })
```

**Supabase RLS bloquant**
```sql
-- Vérifier la politique active
SELECT * FROM pg_policies WHERE tablename = 'ma_table';
-- Tester avec le rôle anon vs authenticated
```

**useEffect boucle infinie**
```tsx
// Problème : objet/tableau en dépendance
useEffect(() => {}, [monObjet]) // re-render à chaque render
// Solution : useMemo ou dépendances primitives
```

**Variable d'env manquante sur Vercel**
```bash
# Vérifier que la var est bien dans Vercel Dashboard
# Et préfixée NEXT_PUBLIC_ si utilisée côté client
```

### 4. Format de la réponse
```
## Diagnostic

**Erreur identifiée :** [type d'erreur]
**Cause racine :** [explication claire]
**Fichier(s) impliqué(s) :** [chemin]

## Correction

[Code corrigé avec explication]

## Vérification
[Comment tester que c'est résolu]
```
