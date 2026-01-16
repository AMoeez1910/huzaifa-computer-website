"use client";

import { ProductImageCarousel } from "@/components/product-image-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Editor } from "@/components/ui/blocks/editor-00/editor";
import { ShoppingCart } from "lucide-react";

export function AccessoryDetailClient({ accessory }: { accessory: Accessory }) {
  const discountedPrice = accessory.discount
    ? accessory.price * (1 - accessory.discount / 100)
    : accessory.price;

  const hasDiscount = accessory.discount && accessory.discount > 0;

  // Parse description if it's a string
  const getDescription = () => {
    if (!accessory.description) return null;
    try {
      return typeof accessory.description === "string"
        ? JSON.parse(accessory.description)
        : accessory.description;
    } catch {
      return null;
    }
  };

  const description = getDescription();

  return (
    <div className="max-w-10xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <ProductImageCarousel
            images={
              accessory.images && accessory.images.length > 0
                ? accessory.images
                : accessory.main_image
                ? [accessory.main_image]
                : []
            }
            productName={accessory.name}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{accessory.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{accessory.name}</h1>
          </div>

          {/* Price */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Price</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    PKR {discountedPrice.toLocaleString("en-PK")}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        PKR {accessory.price.toLocaleString("en-PK")}
                      </span>
                      <Badge variant="destructive">
                        {accessory.discount}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                {hasDiscount && (
                  <p className="text-sm text-green-600 font-medium">
                    You save PKR{" "}
                    {(accessory.price - discountedPrice).toLocaleString(
                      "en-PK"
                    )}
                  </p>
                )}
              </div>

              <Button size="lg" className="w-full mt-6">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Contact for Purchase
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Description */}
      {description && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose prose-sm max-w-none">
              <Editor editorSerializedState={description} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
