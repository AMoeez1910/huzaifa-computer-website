import { AdminNavbar } from "@/components/admin/admin-navbar";
import { AdminInventory } from "@/components/admin/admin-inventory";
import { requireAuth } from "@/lib/auth/require-auth";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default async function AdminDashboardPage() {
  // Check authentication
  await requireAuth();

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/10">
      <AdminNavbar />

      <main className="max-w-10xl w-full mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          }
        >
          <AdminInventory />
        </Suspense>
      </main>
    </div>
  );
}
