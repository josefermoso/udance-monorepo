import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@udance/shared';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      loading: true,

      signIn: async (email: string, password: string) => {
        const supabase = createClient();
        set({ loading: true });

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          set({
            user: data.user,
            session: data.session,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      signUp: async (email: string, password: string) => {
        const supabase = createClient();
        set({ loading: true });

        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) throw error;

          set({
            user: data.user,
            session: data.session,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      signOut: async () => {
        const supabase = createClient();
        set({ loading: true });

        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;

          set({
            user: null,
            session: null,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      signInWithGoogle: async () => {
        const supabase = createClient();
        set({ loading: true });

        try {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) throw error;
          // Loading will be set to false by the auth state change
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      setUser: (user: User | null) => set({ user }),
      setSession: (session: Session | null) => set({ session }),
      setLoading: (loading: boolean) => set({ loading }),
    }),
    {
      name: 'udance-auth',
      // Only persist user and session, not loading state
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
);
