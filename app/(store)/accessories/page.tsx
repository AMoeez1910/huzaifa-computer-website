import { AccessoriesContent } from "@/components/accessories-component";

export default async function AccessoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // Extract search parameters
  const search = typeof params.search === "string" ? params.search : "";
  const categories = Array.isArray(params.category)
    ? params.category
    : typeof params.category === "string"
    ? [params.category]
    : [];
  const brands = Array.isArray(params.brand)
    ? params.brand
    : typeof params.brand === "string"
    ? [params.brand]
    : [];
  const sort = typeof params.sort === "string" ? params.sort : "newest";

  return (
    <main className="flex-1 w-full py-10">
      <AccessoriesContent
        initialSearch={search}
        initialCategories={categories}
        initialBrands={brands}
        initialSort={sort}
      />
    </main>
  );
}
