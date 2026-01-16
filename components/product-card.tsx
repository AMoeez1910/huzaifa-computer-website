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

// Helper function to extract plain text from Lexical editor state
function extractPlainText(description: any): string {
  if (!description) return "";

  try {
    // If it's a string, try parsing it first
    let parsedDescription = description;
    if (typeof description === "string") {
      try {
        parsedDescription = JSON.parse(description);
      } catch {
        // If parsing fails, return the string as-is
        return description;
      }
    }

    // Handle Lexical SerializedEditorState
    if (parsedDescription?.root && parsedDescription.root.children) {
      const extractText = (nodes: any[]): string[] => {
        const texts: string[] = [];
        nodes.forEach((node: any) => {
          if (node.text && node.text.trim()) {
            texts.push(node.text.trim());
          }
          if (node.children) {
            texts.push(...extractText(node.children));
          }
        });
        return texts;
      };
      return extractText(parsedDescription.root.children).join(" • ");
    }
  } catch (error) {
    console.error("Error extracting text:", error);
    return "";
  }
  return "";
}

export function ProductCard({ product }: { product: Product | Accessory }) {
  // Check if it's a printer (has usage property)
  const isPrinter = "usage" in product;
  const printerProduct = product as Product;

  // Calculate discounted price if discount exists
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice =
    hasDiscount && product.discount
      ? product.price * (1 - product.discount / 100)
      : null;

  // Get plain text description
  const plainDescription = extractPlainText(product.description);

  // Build the link based on product type
  const linkHref = isPrinter
    ? `/printers/${product.id}`
    : `/accessories/${product.id}`;

  return (
    <Link href={linkHref} className="block h-full">
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
          {isPrinter && printerProduct.is_new && (
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

        <CardContent className="flex flex-col gap-3 pt-4 pb-6 justify-center items-center">
          {/* Name */}
          <CardTitle className="line-clamp-2 text-lg font-normal group-hover:text-primary transition-colors text-center">
            {product.name}
          </CardTitle>

          {/* Usage & Description */}
          {((isPrinter && printerProduct.usage) || plainDescription) && (
            <p className="text-sm font-medium text-muted-foreground text-center w-full whitespace-normal wrap-break-word">
              {isPrinter && printerProduct.usage && (
                <span>{printerProduct.usage}</span>
              )}
              {isPrinter && printerProduct.usage && plainDescription && (
                <span> • </span>
              )}
              {plainDescription && <span>{plainDescription}</span>}
            </p>
          )}

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
