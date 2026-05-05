"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { Profile } from "@/types/profile";

/**
 * Hook for managing authentication state.
 */
export function useAuth() {
  const router = useRouter();
  const { profile, setProfile, setLoading, loading, initialized, setInitialized } = useAuthStore();
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
      
      if (isDemoMode && !profile) {
        // ... (Keep demo logic if needed, but for now we focus on live)
      }

      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser({ id: session.user.id });
        
        const { data: profileRow } = await (supabase.from("profiles") as any)
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();
          
        if (profileRow) {
          const { data: linkRows } = await supabase
            .from("social_links")
            .select("*")
            .eq("user_id", profileRow.id)
            .order("sort_order", { ascending: true });

          const { profileFromRow } = await import("@/types/profile");
          setProfile(profileFromRow(profileRow, linkRows || []));
        }
      }

      setLoading(false);
      setInitialized(true);
    };

    initAuth();
  }, [setLoading, setInitialized, setProfile, profile]);

  const signOut = useCallback(async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    
    setUser(null);
    setProfile(null);
    router.push("/");
  }, [router, setProfile]);

  return {
    user,
    profile,
    loading,
    initialized,
    signOut,
  };
}
