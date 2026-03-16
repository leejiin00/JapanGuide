// types/database.ts
// ─────────────────────────────────────────────────────────────────────────────

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type QuickFact = { label: string; value: string }

// ─── Destination types ────────────────────────────────────────────────────────

export type DestinationRow = {
  id:               string
  slug:             string
  kanji:            string
  name:             string
  subtitle:         string
  region:           string
  description:      string
  long_description: string
  hero_gradient:    string
  accent_color:     string
  secondary_color:  string
  shadow_color:     string
  tags:             string[]
  icon:             string
  best_months:      string
  budget:           string
  language:         string
  timezone:         string
  quick_facts:      Json
  published:        boolean
  created_at:       string
  updated_at:       string
}

export type HotelRow = {
  id:             string
  destination_id: string
  name:           string
  type:           string
  price_range:    string
  stars:          number
  description:    string
  highlights:     string[]
  accent_color:   string
  sort_order:     number
  created_at:     string
  updated_at:     string
}

export type ActivityRow = {
  id:             string
  destination_id: string
  name:           string
  category:       string
  duration:       string
  difficulty:     string
  description:    string
  best_time:      string
  icon:           string
  accent_color:   string
  sort_order:     number
  created_at:     string
  updated_at:     string
}

export type ReviewRow = {
  id:             string
  destination_id: string
  author:         string
  country:        string
  flag:           string
  rating:         number
  review_date:    string
  body:           string
  highlight:      string
  approved:       boolean
  created_at:     string
  updated_at:     string
}

export type DestinationWithStats = DestinationRow & {
  hotel_count:    number
  activity_count: number
  review_count:   number
  avg_rating:     number | null
}

export type DestinationFull = DestinationRow & {
  hotels:     HotelRow[]
  activities: ActivityRow[]
  reviews:    ReviewRow[]
}

export type ReviewInsert = {
  destination_id: string
  author:         string
  country:        string
  flag:           string
  rating:         number
  review_date:    string
  body:           string
  highlight:      string
}

// ─── App types ────────────────────────────────────────────────────────────────

export type AppCategory =
  | 'transport'
  | 'traduction'
  | 'paiement'
  | 'hebergement'
  | 'nourriture'
  | 'communication'
  | 'culture'

export type AppRow = {
  id:               string
  name:             string
  slug:             string
  description:      string
  long_description: string
  category:         AppCategory
  icon_url:         string
  icon_emoji:       string
  accent_color:     string
  price_type:       'gratuit' | 'payant' | 'freemium'
  price_detail:     string
  url_appstore:     string
  url_playstore:    string
  url_website:      string
  available_offline: boolean
  essential:        boolean
  published:        boolean
  sort_order:       number
  created_at:       string
  updated_at:       string
}

export type AppReviewRow = {
  id:         string
  app_id:     string
  author:     string
  country:    string
  flag:       string
  rating:     number
  body:       string
  approved:   boolean
  created_at: string
  updated_at: string
}

export type AppWithStats = AppRow & {
  review_count: number
  avg_rating:   number | null
}

export type AppFull = AppRow & {
  app_reviews: AppReviewRow[]
}

// ─── Database type ────────────────────────────────────────────────────────────

export type Database = {
  public: {
    Tables: {
      destinations: {
        Row:    DestinationRow
        Insert: Omit<DestinationRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; published?: boolean }
        Update: Partial<Omit<DestinationRow, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
      hotels: {
        Row:    HotelRow
        Insert: Omit<HotelRow, 'id' | 'created_at' | 'updated_at'> & { id?: string }
        Update: Partial<Omit<HotelRow, 'id' | 'created_at' | 'updated_at'>>
        Relationships: [{ foreignKeyName: 'hotels_destination_id_fkey'; columns: ['destination_id']; referencedRelation: 'destinations'; referencedColumns: ['id'] }]
      }
      activities: {
        Row:    ActivityRow
        Insert: Omit<ActivityRow, 'id' | 'created_at' | 'updated_at'> & { id?: string }
        Update: Partial<Omit<ActivityRow, 'id' | 'created_at' | 'updated_at'>>
        Relationships: [{ foreignKeyName: 'activities_destination_id_fkey'; columns: ['destination_id']; referencedRelation: 'destinations'; referencedColumns: ['id'] }]
      }
      reviews: {
        Row:    ReviewRow
        Insert: Omit<ReviewRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; approved?: boolean }
        Update: Partial<Omit<ReviewRow, 'id' | 'created_at' | 'updated_at'>>
        Relationships: [{ foreignKeyName: 'reviews_destination_id_fkey'; columns: ['destination_id']; referencedRelation: 'destinations'; referencedColumns: ['id'] }]
      }
      apps: {
        Row:    AppRow
        Insert: Omit<AppRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; published?: boolean }
        Update: Partial<Omit<AppRow, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
      app_reviews: {
        Row:    AppReviewRow
        Insert: Omit<AppReviewRow, 'id' | 'created_at' | 'updated_at'> & { id?: string; approved?: boolean }
        Update: Partial<Omit<AppReviewRow, 'id' | 'created_at' | 'updated_at'>>
        Relationships: [{ foreignKeyName: 'app_reviews_app_id_fkey'; columns: ['app_id']; referencedRelation: 'apps'; referencedColumns: ['id'] }]
      }
    }
    Views: {
      destinations_with_stats: {
        Row: DestinationWithStats
        Relationships: []
      }
      apps_with_stats: {
        Row: AppWithStats
        Relationships: []
      }
    }
    Functions:      Record<string, never>
    Enums:          Record<string, never>
    CompositeTypes: Record<string, never>
  }
}