"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SerializedEditorState } from "lexical";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "./image-upload";
import { Editor } from "@/components/ui/blocks/editor-00/editor";
import { toast } from "sonner";
import { BookmarkX, CheckCircle2, EyeIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";

const CATEGORIES = ["Inkjet", "LaserJet", "Scanner"];
const FUNCTIONS = ["Printer", "Printer-Scanner", "All-in-One", "Scan"];
const TYPES = ["Color", "Black and White"];
const USAGES = ["Home", "Business", "Enterprise"];
const BRANDS = ["HP", "Canon", "Epson", "Pantum"];

type ProductFormData = {
  name: string;
  brand: string;
  category: string;
  price: string;
  discount: string;
  type: string;
  function: string;
  is_featured: boolean;
  is_new: boolean;
  is_active: boolean;
  sold_out: boolean;
};

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
    editProduct?.main_image || "",
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
    getInitialDescription(),
  );

  // Initialize formData directly from editProduct
  const [formData, setFormData] = useState<ProductFormData>({
    name: editProduct?.name || "",
    brand: editProduct?.brand || "",
    category: editProduct?.category || "",
    price: editProduct?.price?.toString() || "",
    discount: editProduct?.discount?.toString() || "",
    type: editProduct?.type || "",
    function: editProduct?.function || "",
    is_featured: editProduct?.is_featured || false,
    is_new: editProduct?.is_new || false,
    is_active: editProduct?.is_active !== false,
    sold_out: editProduct?.sold_out ?? false,
  });

  // Separate state for multi-select usage
  const [selectedUsages, setSelectedUsages] = useState<string[]>(
    editProduct?.usage || [],
  );

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
          formData.discount && Number.parseFloat(formData.discount) > 0
            ? Number.parseFloat(formData.discount)
            : null,
        description: JSON.stringify(description),
        type: formData.type || null,
        function: formData.function || null,
        usage: selectedUsages.length > 0 ? selectedUsages : null,
        main_image: mainImage || "",
        images: images,
        is_featured: formData.is_featured,
        is_new: formData.is_new,
        is_active: formData.is_active,
        sold_out: formData.sold_out,
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
          toast.error(error.error || "Failed to update product");
          throw new Error(error.error || "Failed to update product");
        }
        toast.success("Product updated successfully!");
      } else {
        // Insert new product via API
        const response = await fetch("/api/admin/printers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          const error = await response.json();
          toast.error(error.error || "Failed to add product");
          throw new Error(error.error || "Failed to add product");
        }
        toast.success("Product created successfully!");
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
        is_featured: false,
        is_new: false,
        is_active: true,
        sold_out: false,
      });
      setSelectedUsages([]);
      setImages([]);
      setMainImage("");
      setDescription(initialEditorState);

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/dashboard?tab=printers");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${editProduct ? "update" : "add"} product`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex w-full md:justify-end ">
        <ToggleGroup
          type="multiple"
          variant="outline"
          spacing={2}
          size="sm"
          value={[
            ...(formData.is_featured ? ["featured"] : []),
            ...(formData.is_new ? ["new"] : []),
            ...(formData.is_active ? ["active"] : []),
            ...(formData.sold_out ? ["sold_out"] : []),
          ]}
          className="flex-wrap"
          onValueChange={(values: string[]) => {
            setFormData({
              ...formData,
              is_featured: values.includes("featured"),
              is_new: values.includes("new"),
              is_active: values.includes("active"),
              sold_out: values.includes("sold_out"),
            });
          }}
        >
          <ToggleGroupItem
            value="featured"
            aria-label="Toggle featured"
            className="data-[state=on]:bg-primary data-[state=on]:*:[svg]:text-yellow-600 [&[data-state=on]>svg]:fill-yellow-500"
          >
            <StarIcon className="w-4 h-4 mr-2 " />
            Featured
          </ToggleGroupItem>
          <ToggleGroupItem
            value="new"
            aria-label="Toggle new"
            className="data-[state=on]:bg-primary data-[state=on]:*:[svg]:text-green-400 [&>svg]:fill-none"
          >
            <CheckCircle2 className="w-4 h-4 mr-2 " />
            New
          </ToggleGroupItem>
          <ToggleGroupItem
            value="sold_out"
            aria-label="Toggle sold out"
            className="data-[state=on]:bg-primary data-[state=on]:*:[svg]:text-red-600 [&>svg]:fill-none"
          >
            <BookmarkX className="w-4 h-4 mr-2 " />
            Sold Out
          </ToggleGroupItem>
          <ToggleGroupItem
            value="active"
            aria-label="Toggle active"
            className="data-[state=on]:bg-primary data-[state=on]:*:[svg]:text-blue-300 [&>svg]:fill-none"
          >
            <EyeIcon className="w-4 h-4 mr-2 " />
            Product Visible
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
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
            <SelectTrigger id="brand" disabled={isLoading} className="w-full">
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
            <SelectTrigger
              id="category"
              disabled={isLoading}
              className="w-full"
            >
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

        <div className="space-y-2 relative">
          {formData.discount && Number(formData.discount) > 0 && (
            <Badge className="absolute right-0 -bottom-6">
              {Number(formData.discount) > 0 && `${formData.discount}% off`}
            </Badge>
          )}
          <div className="flex w-full justify-between relative">
            <Label htmlFor="price">Price (PKR) *</Label>
            <div className="space-y-2 md:col-span-2 absolute right-0 -top-4">
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size={"sm"}
                      disabled={!formData.price || formData.price.trim() === ""}
                    >
                      {formData.discount && Number(formData.discount) > 0
                        ? "Edit Discount"
                        : "Apply Discount"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="flex flex-col gap-2">
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
                            setFormData({
                              ...formData,
                              discount: e.target.value,
                            })
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
                              ).toLocaleString("en-PK", {
                                maximumFractionDigits: 0,
                              })}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Save PKR{" "}
                              {(
                                parseFloat(formData.price) *
                                (parseFloat(formData.discount) / 100)
                              ).toLocaleString("en-PK", {
                                maximumFractionDigits: 0,
                              })}
                            </p>
                          </div>
                        )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
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

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger id="type" disabled={isLoading} className="w-full">
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
            <SelectTrigger
              id="function"
              disabled={isLoading}
              className="w-full"
            >
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
          <Label>Usage</Label>
          <div className="border rounded-md p-4 space-y-2">
            {USAGES.map((usage) => (
              <div key={usage} className="flex items-center space-x-2">
                <Checkbox
                  id={`usage-${usage}`}
                  checked={selectedUsages.includes(usage)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedUsages([...selectedUsages, usage]);
                    } else {
                      setSelectedUsages(
                        selectedUsages.filter((u) => u !== usage),
                      );
                    }
                  }}
                  disabled={isLoading}
                />
                <Label
                  htmlFor={`usage-${usage}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {usage}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Description</Label>
          <Editor
            key={`editor-${editProduct?.id || "new"}`}
            editorSerializedState={description}
            onSerializedChange={(value) => setDescription(value)}
          />
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

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </p>
      )}

      <div className="flex gap-3 ml-auto w-min">
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
