import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description?: string;
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Printers - Huzaifa Computers",
  description:
    "Browse our complete catalog of LaserJet, Inkjet, Dot Matrix printers and scanners",
};

async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products`);

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

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="flex-1 w-full py-16">
      <div className="max-w-10xl w-full mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Our Printers</h1>
          <p className="text-foreground/60">
            Complete catalog of quality printing solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!products ||
          (products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground/60">No products available</p>
            </div>
          ))}
      </div>
    </main>
  );
}
