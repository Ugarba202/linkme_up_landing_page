"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { profileToUpdate } from "@/types/profile";
import type { Profile } from "@/types/profile";
import type { Database } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Update the user's profile information (Full Name, Bio, etc.)
 */
export async function updateProfile(data: Partial<Profile>) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") return { success: true };
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  // Use the existing mapper to convert camelCase to snake_case for Postgres
  const updates = profileToUpdate(data);

  if (Object.keys(updates).length === 0) {
    return { success: true }; // Nothing to update
  }

  // BUG FIX 1: Synchronize public_url if username is changing
  if (updates.username) {
    updates.public_url = `https://linkmeup.app/u/${updates.username}`;
  }

  const { error } = await (supabase.from("profiles") as any)
    .update(updates)
    .eq("id", user.id);

  if (error) {
    // Check for unique constraint violation on username
    if (error.code === "23505") {
      return { error: "This username is already taken. Please choose another." };
    }
    return { error: error.message };
  }

  revalidatePath("/dashboard/profile");
  
  // Also revalidate public profile if username is available
  const { data: profileResult }: any = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profileResult?.username) {
    revalidatePath(`/u/${profileResult.username}`, "page");
    revalidatePath("/dashboard", "layout"); 
  }

  return { success: true };
}

/**
 * Update the profile avatar URL.
 * Note: Actual file upload to Supabase Storage should happen on the client
 * or via a separate action, then the URL is saved here.
 */
export async function updateAvatarUrl(url: string) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") return { success: true };
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await (supabase.from("profiles") as any)
    .update({ avatar_url: url })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/profile");
  
  const { data: profileResult }: any = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profileResult?.username) {
    revalidatePath(`/u/${profileResult.username}`, "page");
  }

  return { success: true };
}
