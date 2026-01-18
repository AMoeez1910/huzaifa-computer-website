import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();

    let query = supabase.from("printers").select("*");

    // Check if this is an admin request (you can use headers or query params)
    const isAdmin = searchParams.get("admin") === "true";

    // Filter by is_active for non-admin requests
    if (!isAdmin) {
      query = query.eq("is_active", true);
    }

    // 1. Handle Search (Multi-column ILIKE)
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      // Searches name, brand, or category.
      query = query.or(
        `name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`,
      );
    }

    // 2. Handle Multi-Select Filters (Arrays)
    // We use getAll() to retrieve multiple params with the same key (e.g. category=Inkjet&category=Laser)

    const categories = searchParams.getAll("category");
    if (categories.length > 0) {
      query = query.in("category", categories);
    }

    const types = searchParams.getAll("type");
    if (types.length > 0) {
      query = query.in("type", types);
    }

    const functions = searchParams.getAll("function");
    if (functions.length > 0) {
      query = query.in("function", functions);
    }

    const brands = searchParams.getAll("brand");
    if (brands.length > 0) {
      query = query.in("brand", brands);
    }

    // 3. Handle Usage (Array Column)
    const usages = searchParams.getAll("usage");
    if (usages.length > 0) {
      query = query.overlaps("usage", usages);
    }

    // 4. Handle Featured Filter
    const featured = searchParams.get("featured");
    if (featured === "true") {
      query = query.eq("is_featured", true);
    }

    // 5. Handle New/Used Filter
    const isNew = searchParams.get("is_new");
    if (isNew === "true") {
      query = query.eq("is_new", true);
    } else if (isNew === "false") {
      query = query.eq("is_new", false);
    }

    // 6. Handle Sold Out Filter
    const soldOut = searchParams.get("sold_out");
    if (soldOut === "true") {
      query = query.eq("sold_out", true);
    } else if (soldOut === "false") {
      query = query.eq("sold_out", false);
    }

    // 7. Handle Sorting
    const sort = searchParams.get("sort") || "newest";

    switch (sort) {
      case "price-low":
        query = query.order("price", { ascending: true });
        break;
      case "price-high":
        query = query.order("price", { ascending: false });
        break;
      case "name-asc":
        query = query.order("name", { ascending: true });
        break;
      case "name-desc":
        query = query.order("name", { ascending: false });
        break;
      case "featured":
        // Sort featured first, then by date
        query = query
          .order("is_featured", { ascending: false })
          .order("created_at", { ascending: false });
        break;
      case "newest":
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }

    // 8. Handle Limit
    const limit = searchParams.get("limit");
    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }
    const { data, error } = await query;

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ printers: data });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
