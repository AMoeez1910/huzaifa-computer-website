import { getAccessories } from "@/server-api/accessories";
import { ProductCard } from "@/components/product-card";

export default async function AccessoriesPage() {
  const accessories = await getAccessories();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Accessories</h1>
        <p className="text-muted-foreground">
          Browse our complete range of printer accessories
        </p>
      </div>

      {accessories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No accessories available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessories.map((accessory) => (
            <ProductCard key={accessory.id} product={accessory} />
          ))}
        </div>
      )}
    </div>
  );
}
