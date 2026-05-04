"use server";

import { revalidatePath } from "next/cache";

/**
 * Register a new user (Stubbed for migration)
 */
export async function registerUser(formData: FormData) {
  // Logic will be moved to Prisma + Custom Auth
  console.log("Registering user (Migration in progress)");
  return { success: true };
}

/**
 * Login (Stubbed for migration)
 */
export async function loginUser(formData: FormData) {
  console.log("Logging in (Migration in progress)");
  return { success: true };
}

/**
 * Sign out (Stubbed for migration)
 */
export async function logoutUser() {
  console.log("Logging out (Migration in progress)");
  revalidatePath("/");
}
