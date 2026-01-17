"use client";

import { ProductCard } from "@/components/product-card";
import { useEffect, useState, useCallback } from "react";
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

// Hardcoded filter options matching admin form
const CATEGORIES = ["Inkjet", "LaserJet", "Scanner"];
const FUNCTIONS = ["Printer", "Printer-Scanner", "All-in-One", "Scan"];
const TYPES = ["Color", "Black and White"];
const USAGES = ["Home", "Business", "Enterprise"];
const BRANDS = ["HP", "Canon", "Epson", "Pantum"];

export function PrintersContent({
  initialSearch = "",
  initialCategories = [],
  initialTypes = [],
  initialFunctions = [],
  initialUsages = [],
  initialBrands = [],
  initialFeatured = false,
  initialNew = false,
  initialUsed = false,
  initialSort = "newest",
}: {
  initialSearch?: string;
  initialCategories?: string[];
  initialTypes?: string[];
  initialFunctions?: string[];
  initialUsages?: string[];
  initialBrands?: string[];
  initialFeatured?: boolean;
  initialNew?: boolean;
  initialUsed?: boolean;
  initialSort?: string;
}) {
  const [printers, setPrinters] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize state from props (server-side values)
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(initialFunctions);
  const [selectedUsages, setSelectedUsages] = useState<string[]>(initialUsages);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
  const [showFeatured, setShowFeatured] = useState(initialFeatured);
  const [showNew, setShowNew] = useState(initialNew);
  const [showUsed, setShowUsed] = useState(initialUsed);
  const [sortBy, setSortBy] = useState<string>(initialSort);

  const fetchPrinters = useCallback(async () => {
    try {
      setLoading(true);

      // Construct Query Parameters
      const params = new URLSearchParams();

      if (searchQuery.trim()) params.append("search", searchQuery);

      selectedCategories.forEach((cat) => params.append("category", cat));
      selectedTypes.forEach((type) => params.append("type", type));
      selectedFunctions.forEach((func) => params.append("function", func));
      selectedUsages.forEach((usage) => params.append("usage", usage));
      selectedBrands.forEach((brand) => params.append("brand", brand));

      if (showFeatured) params.append("featured", "true");
      if (showNew) params.append("is_new", "true");
      if (showUsed) params.append("is_new", "false");

      params.append("sort", sortBy);

      const response = await fetch(`/api/printers?${params.toString()}`);
      const data = await response.json();
      setPrinters(data.printers || []);
    } catch (error) {
      console.error("Error fetching printers:", error);
      setPrinters([]);
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    selectedCategories,
    selectedTypes,
    selectedFunctions,
    selectedUsages,
    selectedBrands,
    showFeatured,
    showNew,
    showUsed,
    sortBy,
  ]);

  // Effect triggers whenever any filter state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPrinters();
    }, 300); // 300ms delay to prevent excessive API calls while typing

    return () => clearTimeout(timeoutId);
  }, [fetchPrinters]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedFunctions([]);
    setSelectedUsages([]);
    setSelectedBrands([]);
    setShowFeatured(false);
    setShowNew(false);
    setShowUsed(false);
    setSearchQuery("");
    setSortBy("newest");
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
    searchQuery.trim() !== "" ||
    selectedCategories.length > 0 ||
    selectedTypes.length > 0 ||
    selectedFunctions.length > 0 ||
    selectedUsages.length > 0 ||
    selectedBrands.length > 0 ||
    showFeatured ||
    showNew ||
    showUsed;

  // Filter component (Reuse logic)
  const FilterContent = () => (
    <Accordion
      type="multiple"
      defaultValue={["category", "type"]}
      className="space-y-0"
    >
      {/* Categories */}
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

      {/* Types */}
      <AccordionItem value="type">
        <AccordionTrigger className="text-sm font-semibold text-foreground py-3">
          Type
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {TYPES.map((type) => (
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
        </AccordionContent>
      </AccordionItem>

      {/* Functions */}
      <AccordionItem value="function">
        <AccordionTrigger className="text-sm font-semibold text-foreground py-3">
          Function
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {FUNCTIONS.map((func) => (
              <div key={func} className="flex items-center space-x-2">
                <Checkbox
                  id={`func-${func}`}
                  checked={selectedFunctions.includes(func)}
                  onCheckedChange={() =>
                    toggleFilter(func, selectedFunctions, setSelectedFunctions)
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
        </AccordionContent>
      </AccordionItem>

      {/* Usage */}
      <AccordionItem value="usage">
        <AccordionTrigger className="text-sm font-semibold text-foreground py-3">
          Usage
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-2">
            {USAGES.map((usage) => (
              <div key={usage} className="flex items-center space-x-2">
                <Checkbox
                  id={`usage-${usage}`}
                  checked={selectedUsages.includes(usage)}
                  onCheckedChange={() =>
                    toggleFilter(usage, selectedUsages, setSelectedUsages)
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
        </AccordionContent>
      </AccordionItem>

      {/* Brands */}
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
            <h1 className="text-4xl font-bold mb-2">Printers</h1>
            <p className="text-foreground/60">
              Complete catalog of quality printing solutions
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search printers..."
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
              {printers.length} products
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
                  Filter printers by your preferences
                </SheetDescription>
              </SheetHeader>
              <div className="px-4 ">
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

                <div className="space-y-3 pb-4 border-b">
                  <h3 className="text-sm font-semibold">Quick Filters</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured-mobile"
                        checked={showFeatured}
                        onCheckedChange={(checked) =>
                          setShowFeatured(checked === true)
                        }
                      />
                      <Label
                        htmlFor="featured-mobile"
                        className="text-sm cursor-pointer font-normal"
                      >
                        Featured Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new-mobile"
                        checked={showNew}
                        onCheckedChange={(checked) =>
                          setShowNew(checked === true)
                        }
                      />
                      <Label
                        htmlFor="new-mobile"
                        className="text-sm cursor-pointer font-normal"
                      >
                        New
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="used-mobile"
                        checked={showUsed}
                        onCheckedChange={(checked) =>
                          setShowUsed(checked === true)
                        }
                      />
                      <Label
                        htmlFor="used-mobile"
                        className="text-sm cursor-pointer font-normal"
                      >
                        Used
                      </Label>
                    </div>
                  </div>
                </div>

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

            <div className="space-y-3 pb-4 border-b mb-4">
              <h3 className="text-sm font-semibold">Quick Filters</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured-desktop"
                    checked={showFeatured}
                    onCheckedChange={(checked) =>
                      setShowFeatured(checked === true)
                    }
                  />
                  <Label
                    htmlFor="featured-desktop"
                    className="text-sm cursor-pointer font-normal"
                  >
                    Featured Only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="new-desktop"
                    checked={showNew}
                    onCheckedChange={(checked) => setShowNew(checked === true)}
                  />
                  <Label
                    htmlFor="new-desktop"
                    className="text-sm cursor-pointer font-normal"
                  >
                    New
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="used-desktop"
                    checked={showUsed}
                    onCheckedChange={(checked) => setShowUsed(checked === true)}
                  />
                  <Label
                    htmlFor="used-desktop"
                    className="text-sm cursor-pointer font-normal"
                  >
                    Used
                  </Label>
                </div>
              </div>
            </div>

            <FilterContent />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">Loading printers...</p>
            </div>
          ) : printers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">
                No printers found matching your filters
              </p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {printers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageFit="object-contain"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
