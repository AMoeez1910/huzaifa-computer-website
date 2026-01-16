export const getProduct = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/products/${id}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.product;
};

export interface ProductFilters {
  featured?: boolean;
  category?: string;
  type?: string;
  brand?: string;
  is_new?: boolean;
  usage?: string;
  limit?: number;
}

export async function getProducts(
  filters?: ProductFilters
): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    // Build query string from filters
    const params = new URLSearchParams();
    if (filters?.featured) params.append("featured", "true");
    if (filters?.category) params.append("category", filters.category);
    if (filters?.type) params.append("type", filters.type);
    if (filters?.brand) params.append("brand", filters.brand);
    if (filters?.is_new) params.append("is_new", "true");
    if (filters?.usage) params.append("usage", filters.usage);
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const queryString = params.toString();
    const url = `${baseUrl}/api/products${
      queryString ? `?${queryString}` : ""
    }`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("Failed to fetch products");
      return [];
    }

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
