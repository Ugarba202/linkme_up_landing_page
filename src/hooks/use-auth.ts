"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { Profile } from "@/types/profile";

/**
 * Hook for managing authentication state.
 * MOCKED FOR FRONTEND TESTING: Disconnected from backend entirely.
 */
export function useAuth() {
  const router = useRouter();
  const { profile, setProfile, setLoading, loading, initialized, setInitialized } = useAuthStore();
  const [user, setUser] = useState<{ id: string } | null>(null);

  // Real Initialization
  useEffect(() => {
    const initAuth = async () => {
      // ─── Demo Mode Check ──────────────────────────────────────────────────
      const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
      
      if (isDemoMode && !profile) {
        const mockProfile: Profile = {
          id: "demo-user-id",
          username: "ugarba202",
          fullName: "Usman Umar Garba",
          bio: "Senior Software Engineer | LinkMeUp Team Lead",
          avatarUrl: "https://github.com/ugarba202.png",
          profileCompleted: true,
          socialLinks: [
            { id: "1", platform: "instagram", username: "ugarba202", url: "https://instagram.com/ugarba202", is_visible: true, sort_order: 0, created_at: new Date().toISOString(), user_id: "demo-user-id" },
            { id: "2", platform: "twitter", username: "ugarba202", url: "https://twitter.com/ugarba202", is_visible: true, sort_order: 1, created_at: new Date().toISOString(), user_id: "demo-user-id" },
            { id: "3", platform: "linkedin", username: "ugarba202", url: "https://linkedin.com/in/ugarba202", is_visible: true, sort_order: 2, created_at: new Date().toISOString(), user_id: "demo-user-id" }
          ] as any,
          views: 1245,
          clicks: 450,
          createdAt: new Date(),
          country: "Nigeria",
          bannerUrl: "",
          publicUrl: "https://linkmeup.app/u/ugarba202",
          email: "ugarba202@linkmeup.app",
          phoneNumber: "+2348000000000",
          isQrGenerated: true,
          qrGeneratedAt: new Date()
        };
        
        setProfile(mockProfile);
        setLoading(false);
        setInitialized(true);
        return;
      }

      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser({ id: session.user.id });
        
        // Fetch profile
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

  const signUp = useCallback(async (
    email: string, 
    pass: string, 
    username?: string,
    fullName?: string,
    bio?: string,
    avatarUrl?: string
  ) => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    // Mock local profile creation
    const mockId = Math.random().toString(36).substring(7);
    setUser({ id: mockId });
    
    const newProfile: Profile = {
      id: mockId,
      username: username ?? "",
      fullName: fullName ?? "",
      bio: bio ?? "",
      avatarUrl: avatarUrl ?? "",
      profileCompleted: false,
      socialLinks: [],
      views: 0,
      clicks: 0,
      createdAt: new Date(),
      country: "US",
      bannerUrl: "",
      publicUrl: username ? `https://linkmeup.app/u/${username}` : null,
      email: email,
      phoneNumber: "",
      isQrGenerated: false,
      qrGeneratedAt: null
    };
    
    // Set mock cookie for middleware bypass
    document.cookie = "linkmeup-mock-session=true; path=/; max-age=3600; SameSite=Lax";
    
    setProfile(newProfile);
    setLoading(false);
    
    // Jump straight to setup (which will now show Socials only)
    router.push("/setup");
  }, [router, setLoading, setProfile]);

  const signIn = useCallback(async (email: string, pass: string) => {
     setLoading(true);
     await new Promise((r) => setTimeout(r, 800));

     const mockId = Math.random().toString(36).substring(7);
     setUser({ id: mockId });
     
     // Extract "username" from the derived test email 
     const username = email.split("@")[0];

     const mockProfile: Profile = {
       id: mockId,
       username: username,
       fullName: "Test User",
       bio: "This is a frontend test mode.",
       avatarUrl: "",
       profileCompleted: true,
       socialLinks: [],
       views: 120,
       clicks: 45,
       createdAt: new Date(),
       country: "US",
       bannerUrl: "",
       publicUrl: `https://linkmeup.app/u/${username}`,
       email: email,
       phoneNumber: "",
       isQrGenerated: true,
       qrGeneratedAt: new Date()
     };

     // Set mock cookie for middleware bypass
     document.cookie = "linkmeup-mock-session=true; path=/; max-age=3600; SameSite=Lax";

     setProfile(mockProfile);
     setLoading(false);
     
     // Return data mock
     return { user: { id: mockId } };
  }, [setLoading, setProfile]);

  const signOut = useCallback(async () => {
    // Clear mock cookie
    document.cookie = "linkmeup-mock-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    
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
