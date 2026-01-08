import { createClient } from "@/lib/supabase/server"
import { ProductDetailClient } from "./product-detail-client"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single()

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} - Huzaifa Computers`,
    description: product.description || `Buy ${product.name} at Huzaifa Computers`,
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single()

  return <ProductDetailClient product={product} />
}
