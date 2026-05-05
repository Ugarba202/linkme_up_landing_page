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
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const updates = profileToUpdate(data);

  if (Object.keys(updates).length === 0) {
    return { success: true };
  }

  // Synchronize public_url if username is changing
  if (updates.username) {
    updates.public_url = `https://linkmeup.app/u/${updates.username}`;
  }

  const { error } = await (supabase.from("profiles") as any)
    .update(updates)
    .eq("id", user.id);

  if (error) {
    if (error.code === "23505") {
      return { error: "This username is already taken. Please choose another." };
    }
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
    revalidatePath("/dashboard", "layout"); 
  }

  return { success: true };
}

/**
 * Update the profile avatar URL.
 */
export async function updateAvatarUrl(url: string) {
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

/**
 * Update the profile banner URL.
 */
export async function updateBannerUrl(url: string) {
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await (supabase.from("profiles") as any)
    .update({ banner_url: url })
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

/**
 * Mark the QR code as generated/claimed.
 */
export async function setQrGenerated() {
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await (supabase.from("profiles") as any)
    .update({ 
      is_qr_generated: true,
      qr_generated_at: new Date().toISOString()
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/qr");
  return { success: true };
}
