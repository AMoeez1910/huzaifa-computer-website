import { PrintersContent } from "@/components/printers-component";

export default async function PrintersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  
  // Extract search parameters
  const search = typeof params.search === 'string' ? params.search : '';
  const categories = Array.isArray(params.category) ? params.category : 
                    typeof params.category === 'string' ? [params.category] : [];
  const types = Array.isArray(params.type) ? params.type : 
               typeof params.type === 'string' ? [params.type] : [];
  const functions = Array.isArray(params.function) ? params.function : 
                   typeof params.function === 'string' ? [params.function] : [];
  const usages = Array.isArray(params.usage) ? params.usage : 
                typeof params.usage === 'string' ? [params.usage] : [];
  const brands = Array.isArray(params.brand) ? params.brand : 
                typeof params.brand === 'string' ? [params.brand] : [];
  const featured = params.featured === 'true';
  const isNew = params.is_new === 'true';
  const isUsed = params.is_new === 'false';
  const sort = typeof params.sort === 'string' ? params.sort : 'newest';

  return (
    <main className="flex-1 w-full py-10">
      <PrintersContent
        initialSearch={search}
        initialCategories={categories}
        initialTypes={types}
        initialFunctions={functions}
        initialUsages={usages}
        initialBrands={brands}
        initialFeatured={featured}
        initialNew={isNew}
        initialUsed={isUsed}
        initialSort={sort}
      />
    </main>
  );
}
