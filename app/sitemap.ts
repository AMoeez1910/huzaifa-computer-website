import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.huzaifacomputer.pk/";

  // Fetch all printers to include in sitemap
  let printers: { id: string; updated_at?: string }[] = [];
  try {
    const res = await fetch(`${baseUrl}/api/printers`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      printers = data.printers || [];
    }
  } catch (error) {
    console.error("Error fetching printers for sitemap:", error);
  }

  // Fetch all accessories to include in sitemap
  let accessories: { id: string; updated_at?: string }[] = [];
  try {
    const res = await fetch(`${baseUrl}/api/accessories`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      accessories = data.accessories || [];
    }
  } catch (error) {
    console.error("Error fetching accessories for sitemap:", error);
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/printers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/accessories`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamic printer pages
  const printerPages: MetadataRoute.Sitemap = printers.map((product) => ({
    url: `${baseUrl}/printers/${product.id}`,
    lastModified: product.updated_at
      ? new Date(product.updated_at)
      : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic accessory pages
  const accessoryPages: MetadataRoute.Sitemap = accessories.map(
    (accessory) => ({
      url: `${baseUrl}/accessories/${accessory.id}`,
      lastModified: accessory.updated_at
        ? new Date(accessory.updated_at)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  );

  return [...staticPages, ...printerPages, ...accessoryPages];
}
