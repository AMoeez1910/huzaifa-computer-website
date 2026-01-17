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

export function ProductCard({
  product,
  imageFit = "object-contain",
}: {
  product: Product | Accessory;
  imageFit?: "object-contain" | "object-cover";
}) {
  // Check if it's a printer (has usage property)
  const isPrinter = "usage" in product;
  const printerProduct = product as Product;

  // Check if price exists
  const hasPrice =
    product.price !== null && product.price !== undefined && product.price > 0;

  // Calculate discounted price if discount exists
  const hasDiscount = hasPrice && product.discount && product.discount > 0;
  const discountedPrice =
    hasDiscount && product.discount
      ? product.price! * (1 - product.discount / 100)
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
          {hasDiscount && !product.sold_out && (
            <Badge className="absolute top-2 right-2 z-10 bg-red-500/90 text-white border-0 hover:bg-red-500 shadow-md">
              {product.discount}% OFF
            </Badge>
          )}
          {isPrinter && printerProduct.is_new && !product.sold_out && (
            <Badge className="absolute top-12 right-2 z-10 bg-linear-to-br from-green-500 to-emerald-600 text-white border-0 hover:from-green-600 hover:to-emerald-700 shadow-md transform -rotate-12 px-3 py-1">
              NEW
            </Badge>
          )}

          {/* Sold Out Overlay */}
          {product.sold_out && (
            <>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Badge className="text-2xl font-bold py-3 px-8 bg-red-600/90 text-white border-2 border-white shadow-2xl">
                  SOLD OUT
                </Badge>
              </div>
            </>
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
            className={`${imageFit} bg-white ${ 
              product.sold_out ? "grayscale opacity-50" : ""
            } group-hover:scale-105 transition-transform duration-300`}
          />
        </div>

        <CardContent className="flex flex-col gap-3 pt-4 pb-6 justify-center items-center">
          {/* Name */}
          <CardTitle className="line-clamp-2 text-lg font-normal group-hover:text-primary transition-colors text-center">
            {product.name}
          </CardTitle>

          {/* Usage (separate line for printers) */}
          {isPrinter &&
            printerProduct.usage &&
            printerProduct.usage.length > 0 && (
              <p className="text-sm font-medium text-muted-foreground text-center w-full">
                {printerProduct.usage.join(", ")}
              </p>
            )}

          {/* Description */}
          {plainDescription && (
            <p className="text-sm font-medium text-muted-foreground text-center w-full whitespace-normal wrap-break-word">
              {plainDescription}
            </p>
          )}

          {/* Price */}
          {hasPrice ? (
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
                    PKR {product.price!.toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-bold text-primary">
                  PKR {product.price!.toLocaleString()}
                </p>
              )}
            </div>
          ) : (
            <div className="w-full flex items-center gap-2 justify-center flex-wrap">
              <p className="text-sm font-medium text-muted-foreground">
                Contact for Price
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
