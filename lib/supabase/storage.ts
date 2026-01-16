import { createClient } from "@/lib/supabase/client";

/**
 * Upload a file to Supabase Storage
 * @param file - The file to upload
 * @param path - The path within the bucket (e.g., 'products/image.jpg')
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
  file: File,
  path: string
): Promise<string | null> {
  const supabase = createClient();
  const bucketName =
    process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "S3 Bucket";

  try {
    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

/**
 * Delete a file from Supabase Storage
 * @param path - The path of the file to delete
 * @returns True if successful, false otherwise
 */
export async function deleteFile(path: string): Promise<boolean> {
  const supabase = createClient();
  const bucketName =
    process.env.NEXT_PUBLIC_SUPABASE_BUCKET ||
    "Huzaifa Computer Customer Request";

  try {
    const { error } = await supabase.storage.from(bucketName).remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

/**
 * Generate a unique file path for uploads
 * @param originalName - The original file name
 * @param folder - The folder to upload to (default: 'products')
 * @returns A unique file path
 */
export function generateFilePath(
  originalName: string,
  folder: string = "products"
): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 9);
  const extension = originalName.split(".").pop();
  return `${folder}/${timestamp}-${randomString}.${extension}`;
}
