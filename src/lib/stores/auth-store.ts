import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "@/types/profile";
import type { SocialLink } from "@/types/profile";

interface AuthState {
  /** The current user profile, null if not authenticated */
  profile: Profile | null;
  /** Whether the auth state has been initialized */
  initialized: boolean;
  /** Whether authentication is currently loading */
  loading: boolean;

  // Actions
  setProfile: (profile: Profile | null) => void;
  updateProfileData: (data: Partial<Profile>) => void;
  updateSocialLinks: (links: SocialLink[]) => void;
  setInitialized: (initialized: boolean) => void;
  setLoading: (loading: boolean) => void;
  getProfileByUsername: (username: string) => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      initialized: false,
      loading: true,

      setProfile: (profile) => set({ profile }),
      updateProfileData: (data) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...data } : null
      })),
      updateSocialLinks: (links) => set((state) => ({
        profile: state.profile ? { ...state.profile, socialLinks: links } : null
      })),
      setInitialized: (initialized) => set({ initialized }),
      setLoading: (loading) => set({ loading }),
      getProfileByUsername: async (username: string) => {
        set({ loading: true });
        
        try {
          // Use dynamic import to avoid bundling supabase/client in the main store initial load
          const { createClient } = await import("@/lib/supabase/client");
          const supabase = createClient();
          
          const { data: profileRow, error: profileError } = await (supabase.from("profiles") as any)
            .select("*")
            .eq("username", username)
            .maybeSingle();

          if (profileError || !profileRow) {
            set({ profile: null, loading: false });
            return;
          }

          const { data: linkRows } = await supabase
            .from("social_links")
            .select("*")
            .eq("user_id", profileRow.id)
            .order("sort_order", { ascending: true });

          const { profileFromRow } = await import("@/types/profile");
          const profile = profileFromRow(profileRow, linkRows || []);
          
          set({ profile, loading: false });
        } catch (err) {
          console.error("Error fetching profile:", err);
          set({ profile: null, loading: false });
        }
      },
      reset: () =>
        set({
          profile: null,
          initialized: false,
          loading: false,
        }),
    }),
    {
      name: "linkmeup-auth-storage", // unique name
    }
  )
);
