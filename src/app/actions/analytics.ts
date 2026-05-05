"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Record an analytics event (view or click).
 */
export async function trackEvent(userId: string, eventType: "view" | "click") {
  const supabase = createClient();

  // 1. Record the event in the analytics table
  const { error: analyticsError } = await (supabase.from("analytics") as any)
    .insert({
      user_id: userId,
      event_type: eventType,
    });

  if (analyticsError) {
    console.error(`Failed to record analytics event: ${analyticsError.message}`);
    return { error: analyticsError.message };
  }

  // 2. Increment the aggregate counter on the profile table for fast reads
  const column = eventType === "view" ? "views" : "clicks";
  
  const { error: counterError } = await (supabase as any).rpc('increment_counter', {
    row_id: userId,
    column_name: column
  });

  if (counterError) {
    // Fallback to manual update if RPC fails
    const { data: profile } = await (supabase.from("profiles") as any)
      .select(column)
      .eq("id", userId)
      .single();

    if (profile) {
      await (supabase.from("profiles") as any)
        .update({ [column]: (profile[column] || 0) + 1 } as any)
        .eq("id", userId);
    }
  }

  return { success: true };
}
