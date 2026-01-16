import { ProductDetailClient } from "./product-detail-client";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { getPrinter } from "@/server-api/printers";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getPrinter(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Huzaifa Computers`,
    description:
      product.description || `Buy ${product.name} at Huzaifa Computers`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getPrinter(id);
  return (
    <Suspense
      fallback={
        <div className="max-w-10xl w-full mx-auto px-4 py-16 flex justify-center">
          <Spinner />
        </div>
      }
    >
      <ProductDetailClient product={product} />
    </Suspense>
  );
}
