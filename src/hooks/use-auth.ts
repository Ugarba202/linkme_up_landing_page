"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { Profile } from "@/types/profile";

/**
 * Hook for managing authentication state during migration.
 */
export function useAuth() {
  const router = useRouter();
  const { profile, setProfile, setLoading, loading, initialized, setInitialized } = useAuthStore();
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    // During migration, we rely on the persisted store profile
    if (profile) {
      setUser({ id: profile.id });
    }
    setLoading(false);
    setInitialized(true);
  }, [profile, setLoading, setInitialized]);

  const signUp = useCallback(async () => {
     console.log("SignUp called (Migration in progress)");
     return { success: true };
  }, []);

  const signIn = useCallback(async () => {
     console.log("SignIn called (Migration in progress)");
     return { success: true };
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setProfile(null);
    router.push("/");
  }, [router, setProfile]);

  return {
    user,
    profile,
    loading,
    initialized,
    signUp,
    signIn,
    signOut,
  };
}
