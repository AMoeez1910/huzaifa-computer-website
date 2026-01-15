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
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
  // Calculate discounted price if discount exists
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice =
    hasDiscount && product.discount
      ? product.price * (1 - product.discount / 100)
      : null;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="flex flex-col h-full hover:bg-secondary/60 transition-all duration-300 overflow-hidden group cursor-pointer">
        {/* Image */}
        <div className="relative w-full aspect-4/3 bg-muted/50 overflow-hidden">
          {/* Category Badge - Top Left */}
          {product.category && (
            <Badge className="absolute top-2 left-2 z-10 bg-primary/90 text-primary-foreground border-0 hover:bg-primary shadow-md">
              {product.category}
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="absolute top-2 right-2 z-10 bg-red-500/90 text-white border-0 hover:bg-red-500 shadow-md">
              {product.discount}% OFF
            </Badge>
          )}
          {product.is_new && (
            <Badge className="absolute top-12 left-2 z-10 bg-green-500/90 text-white border-0 hover:bg-green-500 shadow-md">
              New
            </Badge>
          )}
          <Image
            src={
              product.main_image ||
              (product.images && product.images.length > 0
                ? product.images[0]
                : null) ||
              "/placeholder.svg?height=300&width=400&query=printer"
            }
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardContent className="flex flex-col gap-4 pt-4 pb-6 justify-center items-center">
          {/* Name */}
          <CardTitle className="line-clamp-2 text-lg font-normal group-hover:text-primary transition-colors text-center">
            {product.name}
          </CardTitle>

          {/* Price */}
          <div className="w-full flex items-center gap-2 justify-center flex-wrap">
            {discountedPrice ? (
              <>
                <p className="text-2xl font-bold text-green-600">
                  PKR{" "}
                  {discountedPrice.toLocaleString("en-PK", {
                    maximumFractionDigits: 0,
                  })}
                </p>
                <p className="text-lg font-medium text-muted-foreground line-through">
                  PKR {product.price.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-primary">
                PKR {product.price.toLocaleString()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
