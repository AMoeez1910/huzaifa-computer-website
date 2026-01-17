"use client";

import type React from "react";

import { useState } from "react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ImageUpload } from "./image-upload";
import { Editor } from "@/components/ui/blocks/editor-00/editor";
import { EyeIcon } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = ["Ink Cartridges", "Toner Cartridges", "Paper"];
const BRANDS = ["HP", "Canon", "Epson", "Pantum"];

type AccessoryFormData = {
  name: string;
  category: string;
  price: string;
  discount: string;
  is_active: boolean;
  sold_out: boolean;
  brand?: string;
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

export function AdminAccessoryForm({
  onSuccess,
  editAccessory,
}: AdminAccessoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize images directly from editAccessory
  const [images, setImages] = useState<string[]>(editAccessory?.images || []);
  const [mainImage, setMainImage] = useState<string>(
    editAccessory?.main_image || ""
  );

  // Initialize description - parse if it's a string
  const getInitialDescription = () => {
    if (!editAccessory?.description) return initialEditorState;
    try {
      return typeof editAccessory.description === "string"
        ? JSON.parse(editAccessory.description)
        : editAccessory.description;
    } catch {
      return initialEditorState;
    }
  };

  const [description, setDescription] = useState<SerializedEditorState>(
    getInitialDescription()
  );
  const [showPreview, setShowPreview] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(
    !!editAccessory?.discount && editAccessory.discount > 0
  );

  // Initialize formData directly from editAccessory
  const [formData, setFormData] = useState<AccessoryFormData>({
    name: editAccessory?.name || "",
    category: editAccessory?.category || "",
    price: editAccessory?.price?.toString() || "",
    discount: editAccessory?.discount?.toString() || "",
    is_active: editAccessory?.is_active ?? true,
    sold_out: editAccessory?.sold_out ?? false,
    brand: editAccessory?.brand || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.category) {
        toast.error("Please fill in all required fields");
        throw new Error("Please fill in all required fields");
      }

      if (!mainImage) {
        toast.error("Please upload a main image");
        throw new Error("Please upload a main image");
      }

      // Prepare accessory data
      const accessoryData = {
        ...(editAccessory?.id && { id: editAccessory.id }),
        name: formData.name,
        category: formData.category,
        price: formData.price ? parseFloat(formData.price) : null,
        discount:
          hasDiscount && formData.discount ? parseFloat(formData.discount) : 0,
        description: JSON.stringify(description),
        images,
        main_image: mainImage,
        is_active: formData.is_active,
        sold_out: formData.sold_out,
        brand: formData.brand || null,
      };

      // Send request
      const endpoint = "/api/admin/accessories";
      const method = editAccessory ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accessoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to save accessory");
        throw new Error(errorData.error || "Failed to save accessory");
      }

      toast.success(
        editAccessory
          ? "Accessory updated successfully!"
          : "Accessory created successfully!"
      );
      // Reset form
      setFormData({
        name: "",
        brand: "",
        category: "",
        price: "",
        discount: "",
        is_active: true,
        sold_out: false,
      });
      setImages([]);
      setMainImage("");
      setDescription(initialEditorState);

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/dashboard?tab=accessories");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save accessory");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-6">
      <div className="flex w-full md:justify-end">
        <ToggleGroup
          type="multiple"
          variant="outline"
          spacing={2}
          size="sm"
          value={[
            ...(formData.sold_out ? ["sold_out"] : []),
            ...(formData.is_active ? ["active"] : []),
          ]}
          onValueChange={(values: string[]) => {
            setFormData({
              ...formData,
              is_active: values.includes("active"),
              sold_out: values.includes("sold_out"),
            });
          }}
        >
          <ToggleGroupItem
            value="sold_out"
            aria-label="Toggle sold out"
            className="data-[state=on]:bg-primary data-[state=on]:*:[svg]:text-red-600 [&>svg]:fill-none"
          >
            <EyeIcon className="w-4 h-4 mr-2 " />
            Sold Out
          </ToggleGroupItem>
          <ToggleGroupItem
            value="active"
            aria-label="Toggle active"
            className="data-[state=on]:bg-primary data-[state=on]:*:[svg]:text-blue-200 [&>svg]:fill-none"
          >
            <EyeIcon className="w-4 h-4 mr-2 " />
            Product Visible
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md">
          {error}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-3 pt-2">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Accessory Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter accessory name"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex w-full justify-between relative">
            <Label htmlFor="price">Price (PKR)</Label>
            <div className="space-y-2 md:col-span-2 absolute right-0 -top-4">
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size={"sm"}
                      disabled={!formData.price || formData.price.trim() === ""}
                    >
                      Apply Discount
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
            placeholder="85000 (optional)"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            disabled={isLoading}
          />
        </div>
        {/* Description */}
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
        <div className="space-y-2 md:col-span-2">
          <Label>Description</Label>

          <Editor
            key={`editor-${editAccessory?.id || "new"}`}
            editorSerializedState={description}
            onSerializedChange={setDescription}
          />
        </div>
      </div>
      {/* Main Image */}
      <div className="space-y-2">
        <Label>Main Image *</Label>
        <ImageUpload
          images={mainImage ? [mainImage] : []}
          onImagesChange={(imgs) => setMainImage(imgs[0] || "")}
          maxImages={1}
          disabled={isLoading}
        />
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
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/dashboard?tab=accessories")}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? editAccessory
              ? "Updating..."
              : "Creating..."
            : editAccessory
            ? "Update Accessory"
            : "Create Accessory"}
        </Button>
      </div>
    </form>
  );
}
