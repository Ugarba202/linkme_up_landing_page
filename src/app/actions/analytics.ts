"use server";

/**
 * Record an analytics event (Stubbed)
 */
export async function trackEvent(userId: string, eventType: "view" | "click") {
  console.log(`Tracking ${eventType} for ${userId} (Migration in progress)`);
  return { success: true };
}
