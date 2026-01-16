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
      url: `${baseUrl}/repair`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = printers.map((product) => ({
    url: `${baseUrl}/printers/${product.id}`,
    lastModified: product.updated_at
      ? new Date(product.updated_at)
      : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages];
}
