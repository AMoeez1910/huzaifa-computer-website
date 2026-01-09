import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.huzaifacomputer.pk/";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/protected/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
