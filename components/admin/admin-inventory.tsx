"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Trash2, Pencil, Plus, Printer, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type TabType = "printers" | "accessories";

export function AdminInventory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as TabType) || "printers";

  // Combined state
  const [printers, setPrinters] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
    type: TabType;
  } | null>(null);

  // Fetch all data once on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [printersRes, accessoriesRes] = await Promise.all([
        fetch("/api/printers"),
        fetch("/api/accessories"),
      ]);

      if (!printersRes.ok) throw new Error("Failed to fetch printers");
      if (!accessoriesRes.ok) throw new Error("Failed to fetch accessories");

      const [printersData, accessoriesData] = await Promise.all([
        printersRes.json(),
        accessoriesRes.json(),
      ]);

      setPrinters(printersData.printers || []);
      setAccessories(accessoriesData.accessories || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    setDeleting(itemToDelete.id);

    try {
      const endpoint =
        itemToDelete.type === "printers"
          ? `/api/admin/printers?id=${itemToDelete.id}`
          : `/api/admin/accessories?id=${itemToDelete.id}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error(`Failed to delete ${itemToDelete.type}`);

      if (itemToDelete.type === "printers") {
        setPrinters(printers.filter((p) => p.id !== itemToDelete.id));
      } else {
        setAccessories(accessories.filter((a) => a.id !== itemToDelete.id));
      }

      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to delete ${itemToDelete.type}`
      );
    } finally {
      setDeleting(null);
    }
  };

  const openDeleteDialog = (id: string, name: string, type: TabType) => {
    setItemToDelete({ id, name, type });
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const setTab = (tab: TabType) => {
    router.push(`/admin/dashboard?tab=${tab}`);
  };

  return (
    <>
      <Card className="border-border/50 shadow-lg py-6">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Tabs */}
            <div className="flex gap-2">
              <Button
                variant={activeTab === "printers" ? "default" : "outline"}
                onClick={() => setTab("printers")}
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                Printers
                {!isLoading && (
                  <Badge variant="secondary" className="ml-1">
                    {printers.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant={activeTab === "accessories" ? "default" : "outline"}
                onClick={() => setTab("accessories")}
                className="gap-2"
              >
                <Package className="h-4 w-4" />
                Accessories
                {!isLoading && (
                  <Badge variant="secondary" className="ml-1">
                    {accessories.length}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Add Button */}
            <Button asChild>
              <Link
                href={
                  activeTab === "printers"
                    ? "/admin/dashboard/printers/add"
                    : "/admin/dashboard/accessories/add"
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Add {activeTab === "printers" ? "Printer" : "Accessory"}
              </Link>
            </Button>
          </div>

          <div className="mt-4">
            <CardTitle className="text-2xl">
              {activeTab === "printers" ? "All Printers" : "All Accessories"}
            </CardTitle>
            <CardDescription>
              {activeTab === "printers"
                ? "Manage your printer inventory"
                : "Manage your accessories inventory"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md mb-4">
              {error}
            </p>
          )}

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : activeTab === "printers" ? (
            <PrintersTable
              printers={printers}
              deleting={deleting}
              onDelete={(printer) =>
                openDeleteDialog(printer.id, printer.name, "printers")
              }
              onEdit={(printer) =>
                router.push(`/admin/dashboard/printers/edit/${printer.id}`)
              }
            />
          ) : (
            <AccessoriesTable
              accessories={accessories}
              deleting={deleting}
              onDelete={(accessory) =>
                openDeleteDialog(accessory.id, accessory.name, "accessories")
              }
              onEdit={(accessory) =>
                router.push(`/admin/dashboard/accessories/edit/${accessory.id}`)
              }
            />
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete{" "}
              {itemToDelete?.type === "printers" ? "Printer" : "Accessory"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{itemToDelete?.name}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting !== null}
            >
              {deleting !== null ? <Spinner /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Printers Table Component
function PrintersTable({
  printers,
  deleting,
  onDelete,
  onEdit,
}: {
  printers: Product[];
  deleting: string | null;
  onDelete: (printer: Product) => void;
  onEdit: (printer: Product) => void;
}) {
  if (printers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No printers found. Add your first printer to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price (PKR)</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {printers.map((printer) => (
            <TableRow key={printer.id}>
              <TableCell className="font-medium">{printer.name}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0"
                >
                  {printer.category}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">
                {printer.price.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {printer.images
                    ? printer.images.length
                    : printer.main_image
                    ? 1
                    : 0}
                </Badge>
              </TableCell>
              <TableCell>
                {printer.is_featured ? (
                  <Badge className="bg-primary">Yes</Badge>
                ) : (
                  <Badge variant="outline">No</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(printer)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(printer)}
                    disabled={deleting === printer.id}
                  >
                    {deleting === printer.id ? (
                      <Spinner className="h-4 w-4" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Accessories Table Component
function AccessoriesTable({
  accessories,
  deleting,
  onDelete,
  onEdit,
}: {
  accessories: Accessory[];
  deleting: string | null;
  onDelete: (accessory: Accessory) => void;
  onEdit: (accessory: Accessory) => void;
}) {
  if (accessories.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No accessories found. Add your first accessory to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price (PKR)</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessories.map((accessory) => (
            <TableRow key={accessory.id}>
              <TableCell className="font-medium">{accessory.name}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0"
                >
                  {accessory.category}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">
                {accessory.price.toLocaleString()}
              </TableCell>
              <TableCell>
                {accessory.discount && accessory.discount > 0 ? (
                  <Badge variant="destructive">{accessory.discount}%</Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {accessory.images
                    ? accessory.images.length
                    : accessory.main_image
                    ? 1
                    : 0}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(accessory)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(accessory)}
                    disabled={deleting === accessory.id}
                  >
                    {deleting === accessory.id ? (
                      <Spinner className="h-4 w-4" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
