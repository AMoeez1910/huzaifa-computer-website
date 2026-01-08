"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "./image-upload";

const CATEGORIES = ["LaserJet", "Inkjet", "Dot Matrix", "Scanners"];

interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image_url: string;
  images?: string[];
  is_featured: boolean;
}

interface AdminProductFormProps {
  onSuccess: () => void;
  editProduct?: Product | null;
}

export function AdminProductForm({
  onSuccess,
  editProduct,
}: AdminProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    is_featured: false,
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name,
        category: editProduct.category,
        price: editProduct.price.toString(),
        description: editProduct.description || "",
        is_featured: editProduct.is_featured,
      });

      // Parse images from the product
      const productImages: string[] = [];
      if (editProduct.image_url) productImages.push(editProduct.image_url);
      if (editProduct.images) {
        productImages.push(
          ...editProduct.images.filter((img) => img !== editProduct.image_url)
        );
      }
      setImages(productImages);
    }
  }, [editProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        price: Number.parseFloat(formData.price),
        description: formData.description,
        image_url: images[0] || "",
        images: images,
        is_featured: formData.is_featured,
      };

      if (editProduct?.id) {
        // Update existing product via API
        const response = await fetch("/api/admin/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editProduct.id, ...productData }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to update product");
        }
      } else {
        // Insert new product via API
        const response = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to add product");
        }
      }

      // Reset form
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        is_featured: false,
      });
      setImages([]);

      onSuccess();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${editProduct ? "update" : "add"} product`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            placeholder="HP LaserJet Pro MFP"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger id="category" disabled={isLoading}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (PKR) *</Label>
          <Input
            id="price"
            type="number"
            placeholder="85000"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <ImageUpload
        images={images}
        onImagesChange={setImages}
        maxImages={3}
        disabled={isLoading}
      />

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Product description..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          disabled={isLoading}
          rows={4}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_featured"
          checked={formData.is_featured}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, is_featured: checked as boolean })
          }
          disabled={isLoading}
        />
        <Label htmlFor="is_featured" className="cursor-pointer">
          Featured Product
        </Label>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || images.length === 0}
        >
          {isLoading
            ? editProduct
              ? "Updating..."
              : "Adding..."
            : editProduct
            ? "Update Product"
            : "Add Product"}
        </Button>

        {editProduct && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              setFormData({
                name: "",
                category: "",
                price: "",
                description: "",
                is_featured: false,
              });
              setImages([]);
              onSuccess();
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
