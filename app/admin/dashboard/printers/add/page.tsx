import { AdminProductForm } from "@/components/admin/admin-product-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { requireAuth } from "@/lib/auth/require-auth";

export default async function AddPrinterPage() {
  // Check authentication
  await requireAuth();

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/10">
      <AdminNavbar />

      <main className="max-w-10xl w-full mx-auto px-4 py-8">
        <Card className="border-border/50 shadow-lg py-6">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Printer</CardTitle>
            <CardDescription>Add a new printer to your catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminProductForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
