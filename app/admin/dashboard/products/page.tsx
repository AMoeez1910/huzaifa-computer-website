import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminProductList } from "@/components/admin/admin-product-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ProductsPage() {
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">All Products</CardTitle>
                <CardDescription>Manage your printer inventory</CardDescription>
              </div>
              <Button asChild>
                <Link href="/admin/dashboard/products/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <AdminProductList />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
