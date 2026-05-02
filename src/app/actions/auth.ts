"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Register a new user using the Username-only strategy.
 * 
 * Supabase Auth requires an email, so we generate a mock email
 * behind the scenes: [username]@linkmeup.local
 */
export async function registerUser(formData: FormData) {
  const username = formData.get("username") as string;
  const fullName = formData.get("fullName") as string;
  const bio = formData.get("bio") as string;
  const password = formData.get("password") as string;

  if (!username || !fullName || !password) {
    return { error: "Username, full name, and password are required." };
  }

  // Format username to be safe (lowercase, alphanumeric + underscores only)
  const safeUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, "");
  const mockEmail = `${safeUsername}@linkmeup.app`;

  const supabase = createClient();

  // 1. Check if username is already taken in the database first
  // (We do this to prevent creating an Auth user if the profile insert will fail anyway)
  const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", safeUsername)
    .single();

  if (existingUser) {
    return { error: "Username is already taken. Please choose another." };
  }

  // 2. Sign up via Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: mockEmail,
    password: password,
    options: {
      data: {
        username: safeUsername,
        full_name: fullName,
      }
    }
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Failed to create user account." };
  }

  // 3. Insert into public.profiles table
  const { error: profileError } = await (supabase.from("profiles") as any)
    .insert({
      id: authData.user.id,
      username: safeUsername,
      full_name: fullName,
      bio: bio || "",
      email: mockEmail,
      profile_completed: true,
      country: "Unknown", // Default or you can add to form
      phone_number: "", // Default
    });

  if (profileError) {
    // If profile creation fails, the user is still in Auth, but we return the error.
    return { error: profileError.message };
  }

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
  const mockEmail = `${safeUsername}@linkmeup.app`;

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
