import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET all printers
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const brand = searchParams.get("brand");
    const is_new = searchParams.get("is_new");
    const usage = searchParams.get("usage");
    const limit = searchParams.get("limit");

    const supabase = await createClient();

    let query = supabase
      .from("printers")
      .select("*")
      .order("created_at", { ascending: false });

    if (featured === "true") {
      query = query.eq("is_featured", true);
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (type) {
      query = query.eq("type", type);
    }

    if (brand) {
      query = query.ilike("name", `%${brand}%`);
    }

    if (is_new === "true") {
      query = query.eq("is_new", true);
    }

    if (usage) {
      query = query.eq("usage", usage);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ printers: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
