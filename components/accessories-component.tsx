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
import { Input } from "@/components/ui/input";
import { Filter, X, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Static filter options from the form
const CATEGORIES = ["Ink Cartridges", "Toner Cartridges", "Paper"];
const BRANDS = ["HP", "Canon", "Epson", "Pantum"];

export function AccessoriesContent({
  initialSearch = "",
  initialCategories = [],
  initialBrands = [],
  initialSort = "newest",
}: {
  initialSearch?: string;
  initialCategories?: string[];
  initialBrands?: string[];
  initialSort?: string;
}) {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize state from props (server-side values)
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
  const [sortBy, setSortBy] = useState<string>(initialSort);

  // Fetch accessories on mount and when filters change
  useEffect(() => {
    fetchAccessories();
  }, [searchQuery, selectedCategories, selectedBrands, sortBy]);

  const fetchAccessories = async () => {
    try {
      setLoading(true);

      // Build query params
      const params = new URLSearchParams();

      if (searchQuery.trim()) {
        params.append("search", searchQuery);
      }

      selectedCategories.forEach((cat) => params.append("category", cat));
      selectedBrands.forEach((brand) => params.append("brand", brand));

      if (sortBy) {
        params.append("sort", sortBy);
      }

      const queryString = params.toString();
      const url = `/api/accessories${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);
      const data = await response.json();
      setAccessories(data.accessories || []);
    } catch (error) {
      console.error("Error fetching accessories:", error);
      setAccessories([]);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearchQuery("");
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

  const hasActiveFilters =
    searchQuery.trim() ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0;

  // Filter component for both desktop and mobile
  const FilterContent = () => (
    <Accordion type="multiple" defaultValue={["category", "brand"]}>
      <AccordionItem value="category">
        <AccordionTrigger className="text-sm font-semibold text-foreground py-3">
          Category
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${cat}`}
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() =>
                    toggleFilter(cat, selectedCategories, setSelectedCategories)
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
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="brand">
        <AccordionTrigger className="text-sm font-semibold text-foreground py-3">
          Brand
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {BRANDS.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() =>
                    toggleFilter(brand, selectedBrands, setSelectedBrands)
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <div className="max-w-10xl w-full mx-auto px-4">
      {/* Header with Search and Sort */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Accessories</h1>
            <p className="text-foreground/60">
              Browse our complete range of printer accessories
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sort and Filter Row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {accessories.length} products
            </span>
          </div>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                    Active
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Filter accessories by category and brand
                </SheetDescription>
              </SheetHeader>
              <div className="px-4">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full mb-4"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                )}

                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sticky Filter Sidebar */}
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-26">
            {/* Filter Header */}
            <div className="flex items-center justify-between mb-4">
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

            <FilterContent />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">Loading accessories...</p>
            </div>
          ) : accessories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">
                No accessories found matching your filters
              </p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessories.map((accessory: Accessory) => (
                <ProductCard key={accessory.id} product={accessory} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
