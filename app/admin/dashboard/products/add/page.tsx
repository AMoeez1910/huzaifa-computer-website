import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminNavbar } from "@/components/admin/admin-navbar";

export default async function AddProductPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/10">
      <AdminNavbar />

      <main className="max-w-7xl w-full mx-auto px-4 py-8">
        <Card className="border-border/50 shadow-lg py-6">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Product</CardTitle>
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
