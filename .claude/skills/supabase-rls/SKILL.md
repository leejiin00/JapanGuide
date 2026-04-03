---
name: supabase-rls
description: Génère, audite et corrige les politiques RLS (Row Level Security) Supabase pour le projet JapanGuides. Garantit la sécurité des données par rôle (anon, authenticated, service_role).
---

# Skill : supabase-rls

## Objectif
Créer et auditer les politiques Row Level Security (RLS) Supabase de manière sécurisée, cohérente et documentée.

## Stack cible
- Supabase (PostgreSQL)
- Next.js App Router (Server Components + API Routes)
- Rôles : `anon`, `authenticated`, `service_role`

## Instructions

### 1. Principes fondamentaux RLS

- **RLS doit être activé** sur toutes les tables contenant des données utilisateur
- **Principe du moindre privilège** : par défaut, aucun accès → ajouter uniquement ce qui est nécessaire
- `anon` = visiteur non connecté
- `authenticated` = utilisateur connecté via Supabase Auth
- `service_role` = backend uniquement (jamais exposé côté client)

### 2. Activation RLS
```sql
-- Toujours activer RLS avant de créer des policies
ALTER TABLE nom_table ENABLE ROW LEVEL SECURITY;
```

### 3. Templates de policies par cas d'usage

#### Lecture publique (ex: destinations, articles)
```sql
CREATE POLICY "Lecture publique"
ON destinations FOR SELECT
TO anon, authenticated
USING (true);
```

#### Lecture des données personnelles uniquement
```sql
CREATE POLICY "Lecture propre profil"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
```

#### Insertion par l'utilisateur connecté
```sql
CREATE POLICY "Insertion par utilisateur connecté"
ON favoris FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
```

#### Modification de ses propres données
```sql
CREATE POLICY "Modification propre contenu"
ON reviews FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

#### Suppression de ses propres données
```sql
CREATE POLICY "Suppression propre contenu"
ON reviews FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
```

#### Accès admin uniquement
```sql
CREATE POLICY "Accès admin"
ON admin_logs FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);
```

### 4. Audit d'une table existante
Pour auditer une table, vérifier :
```sql
-- Lister les policies actives
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'ma_table';

-- Vérifier si RLS est activé
SELECT relname, relrowsecurity
FROM pg_class
WHERE relname = 'ma_table';
```

### 5. Erreurs fréquentes

| Erreur | Cause | Solution |
|--------|-------|----------|
| `new row violates row-level security` | Policy INSERT manquante ou WITH CHECK échoue | Vérifier `WITH CHECK` et `auth.uid()` |
| `permission denied for table` | RLS activé sans policy SELECT | Ajouter une policy SELECT |
| `JWT expired` | Token Supabase expiré | Gérer le refresh token côté client |
| Accès refusé en production seulement | `service_role` non utilisé côté serveur | Utiliser `createClient` avec `service_role` dans les Server Actions |

### 6. Règles de sécurité strictes
- Ne jamais désactiver RLS en production : `ALTER TABLE x DISABLE ROW LEVEL SECURITY;`
- Ne jamais utiliser `USING (true)` sur des tables privées
- Toujours tester avec le rôle `anon` ET `authenticated`
- La clé `service_role` ne doit JAMAIS être dans une variable `NEXT_PUBLIC_`

### 7. Format de la réponse
```
## Politique RLS — [NomTable]

**Opérations couvertes :** SELECT / INSERT / UPDATE / DELETE
**Rôles concernés :** anon / authenticated

[SQL des policies]

### Vérification
[Requête SQL pour auditer les policies créées]
```
