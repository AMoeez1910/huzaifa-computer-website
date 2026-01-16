"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SerializedEditorState } from "lexical";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Input as SelectInput } from "@/components/ui/input";
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
  const [formData, setFormData] = useState({
    name: editAccessory?.name || "",
    category: editAccessory?.category || "",
    price: editAccessory?.price?.toString() || "",
    discount: editAccessory?.discount?.toString() || "",
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
      if (!formData.name || !formData.category || !formData.price) {
        throw new Error("Please fill in all required fields");
      }

      if (!mainImage) {
        throw new Error("Please upload a main image");
      }

      // Prepare accessory data
      const accessoryData = {
        ...(editAccessory?.id && { id: editAccessory.id }),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        discount: hasDiscount ? parseFloat(formData.discount || "0") : 0,
        description: JSON.stringify(description),
        images,
        main_image: mainImage,
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
        throw new Error(errorData.error || "Failed to save accessory");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/dashboard?tab=accessories");
      }
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save accessory");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md">
          {error}
        </div>
      )}

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
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          placeholder="e.g., Cables, Toner, Paper, etc."
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price">Price (PKR) *</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleInputChange}
          required
          placeholder="Enter price"
        />
      </div>

      {/* Discount */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hasDiscount"
            checked={hasDiscount}
            onChange={(e) => setHasDiscount(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="hasDiscount" className="cursor-pointer">
            Add Discount
          </Label>
        </div>
        {hasDiscount && (
          <Input
            id="discount"
            name="discount"
            type="number"
            min="0"
            max="100"
            step="1"
            value={formData.discount}
            onChange={handleInputChange}
            placeholder="Discount percentage (0-100)"
          />
        )}
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

      {/* Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Description</Label>
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Description Preview</DialogTitle>
              </DialogHeader>
              <div className="prose prose-sm max-w-none">
                <Editor
                  key={`preview-${editAccessory?.id || "new"}`}
                  editorSerializedState={description}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="border rounded-md p-4">
          <Editor
            key={`editor-${editAccessory?.id || "new"}`}
            editorSerializedState={description}
            onSerializedChange={setDescription}
          />
        </div>
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
