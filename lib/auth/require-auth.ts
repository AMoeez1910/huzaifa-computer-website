import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Check if the current user is authenticated as an admin
 * If not authenticated, redirects to login page
 * @returns The authenticated user data
 */
export async function requireAuth() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/admin/login");
  }

  return data.user;
}
