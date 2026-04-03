---
name: docs
description: Génère des commentaires JSDoc clairs et utiles pour les composants React, hooks, fonctions utilitaires et types TypeScript du projet JapanGuides.
---

# Skill : docs

## Objectif
Documenter le code avec des commentaires JSDoc pertinents, concis et maintenables. La documentation doit expliquer le **pourquoi** et le **comment**, pas paraphraser le code.

## Stack cible
- TypeScript / React
- Next.js 14+ (App Router)
- Supabase

## Instructions

### 1. Quoi documenter
| Obligatoire | Optionnel |
|-------------|-----------|
| Fonctions utilitaires publiques | Composants simples et auto-explicatifs |
| Hooks custom | Getters/setters évidents |
| Types et interfaces complexes | Variables simples |
| Fonctions avec logique métier non évidente | |
| API routes / Server Actions | |
| Configurations importantes | |

### 2. Template — Composant React
```tsx
/**
 * Affiche une carte de destination avec image, titre et région.
 *
 * @param title - Nom de la destination (affiché en titre)
 * @param image - URL de l'image principale
 * @param region - Région géographique (ex: "Kanto", "Kyushu")
 * @param onClick - Callback déclenché au clic sur la carte
 *
 * @example
 * <DestinationCard
 *   title="Tokyo"
 *   image="/images/tokyo.jpg"
 *   region="Kanto"
 *   onClick={() => router.push('/destinations/tokyo')}
 * />
 */
const DestinationCard: FC<DestinationCardProps> = ({ title, image, region, onClick }) => {
```

### 3. Template — Hook custom
```ts
/**
 * Récupère la liste des destinations depuis Supabase avec filtrage optionnel.
 *
 * @param region - Filtre par région géographique (optionnel)
 * @returns Un objet contenant les destinations, l'état de chargement et les erreurs éventuelles
 *
 * @example
 * const { destinations, loading, error } = useDestinations('Kanto')
 */
export const useDestinations = (region?: string) => {
```

### 4. Template — Fonction utilitaire
```ts
/**
 * Formate une date ISO en format lisible français.
 *
 * @param isoDate - Date au format ISO 8601 (ex: "2024-03-15T10:30:00Z")
 * @param options - Options de formatage Intl.DateTimeFormatOptions (optionnel)
 * @returns La date formatée (ex: "15 mars 2024")
 *
 * @throws {Error} Si la date fournie n'est pas valide
 *
 * @example
 * formatDate('2024-03-15T10:30:00Z') // → "15 mars 2024"
 * formatDate('2024-03-15T10:30:00Z', { year: 'numeric', month: 'short' }) // → "mars 2024"
 */
export const formatDate = (isoDate: string, options?: Intl.DateTimeFormatOptions): string => {
```

### 5. Template — Interface/Type
```ts
/**
 * Représente une destination de voyage au Japon.
 * Correspond à la table `destinations` dans Supabase.
 */
interface Destination {
  /** Identifiant unique UUID */
  id: string
  /** Nom de la destination en français */
  name: string
  /** Région géographique (ex: "Kanto", "Kansai") */
  region: string
  /** URL de l'image principale */
  imageUrl: string
  /** Indique si la destination est mise en avant sur la page d'accueil */
  featured: boolean
  /** Date de création dans la base de données */
  createdAt: string
}
```

### 6. Template — Server Action / API Route
```ts
/**
 * Ajoute une destination aux favoris de l'utilisateur connecté.
 *
 * @server Cette fonction s'exécute côté serveur (Server Action)
 * @requires Authentification Supabase (session active)
 *
 * @param destinationId - ID de la destination à ajouter
 * @returns `{ success: true }` ou `{ error: string }` en cas d'échec
 *
 * @throws Redirige vers `/login` si l'utilisateur n'est pas connecté
 */
export async function addToFavorites(destinationId: string) {
```

### 7. Règles de qualité
- **Pas de commentaires évidents** : `// incrémente i` sur `i++` = inutile
- **Expliquer le "pourquoi"** pas le "quoi" pour la logique complexe
- **Exemples d'usage** pour toutes les fonctions publiques
- **Français** pour les descriptions, **anglais** uniquement pour les noms de paramètres
- Pas de JSDoc sur les composants simples de moins de 10 lignes
- Mentionner les effets de bord importants (`@throws`, `@requires`, `@server`)

### 8. Format de la réponse
Retourner le code **avec les commentaires JSDoc ajoutés**, sans modifier la logique.
Signaler les endroits où la documentation serait particulièrement utile mais manquante.
