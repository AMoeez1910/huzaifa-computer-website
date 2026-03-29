"use client";

import { ProductImageCarousel } from "@/components/product-image-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditorReadonly } from "@/components/ui/blocks/editor-00";
import { Phone, Tag } from "lucide-react";
import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";

export function AccessoryDetailClient({ accessory }: { accessory: Accessory }) {
  const hasPrice =
    accessory.price !== null &&
    accessory.price !== undefined &&
    accessory.price > 0;

  const discountedPrice: number =
    hasPrice && accessory.discount
      ? accessory.price! * (1 - accessory.discount / 100)
      : hasPrice
        ? accessory.price!
        : 0;

  const hasDiscount = hasPrice && accessory.discount && accessory.discount > 0;

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

  const whatsappMessage = encodeURIComponent(
    `Hi, is the ${accessory.name} available? I would like to know more about it.\n${process.env.NEXT_PUBLIC_BASE_URL}/accessories/${accessory.id}`,
  );
  const whatsappUrl = `https://wa.me/923009403751?text=${whatsappMessage}`;

  return (
    <div className="w-full py-12 bg-linear-to-b from-muted/30 to-background">
      <div className="max-w-10xl w-full mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Carousel */}
          <div className="flex items-center justify-center">
            <div className="relative w-full">
              <div className={accessory.sold_out ? "grayscale opacity-70" : ""}>
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
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {accessory.name}
                </h1>
                {accessory.sold_out && (
                  <div className="w-full flex justify-center items-center text-2xl font-bold p-2 bg-primary text-white shadow-2xl">
                    SOLD OUT
                  </div>
                )}
              </div>

              {/* Price Section */}
              {hasPrice && (
                <div className="flex items-baseline gap-3 mb-6">
                  {hasDiscount ? (
                    <div className="flex flex-col justify-center gap-2">
                      <div className="flex gap-4 items-center">
                        <p className="text-3xl font-semibold text-primary">
                          PKR{" "}
                          {discountedPrice.toLocaleString("en-PK", {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                        <p className="text-xl font-medium text-muted-foreground line-through">
                          PKR {accessory.price?.toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={"secondary"}>
                        {accessory.discount}% Off
                      </Badge>
                    </div>
                  ) : (
                    <p className="text-3xl font-semibold text-primary">
                      PKR {accessory.price!.toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              {/* Description Section */}
              <div className="mb-8 pb-8 border-b border-border">
                {description ? (
                  <div className="text-muted-foreground leading-relaxed">
                    <EditorReadonly editorSerializedState={description} />
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    No description available
                  </p>
                )}
              </div>

              {/* Product Specifications */}
              <Card className="bg-muted/50 border-border/50 mb-8">
                <CardContent className="py-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Product Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Category
                      </p>
                      <p className="font-semibold">{accessory.category}</p>
                    </div>
                    {accessory.brand && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Brand
                        </p>
                        <p className="font-semibold">{accessory.brand}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-8 border-t border-border">
              {accessory.sold_out && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-2">
                  <p className="text-red-800 dark:text-red-200 font-medium text-center">
                    This accessory is currently sold out. Contact us for
                    availability or similar products.
                  </p>
                </div>
              )}
              <Button
                size="lg"
                className="gap-2 shadow-md hover:shadow-lg transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link href={whatsappUrl} target="_blank">
                  <SiWhatsapp
                    style={{
                      width: "var(--space-l-s)",
                      height: "var(--space-l-s)",
                    }}
                  />{" "}
                  {accessory.sold_out
                    ? "Enquire on WhatsApp"
                    : "Contact via WhatsApp"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="tel:03009403751">
                  <Phone className="h-5 w-5" />
                  Call for {accessory.sold_out ? "Enquiry" : "Availability"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
