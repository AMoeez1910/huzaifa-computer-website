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

// Hardcoded filter options matching admin form
const CATEGORIES = ["Inkjet", "LaserJet", "Scanner"];
const FUNCTIONS = ["Printer", "Printer-Scanner", "All-in-One", "Scan"];
const TYPES = ["Color", "Black and White"];
const USAGES = ["Home", "Business", "Enterprise"];
const BRANDS = ["HP", "Canon", "Epson"];

export default function PrintersPage() {
  const [printers, setPrinters] = useState<Product[]>([]);
  const [filteredPrinters, setFilteredPrinters] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Multi-select filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [selectedUsages, setSelectedUsages] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Sort state
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    fetchPrinters();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [
    printers,
    selectedCategories,
    selectedTypes,
    selectedFunctions,
    selectedUsages,
    selectedBrands,
    sortBy,
  ]);

  const fetchPrinters = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/printers");
      const data = await response.json();
      setPrinters(data.printers || []);
    } catch (error) {
      console.error("Error fetching printers:", error);
      setPrinters([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...printers];

    // Apply multi-select filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(
        (p) => p.type && selectedTypes.includes(p.type)
      );
    }
    if (selectedFunctions.length > 0) {
      filtered = filtered.filter(
        (p) => p.function && selectedFunctions.includes(p.function)
      );
    }
    if (selectedUsages.length > 0) {
      filtered = filtered.filter(
        (p) => p.usage && selectedUsages.includes(p.usage)
      );
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.some((brand) =>
          p.name.toLowerCase().includes(brand.toLowerCase())
        )
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
      case "featured":
        filtered.sort(
          (a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
        );
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

    setFilteredPrinters(filtered);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedFunctions([]);
    setSelectedUsages([]);
    setSelectedBrands([]);
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

  // Hardcoded filter values from admin form
  const categories = CATEGORIES;
  const types = TYPES;
  const functions = FUNCTIONS;
  const usages = USAGES;
  const brands = BRANDS;

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedTypes.length > 0 ||
    selectedFunctions.length > 0 ||
    selectedUsages.length > 0 ||
    selectedBrands.length > 0;

  return (
    <main className="flex-1 w-full py-16">
      <div className="max-w-10xl w-full mx-auto px-4">
        {/* Header with Sort */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Printers</h1>
          <p className="text-foreground/60 mb-6">
            Complete catalog of quality printing solutions
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
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {filteredPrinters.length} products
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

              {/* Type Filter */}
              {types.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Type
                  </h3>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() =>
                            toggleFilter(type, selectedTypes, setSelectedTypes)
                          }
                        />
                        <Label
                          htmlFor={`type-${type}`}
                          className="text-sm cursor-pointer font-normal"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Function Filter */}
              {functions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Function
                  </h3>
                  <div className="space-y-2">
                    {functions.map((func) => (
                      <div key={func} className="flex items-center space-x-2">
                        <Checkbox
                          id={`func-${func}`}
                          checked={selectedFunctions.includes(func)}
                          onCheckedChange={() =>
                            toggleFilter(
                              func,
                              selectedFunctions,
                              setSelectedFunctions
                            )
                          }
                        />
                        <Label
                          htmlFor={`func-${func}`}
                          className="text-sm cursor-pointer font-normal"
                        >
                          {func}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Usage Filter */}
              {usages.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Usage
                  </h3>
                  <div className="space-y-2">
                    {usages.map((usage) => (
                      <div key={usage} className="flex items-center space-x-2">
                        <Checkbox
                          id={`usage-${usage}`}
                          checked={selectedUsages.includes(usage)}
                          onCheckedChange={() =>
                            toggleFilter(
                              usage,
                              selectedUsages,
                              setSelectedUsages
                            )
                          }
                        />
                        <Label
                          htmlFor={`usage-${usage}`}
                          className="text-sm cursor-pointer font-normal"
                        >
                          {usage}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Brand Filter */}
              {brands.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Brand
                  </h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() =>
                            toggleFilter(
                              brand,
                              selectedBrands,
                              setSelectedBrands
                            )
                          }
                        />
                        <Label
                          htmlFor={`brand-${brand}`}
                          className="text-sm cursor-pointer font-normal"
                        >
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-foreground/60">Loading printers...</p>
              </div>
            ) : filteredPrinters.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60">
                  No printers found matching your filters
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
                {filteredPrinters.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
