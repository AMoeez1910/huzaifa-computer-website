import { notFound } from "next/navigation";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { getPrinter } from "@/server-api/printers";
import { requireAuth } from "@/lib/auth/require-auth";

export default async function EditPrinterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Check authentication
  await requireAuth();

  const { id } = await params;
  const printer = await getPrinter(id);

  if (!printer) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/10">
      <AdminNavbar />

      <main className="max-w-7xl w-full mx-auto px-4 py-8">
        <Card className="border-border/50 shadow-lg py-6">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Printer</CardTitle>
            <CardDescription>
              Update printer details for {printer.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminProductForm key={printer.id} editProduct={printer} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
