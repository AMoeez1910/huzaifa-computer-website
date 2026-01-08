"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  disabled?: boolean;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 3,
  disabled = false,
}: ImageUploadProps) {
  const [urlInput, setUrlInput] = useState("");

  const addImage = () => {
    if (urlInput && images.length < maxImages) {
      onImagesChange([...images, urlInput]);
      setUrlInput("");
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label>Product Images (Up to {maxImages})</Label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((url, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg border-2 border-dashed border-border overflow-hidden group"
          >
            <Image
              src={url}
              alt={`Product image ${index + 1}`}
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {images.length < maxImages && (
          <div className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 p-4">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Add image URL
            </p>
          </div>
        )}
      </div>

      {images.length < maxImages && (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Enter image URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addImage())
            }
            className="flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled}
          />
          <Button
            type="button"
            onClick={addImage}
            disabled={!urlInput || disabled}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
}
