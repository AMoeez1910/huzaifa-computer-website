import { ProductDetailClient } from "./product-detail-client";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export const dynamic = "force-dynamic";

const getProduct = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/products/${id}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.product;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

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

async function ProductContent({ id }: { id: string }) {
  const product = await getProduct(id);
  return <ProductDetailClient product={product} />;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="max-w-10xl w-full mx-auto px-4 py-16 flex justify-center">
          <Spinner />
        </div>
      }
    >
      <ProductContent id={id} />
    </Suspense>
  );
}
