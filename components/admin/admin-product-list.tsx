"use client";

import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image_url: string;
  images?: string[];
  is_featured: boolean;
}

interface AdminProductListProps {
  onProductUpdated: () => void;
  onEdit: (product: Product) => void;
}

export function AdminProductList({
  onProductUpdated,
  onEdit,
}: AdminProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const { products: data } = await response.json();
      setProducts(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(id);

    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((p) => p.id !== id));
      onProductUpdated();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setDeleting(null);
    }
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
      <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
        {error}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price (PKR)</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0"
                >
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">
                {product.price.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {product.images
                    ? product.images.length
                    : product.image_url
                    ? 1
                    : 0}
                </Badge>
              </TableCell>
              <TableCell>
                {product.is_featured ? (
                  <Badge className="bg-primary">Yes</Badge>
                ) : (
                  <Badge variant="outline">No</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={deleting !== null}
                    onClick={() => onEdit(product)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={deleting !== null}
                    onClick={() => handleDelete(product.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    {deleting === product.id ? (
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

      {products.length === 0 && (
        <p className="text-center py-8 text-muted-foreground">
          No products yet.
        </p>
      )}
    </div>
  );
}
