"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description?: string;
  original_price?: number;
  discount_percentage?: number;
}

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount =
    product.original_price && product.original_price > product.price;

  return (
    <Card className="flex flex-col h-full hover:bg-secondary/60 transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative w-full aspect-4/3 bg-muted/50 overflow-hidden">
        <Image
          src={
            product.image_url ||
            "/placeholder.svg?height=300&width=400&query=printer"
          }
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardContent className="flex flex-col gap-6 pt-4 pb-6 justify-center items-center">
        {/* Name */}
        <CardTitle className="line-clamp-2 text-lg font-normal group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-center text-sm font-bold">
          {product.description}
        </CardDescription>
        {/* Price */}
        <div className="w-full flex items-center gap-2 justify-center">
          <p className="text-2xl font-bold text-primary">
            PKR {product.price.toLocaleString()}
          </p>
          {hasDiscount && (
            <p className="text-lg font-medium text-muted-foreground line-through">
              PKR {product.original_price?.toLocaleString()}
            </p>
          )}
        </div>

        {/* Shop Now Button */}
        <Button
          asChild
          variant="outline"
          className="w-full transition-all"
          size="default"
        >
          <Link href={`/products/${product.id}`}>Shop Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
