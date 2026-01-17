import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET all accessories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();

    let query = supabase.from("accessories").select("*");

    // Check if this is an admin request
    const isAdmin = searchParams.get("admin") === "true";

    // Filter by is_active for non-admin requests
    if (!isAdmin) {
      query = query.eq("is_active", true);
    }

    // 1. Handle Search (Multi-column ILIKE)
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`
      );
    }

    // 2. Handle Multi-Select Filters (Arrays)
    const categories = searchParams.getAll("category");
    if (categories.length > 0) {
      query = query.in("category", categories);
    }

    const brands = searchParams.getAll("brand");
    if (brands.length > 0) {
      query = query.in("brand", brands);
    }

    // 3. Handle Sorting
    const sort = searchParams.get("sort") || "featured";

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
      case "newest":
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }

    // 4. Handle Limit
    const limit = searchParams.get("limit");
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ accessories: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
