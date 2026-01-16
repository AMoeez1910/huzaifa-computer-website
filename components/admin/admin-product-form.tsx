"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SerializedEditorState } from "lexical";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageUpload } from "./image-upload";
import { Editor } from "@/components/ui/blocks/editor-00/editor";
import { Eye } from "lucide-react";

const CATEGORIES = ["Inkjet", "LaserJet", "Scanner"];
const FUNCTIONS = ["Printer", "Printer-Scanner", "All-in-One", "Scan"];
const TYPES = ["Color", "Black and White"];
const USAGES = ["Home", "Business", "Enterprise"];
const BRANDS = ["HP", "Canon", "Epson"];

const initialEditorState = {
  root: {
    children: [
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export function AdminProductForm({
  onSuccess,
  editProduct,
}: AdminProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize images directly from editProduct
  const [images, setImages] = useState<string[]>(editProduct?.images || []);
  const [mainImage, setMainImage] = useState<string>(
    editProduct?.main_image || ""
  );

  // Initialize description - parse if it's a string
  const getInitialDescription = () => {
    if (!editProduct?.description) return initialEditorState;
    try {
      return typeof editProduct.description === "string"
        ? JSON.parse(editProduct.description)
        : editProduct.description;
    } catch {
      return initialEditorState;
    }
  };

  const [description, setDescription] = useState<SerializedEditorState>(
    getInitialDescription()
  );
  const [showPreview, setShowPreview] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(
    !!editProduct?.discount && editProduct.discount > 0
  );

  // Initialize formData directly from editProduct
  const [formData, setFormData] = useState({
    name: editProduct?.name || "",
    brand: editProduct?.brand || "",
    category: editProduct?.category || "",
    price: editProduct?.price?.toString() || "",
    discount: editProduct?.discount?.toString() || "",
    type: editProduct?.type || "",
    function: editProduct?.function || "",
    usage: editProduct?.usage || "",
    is_featured: editProduct?.is_featured || false,
    is_new: editProduct?.is_new || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const productData = {
        name: formData.name,
        brand: formData.brand || null,
        category: formData.category,
        price: Number.parseFloat(formData.price),
        discount:
          hasDiscount && formData.discount
            ? Number.parseFloat(formData.discount)
            : null,
        description: JSON.stringify(description),
        type: formData.type || null,
        function: formData.function || null,
        usage: formData.usage || null,
        main_image: mainImage || "",
        images: images,
        is_featured: formData.is_featured,
        is_new: formData.is_new,
      };

      if (editProduct?.id) {
        // Update existing product via API
        const response = await fetch("/api/admin/printers", {
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
        const response = await fetch("/api/admin/printers", {
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
        brand: "",
        category: "",
        price: "",
        discount: "",
        type: "",
        function: "",
        usage: "",
        is_featured: false,
        is_new: false,
      });
      setImages([]);
      setMainImage("");
      setDescription(initialEditorState);
      setHasDiscount(false);

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/dashboard?tab=printers");
      }
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
          <Label htmlFor="brand">Brand *</Label>
          <Select
            value={formData.brand}
            onValueChange={(value) =>
              setFormData({ ...formData, brand: value })
            }
          >
            <SelectTrigger id="brand" disabled={isLoading}>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {BRANDS.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

        {/* Discount Toggle and Input */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_discount"
              checked={hasDiscount}
              onCheckedChange={(checked) => {
                setHasDiscount(checked as boolean);
                if (!checked) {
                  setFormData({ ...formData, discount: "" });
                }
              }}
              disabled={
                isLoading || !formData.price || parseFloat(formData.price) <= 0
              }
            />
            <Label htmlFor="has_discount" className="cursor-pointer">
              Apply Discount
            </Label>
          </div>

          {hasDiscount && (
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="discount">Discount Percentage</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="15"
                  step="1"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter percentage (0-100)
                </p>
              </div>

              {formData.price &&
                formData.discount &&
                parseFloat(formData.discount) > 0 && (
                  <div className="flex-1">
                    <Label>Discounted Price</Label>
                    <div className="text-2xl font-bold text-green-600">
                      PKR{" "}
                      {(
                        parseFloat(formData.price) *
                        (1 - parseFloat(formData.discount) / 100)
                      ).toLocaleString("en-PK", { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Save PKR{" "}
                      {(
                        parseFloat(formData.price) *
                        (parseFloat(formData.discount) / 100)
                      ).toLocaleString("en-PK", { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger id="type" disabled={isLoading}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="function">Function</Label>
          <Select
            value={formData.function}
            onValueChange={(value) =>
              setFormData({ ...formData, function: value })
            }
          >
            <SelectTrigger id="function" disabled={isLoading}>
              <SelectValue placeholder="Select function" />
            </SelectTrigger>
            <SelectContent>
              {FUNCTIONS.map((func) => (
                <SelectItem key={func} value={func}>
                  {func}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="usage">Usage</Label>
          <Select
            value={formData.usage}
            onValueChange={(value) =>
              setFormData({ ...formData, usage: value })
            }
          >
            <SelectTrigger id="usage" disabled={isLoading}>
              <SelectValue placeholder="Select usage" />
            </SelectTrigger>
            <SelectContent>
              {USAGES.map((usage) => (
                <SelectItem key={usage} value={usage}>
                  {usage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Image (Thumbnail) */}
      <div className="space-y-2">
        <Label>Main Image (Thumbnail) *</Label>
        <ImageUpload
          images={mainImage ? [mainImage] : []}
          onImagesChange={(imgs) => setMainImage(imgs[0] || "")}
          maxImages={1}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          This will be the main thumbnail image shown in product listings
        </p>
      </div>

      {/* Additional Images */}
      <div className="space-y-2">
        <Label>Additional Images (Optional)</Label>
        <ImageUpload
          images={images}
          onImagesChange={setImages}
          maxImages={5}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Add up to 5 additional product images for the carousel
        </p>
      </div>

      <div className="space-y-2">
        <Label>Description (Rich Text)</Label>
        <Editor
          key={`editor-${editProduct?.id || "new"}`}
          editorSerializedState={description}
          onSerializedChange={(value) => setDescription(value)}
        />
      </div>

      <div className="flex items-center gap-6">
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

        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_new"
            checked={formData.is_new}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, is_new: checked as boolean })
            }
            disabled={isLoading}
          />
          <Label htmlFor="is_new" className="cursor-pointer">
            New Arrival
          </Label>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </p>
      )}

      <div className="flex gap-3 flex-wrap">
        <Button type="submit" size="lg" disabled={isLoading || !mainImage}>
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
              if (onSuccess) {
                onSuccess();
              } else {
                router.push("/admin/dashboard?tab=printers");
              }
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
