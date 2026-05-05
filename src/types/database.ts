/**
 * Supabase Database Types
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
        Relationships: [];
      };
      social_links: {
        Row: SocialLinkRow;
        Insert: SocialLinkInsert;
        Update: SocialLinkUpdate;
        Relationships: [];
      };
      analytics: {
        Row: AnalyticsRow;
        Insert: AnalyticsInsert;
        Update: never;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_counter: {
        Args: {
          row_id: string;
          column_name: string;
        };
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export interface ProfileRow {
  id: string;
  full_name: string;
  username: string | null;
  bio: string;
  avatar_url: string | null;
  banner_url: string | null;
  public_url: string | null;
  profile_completed: boolean;
  email: string;
  views: number;
  clicks: number;
  is_qr_generated: boolean;
  qr_generated_at: string | null;
  created_at: string;
}

export interface ProfileInsert {
  id: string;
  full_name?: string;
  username?: string | null;
  bio?: string;
  avatar_url?: string | null;
  banner_url?: string | null;
  public_url?: string | null;
  profile_completed?: boolean;
  email?: string;
  views?: number;
  clicks?: number;
  is_qr_generated?: boolean;
  qr_generated_at?: string | null;
  created_at?: string;
}

export interface ProfileUpdate {
  full_name?: string;
  username?: string | null;
  bio?: string;
  avatar_url?: string | null;
  banner_url?: string | null;
  public_url?: string | null;
  profile_completed?: boolean;
  views?: number;
  clicks?: number;
  is_qr_generated?: boolean;
  qr_generated_at?: string | null;
}

export interface SocialLinkRow {
  id: string;
  user_id: string;
  platform: string;
  username: string;
  url: string;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface SocialLinkInsert {
  id?: string;
  user_id: string;
  platform: string;
  username: string;
  url: string;
  is_visible?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface SocialLinkUpdate {
  platform?: string;
  username?: string;
  url?: string;
  is_visible?: boolean;
  sort_order?: number;
}

export interface AnalyticsRow {
  id: string;
  user_id: string;
  event_type: "view" | "click";
  created_at: string;
}

export interface AnalyticsInsert {
  user_id: string;
  event_type: "view" | "click";
}
