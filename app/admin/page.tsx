import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/require-auth";

export default async function AdminPage() {
  // Check authentication
  await requireAuth();

  redirect("/admin/dashboard");
}
