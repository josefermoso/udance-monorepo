export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          location: string | null;
          website: string | null;
          dance_styles: string[] | null;
          experience_level: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          dance_styles?: string[] | null;
          experience_level?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          dance_styles?: string[] | null;
          experience_level?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          event_type: string;
          venue_name: string;
          venue_address: string;
          start_date: string;
          end_date: string;
          price: number | null;
          currency: string;
          max_attendees: number | null;
          current_attendees: number;
          image_url: string | null;
          organizer_id: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          event_type: string;
          venue_name: string;
          venue_address: string;
          start_date: string;
          end_date: string;
          price?: number | null;
          currency?: string;
          max_attendees?: number | null;
          current_attendees?: number;
          image_url?: string | null;
          organizer_id: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          event_type?: string;
          venue_name?: string;
          venue_address?: string;
          start_date?: string;
          end_date?: string;
          price?: number | null;
          currency?: string;
          max_attendees?: number | null;
          current_attendees?: number;
          image_url?: string | null;
          organizer_id?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'events_organizer_id_fkey';
            columns: ['organizer_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          status: string;
          registration_date: string;
          payment_status: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          status?: string;
          registration_date?: string;
          payment_status?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string;
          status?: string;
          registration_date?: string;
          payment_status?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_registrations_event_id_fkey';
            columns: ['event_id'];
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_registrations_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
