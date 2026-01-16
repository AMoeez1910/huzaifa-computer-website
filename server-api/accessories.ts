export const getAccessory = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/accessories/${id}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.accessory;
};

export interface AccessoryFilters {
  category?: string;
  limit?: number;
}

export async function getAccessories(
  filters?: AccessoryFilters
): Promise<Accessory[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    // Build query string from filters
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const queryString = params.toString();
    const url = `${baseUrl}/api/accessories${
      queryString ? `?${queryString}` : ""
    }`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("Failed to fetch accessories");
      return [];
    }

    const data = await res.json();
    return data.accessories || [];
  } catch (error) {
    console.error("Error fetching accessories:", error);
    return [];
  }
}
