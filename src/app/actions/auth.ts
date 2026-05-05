"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Register a new user using the Username-only strategy.
 * This version uses User Metadata + DB Trigger for robust profile creation.
 */
export async function registerUser(formData: FormData) {
  const username = formData.get("username") as string;
  const fullName = formData.get("fullName") as string;
  const bio = formData.get("bio") as string;
  const password = formData.get("password") as string;

  if (!username || !fullName || !password) {
    return { error: "Username, full name, and password are required." };
  }

  // Format username to be safe
  const safeUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, "");
  const mockEmail = `${safeUsername}@gmail.com`;

  const supabase = createClient();

  // 1. Check if username is already taken in the database
  const { data: existingUser } = await (supabase.from("profiles") as any)
    .select("id")
    .eq("username", safeUsername)
    .maybeSingle();

  if (existingUser) {
    return { error: "Username is already taken. Please choose another." };
  }

  // 2. Sign up the user with metadata for the trigger
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: mockEmail,
    password: password,
    options: {
      data: {
        full_name: fullName,
        username: safeUsername,
        bio: bio,
      }
    }
  });

  if (authError || !authData.user) {
    return { error: authError?.message || "Failed to create user." };
  }

  // NOTE: The public.profiles record is now created automatically 
  // by the database trigger!
  
  revalidatePath("/");
  return { success: true };
}

/**
 * Login using the Username-only strategy.
 */
export async function loginUser(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  const safeUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, "");
  const mockEmail = `${safeUsername}@gmail.com`;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: mockEmail,
    password: password,
  });

  if (error) {
    return { error: "Invalid username or password." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

/**
 * Sign out the current user.
 */
export async function logoutUser() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
}
