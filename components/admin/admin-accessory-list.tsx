"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export function AdminAccessoryList({
  onAccessoryUpdated,
  onEdit,
}: AdminAccessoryListProps) {
  const router = useRouter();
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accessoryToDelete, setAccessoryToDelete] = useState<Accessory | null>(
    null
  );

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/accessories");
      if (!response.ok) throw new Error("Failed to fetch accessories");

      const { accessories: data } = await response.json();
      setAccessories(data || []);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch accessories"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);

    try {
      const response = await fetch(`/api/admin/accessories?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete accessory");

      setAccessories(accessories.filter((a) => a.id !== id));
      if (onAccessoryUpdated) {
        onAccessoryUpdated();
      } else {
        router.refresh();
      }
      setDeleteDialogOpen(false);
      setAccessoryToDelete(null);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to delete accessory"
      );
    } finally {
      setDeleting(null);
    }
  };

  const openDeleteDialog = (accessory: Accessory) => {
    setAccessoryToDelete(accessory);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setAccessoryToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-md">
        {error}
      </div>
    );
  }

  if (accessories.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No accessories found. Add your first accessory to get started.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accessories.map((accessory) => (
              <TableRow key={accessory.id}>
                <TableCell>
                  {accessory.main_image ? (
                    <Image
                      src={accessory.main_image}
                      alt={accessory.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                      No image
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{accessory.name}</TableCell>
                <TableCell>{accessory.category}</TableCell>
                <TableCell>
                  PKR {accessory.price.toLocaleString("en-PK")}
                </TableCell>
                <TableCell>
                  {accessory.discount && accessory.discount > 0
                    ? `${accessory.discount}%`
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (onEdit) {
                          onEdit(accessory);
                        } else {
                          router.push(
                            `/admin/dashboard/accessories/edit/${accessory.id}`
                          );
                        }
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(accessory)}
                      disabled={deleting === accessory.id}
                    >
                      {deleting === accessory.id ? (
                        <Spinner />
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Accessory</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{accessoryToDelete?.name}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                accessoryToDelete && handleDelete(accessoryToDelete.id)
              }
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
