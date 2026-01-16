import { redirect } from "next/navigation";
import { AdminAccessoryForm } from "@/components/admin/admin-accessory-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { getAccessory } from "@/server-api/accessories";
import { requireAuth } from "@/lib/auth/require-auth";

export default async function EditAccessoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Check authentication
  await requireAuth();

  const { id } = await params;
  const accessory = await getAccessory(id);

  if (!accessory) {
    redirect("/admin/dashboard?tab=accessories");
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/10">
      <AdminNavbar />

      <main className="max-w-7xl w-full mx-auto px-4 py-8">
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Accessory</CardTitle>
            <CardDescription>
              Update the details for {accessory.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminAccessoryForm key={accessory.id} editAccessory={accessory} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
