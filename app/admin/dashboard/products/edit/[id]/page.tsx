import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminNavbar } from "@/components/admin/admin-navbar";

async function getProduct(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/10">
      <AdminNavbar />

      <main className="max-w-7xl w-full mx-auto px-4 py-8">
        <Card className="border-border/50 shadow-lg py-6">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Product</CardTitle>
            <CardDescription>
              Update product details for {product.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminProductForm key={product.id} editProduct={product} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
