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

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description?: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-border/50 overflow-hidden group bg-card">
      <CardHeader className="pb-3">
        <div className="mb-2">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-0 hover:bg-primary/20 transition-colors"
          >
            {product.category}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <div className="relative w-full h-48 bg-muted/50 rounded-lg overflow-hidden mb-4 group-hover:shadow-md transition-shadow">
          <Image
            src={
              product.image_url ||
              "/placeholder.svg?height=200&width=300&query=printer"
            }
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {product.description && (
          <CardDescription className="line-clamp-2">
            {product.description}
          </CardDescription>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-3 bg-muted/20">
        <p className="text-2xl font-bold text-primary">
          PKR {product.price.toLocaleString()}
        </p>
        <Button
          asChild
          className="w-full shadow-md hover:shadow-lg transition-all bg-primary text-primary-foreground hover:bg-primary/90"
          size="sm"
        >
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
