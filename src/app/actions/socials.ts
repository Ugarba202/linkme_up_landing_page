"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Database } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Toggle the visibility of a social link.
 */
export async function toggleSocialVisibility(linkId: string, isVisible: boolean) {
  const supabase: SupabaseClient<Database> = createClient();
  
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
 * Update the sort order of social links after drag-and-drop.
 */
export async function updateSocialLinkOrder(orderedIds: string[]) {
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

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

  return { success: true };
}

/**
 * Delete a social link.
 */
export async function deleteSocialLink(linkId: string) {
  const supabase: SupabaseClient<Database> = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await (supabase.from("social_links") as any)
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
