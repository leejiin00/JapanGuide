---
name: deploy-check
description: Audit pré-déploiement Vercel — détecte les console.log, variables d'env exposées, warnings TypeScript, imports inutilisés et tout ce qui peut faire échouer ou dégrader un build Next.js.
---

# Skill : deploy-check

## Objectif
Scanner le projet avant un déploiement Vercel pour détecter et corriger tous les problèmes qui peuvent :
- Faire **échouer le build**
- **Exposer des données sensibles**
- **Dégrader les performances** en production
- Générer des **warnings/erreurs runtime**

## Stack cible
- Next.js 14+ (App Router)
- TypeScript
- Supabase
- Vercel

## Instructions

### 1. Lancer l'audit
Exécuter dans l'ordre :
```bash
# 1. Vérifier les erreurs TypeScript
npx tsc --noEmit

# 2. Vérifier les règles ESLint
npm run lint

# 3. Tester le build en local
npm run build
```

### 2. Checklist de détection

#### A. console.log / debugs oubliés
Rechercher dans tous les fichiers `.ts`, `.tsx` :
```bash
grep -rn "console\." src/ app/ components/ lib/ --include="*.ts" --include="*.tsx"
```
Supprimer ou remplacer par un logger conditionnel :
```ts
// Remplacer
console.log('debug', data)

// Par
if (process.env.NODE_ENV === 'development') {
  console.log('debug', data)
}
```

#### B. Variables d'environnement exposées
- Toute clé secrète avec `NEXT_PUBLIC_` = **CRITIQUE**
- Vérifier `.env.local`, `.env.production`
```bash
# Chercher les secrets potentiellement exposés
grep -rn "NEXT_PUBLIC_SUPABASE_SERVICE" .env* 2>/dev/null
grep -rn "NEXT_PUBLIC_" .env.local
```
**Règle stricte :**
| Variable | Côté autorisé |
|----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Serveur uniquement ❌ jamais NEXT_PUBLIC_ |
| Tous les secrets API | Serveur uniquement ❌ |

#### C. Imports inutilisés (impact bundle size)
```bash
npm run lint -- --rule "no-unused-vars: error"
```
Supprimer tous les imports non utilisés.

#### D. Images non optimisées
Rechercher les `<img>` natifs qui devraient être `next/image` :
```bash
grep -rn "<img " app/ components/ --include="*.tsx"
```

#### E. Clés manquantes dans les listes React
```bash
grep -rn "\.map(" app/ components/ --include="*.tsx"
```
Vérifier que chaque `.map()` a une prop `key` unique.

#### F. useEffect sans dépendances correctes
Repérer les patterns dangereux :
```bash
grep -rn "useEffect" app/ components/ --include="*.tsx" -A 3
```

#### G. Fichiers `.env` committé par erreur
```bash
git status
git log --oneline -10
# Vérifier .gitignore
grep ".env" .gitignore
```

#### H. Liens `href` cassés ou dynamiques non sécurisés
```bash
grep -rn "href=" app/ components/ --include="*.tsx" | grep -v "next/link"
```

#### I. `any` TypeScript en production
```bash
grep -rn ": any" app/ components/ lib/ --include="*.ts" --include="*.tsx"
grep -rn "as any" app/ components/ lib/ --include="*.ts" --include="*.tsx"
```

#### J. Build warnings Vercel
Après `npm run build`, vérifier :
- Pages avec `generateStaticParams` manquant
- Métadonnées (`metadata`) manquantes sur les pages principales
- Images sans `alt`

### 3. Rapport de sortie
```
## Deploy Check — [Date]

### Statut global : ✅ Prêt / ⚠️ Warnings / ❌ Bloquant

### Critiques (à corriger avant deploy)
- [ ] ...

### Warnings (à corriger rapidement)
- [ ] ...

### Infos
- [ ] ...

### Commandes de vérification
- TypeScript : ✅ / ❌
- ESLint : ✅ / ❌
- Build : ✅ / ❌
```

### 4. Actions rapides de nettoyage
```bash
# Supprimer tous les console.log (attention : vérifier avant)
grep -rn "console\.log" app/ components/ lib/ --include="*.ts" --include="*.tsx" -l

# Vérifier le bundle size après build
npm run build 2>&1 | grep "First Load JS"
```
