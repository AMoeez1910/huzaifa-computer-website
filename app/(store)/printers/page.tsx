import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { getPrinters } from "@/server-api/printers";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Printers - Huzaifa Computers",
  description:
    "Browse our complete catalog of LaserJet, Inkjet, Dot Matrix printers and scanners",
};

export default async function PrintersPage() {
  const printers = await getPrinters();

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
          {printers?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!printers ||
          (printers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground/60">No printers available</p>
            </div>
          ))}
      </div>
    </main>
  );
}
