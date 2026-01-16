"use client";

import { ProductCard } from "@/components/product-card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [filteredAccessories, setFilteredAccessories] = useState<Accessory[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  // Multi-select filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Sort state
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    fetchAccessories();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [accessories, selectedCategories, sortBy]);

  const fetchAccessories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/accessories");
      const data = await response.json();
      setAccessories(data.accessories || []);
    } catch (error) {
      console.error("Error fetching accessories:", error);
      setAccessories([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...accessories];

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((a) =>
        selectedCategories.includes(a.category)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        );
        break;
    }

    setFilteredAccessories(filtered);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  // Get unique categories
  const categories = Array.from(new Set(accessories.map((a) => a.category)));

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <main className="flex-1 w-full py-16">
      <div className="max-w-10xl w-full mx-auto px-4">
        {/* Header with Sort */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Accessories</h1>
          <p className="text-foreground/60 mb-6">
            Browse our complete range of printer accessories
          </p>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {filteredAccessories.length} products
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky Filter Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-4 space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs h-8 px-2"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${cat}`}
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() =>
                          toggleFilter(
                            cat,
                            selectedCategories,
                            setSelectedCategories
                          )
                        }
                      />
                      <Label
                        htmlFor={`cat-${cat}`}
                        className="text-sm cursor-pointer font-normal"
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-foreground/60">Loading accessories...</p>
              </div>
            ) : filteredAccessories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60">
                  No accessories found matching your filters
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAccessories.map((accessory) => (
                  <ProductCard key={accessory.id} product={accessory} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
