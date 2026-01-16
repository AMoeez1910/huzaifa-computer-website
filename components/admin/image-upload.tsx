"use client";

import { useState, useRef } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { uploadFile, generateFilePath } from "@/lib/supabase/storage";

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 3,
  disabled = false,
}: ImageUploadProps) {
  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImage = () => {
    if (urlInput && images.length < maxImages) {
      onImagesChange([...images, urlInput]);
      setUrlInput("");
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files)
        .slice(0, maxImages - images.length)
        .map(async (file) => {
          const filePath = generateFilePath(file.name);
          const url = await uploadFile(file, filePath);
          return url;
        });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(
        (url): url is string => url !== null
      );

      if (validUrls.length > 0) {
        onImagesChange([...images, ...validUrls]);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
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
              disabled={disabled || isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 p-4 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground text-center">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">
                  Click to upload
                </p>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileUpload}
        disabled={disabled || isUploading}
      />

      {images.length < maxImages && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Or add by URL</Label>
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
              disabled={disabled || isUploading}
            />
            <Button
              type="button"
              onClick={addImage}
              disabled={!urlInput || disabled || isUploading}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
