import { AdminAccessoryForm } from "@/components/admin/admin-accessory-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { requireAuth } from "@/lib/auth/require-auth";

export default async function AddAccessoryPage() {
  // Check authentication
  await requireAuth();

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/10">
      <AdminNavbar />

      <main className="max-w-7xl w-full mx-auto px-4 py-8">
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Accessory</CardTitle>
            <CardDescription>
              Fill in the details to add a new accessory to your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminAccessoryForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
