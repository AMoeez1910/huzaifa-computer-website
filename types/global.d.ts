import { StaticImageData } from "next/image";
import { SerializedEditorState } from "lexical";

export {};

declare global {
  interface ProductImageCarouselProps {
    images: string[];
    productName: string;
  }

  interface Product {
    id: string;
    created_at?: string;
    name: string;
    brand?: string;
    category: string;
    price: number;
    description?: SerializedEditorState | null;
    is_featured?: boolean;
    discount?: number; // Percentage (0-100)
    type?: string;
    function?: string;
    usage?: string;
    is_new?: boolean;
    images?: string[]; // Additional images
    main_image?: string; // Main thumbnail image
  }

  interface Accessory {
    id: string;
    created_at?: string;
    name: string;
    category: string;
    price: number;
    description?: SerializedEditorState | null;
    discount?: number; // Percentage (0-100)
    images?: string[]; // Additional images
    main_image?: string; // Main thumbnail image
  }

  interface AdminProductFormProps {
    onSuccess?: () => void;
    editProduct?: Product | null;
  }

  interface ImageUploadProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
    disabled?: boolean;
  }

  interface AdminProductListProps {
    onProductUpdated?: () => void;
    onEdit?: (product: Product) => void;
  }

  interface AdminAccessoryFormProps {
    onSuccess?: () => void;
    editAccessory?: Accessory | null;
  }

  interface AdminAccessoryListProps {
    onAccessoryUpdated?: () => void;
    onEdit?: (accessory: Accessory) => void;
  }
}
