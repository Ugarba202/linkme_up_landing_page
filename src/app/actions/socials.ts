"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Database } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Toggle the visibility of a social link.
 * This satisfies the requirement: "if a user toggles on a social media it can update without changing link or QR code"
 */
export async function toggleSocialVisibility(linkId: string, isVisible: boolean) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") return { success: true };
  const supabase: SupabaseClient<Database> = createClient();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await (supabase.from("social_links") as any)
    .update({ is_visible: isVisible })
    .eq("id", linkId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  // Revalidate the dashboard and public profile pages to show updates instantly
  revalidatePath("/dashboard/socials");
  
  // We need to fetch the username to revalidate the public route
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
 * Update the sort order of social links after drag-and-drop.
 */
export async function updateSocialLinkOrder(orderedIds: string[]) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") return { success: true };
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  // Prepare bulk update via individual queries (Supabase doesn't support bulk update natively well via REST yet)
  // Since social links are usually < 10, doing them sequentially is okay, 
  // but better to use an rpc if we had one. For now, Promise.all is fine.
  const updatePromises = orderedIds.map((id, index) => 
    (supabase.from("social_links") as any)
      .update({ sort_order: index })
      .eq("id", id)
      .eq("user_id", user.id)
  );

  const results = await Promise.all(updatePromises);
  const errors = results.filter(r => r.error);
  
  if (errors.length > 0) {
    return { error: "Failed to update order for some links." };
  }

  revalidatePath("/dashboard/socials");
  
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
 * Add a new social link.
 */
export async function addSocialLink(formData: FormData) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") return { success: true };
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const platform = formData.get("platform") as string;
  const username = formData.get("username") as string;
  const url = formData.get("url") as string;
  const sortOrder = parseInt(formData.get("sort_order") as string || "0");

  if (!platform || !username || !url) {
    return { error: "All fields are required" };
  }

  const { error } = await (supabase.from("social_links") as any)
    .insert({
      user_id: user.id,
      platform,
      username,
      url,
      sort_order: sortOrder,
      is_visible: true
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/socials");
  
  const { data: profileResult }: any = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();
    
  if (profileResult?.username) {
    revalidatePath(`/u/${profileResult.username}`, "page");
  }

  // Fetch the newly created link to return its ID to the client
  const { data: newLink }: any = await supabase
    .from("social_links")
    .select("*")
    .eq("user_id", user.id)
    .eq("platform", platform)
    .eq("username", username)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return { success: true, data: newLink };
}

/**
 * Delete a social link.
 */
export async function deleteSocialLink(linkId: string) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") return { success: true };
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("social_links")
    .delete()
    .eq("id", linkId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/socials");
  
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
