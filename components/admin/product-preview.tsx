"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { EditorReadonly } from "@/components/ui/blocks/editor-00";
import { SerializedEditorState } from "lexical";

interface ProductPreviewProps {
  product: {
    name: string;
    category: string;
    price: number;
    discount?: number | null;
    description?: SerializedEditorState | null;
    type?: string;
    function?: string;
    usage?: string;
    is_featured?: boolean;
    is_new?: boolean;
    images?: string[];
    main_image?: string;
  };
}

export function ProductPreview({ product }: ProductPreviewProps) {
  // Prepare images array for carousel - always include main_image first
  const productImages = [
    ...(product.main_image ? [product.main_image] : []),
    ...(product.images || []),
  ];

  // Calculate discounted price if discount exists
  const discountedPrice =
    product.discount && product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : null;

  return (
    <div className="w-full py-6">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Product Image Carousel */}
          <div className="flex items-center justify-center">
            {productImages.length > 0 ? (
              <ProductImageCarousel
                images={productImages}
                productName={product.name}
              />
            ) : (
              <div className="aspect-square w-full max-w-md bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                No images uploaded
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div>
              {product.is_new && (
                <Badge className="mb-2 mr-2 bg-green-500/10 text-green-600 border-0 hover:bg-green-500/20">
                  New
                </Badge>
              )}
              {product.is_featured && (
                <Badge className="mb-2 mr-2 bg-yellow-500/10 text-yellow-600 border-0 hover:bg-yellow-500/20">
                  Featured
                </Badge>
              )}
              {product.discount && product.discount > 0 && (
                <Badge className="mb-2 mr-2 bg-red-500/10 text-red-600 border-0 hover:bg-red-500/20">
                  {product.discount}% OFF
                </Badge>
              )}
              {product.category && (
                <Badge className="mb-4 bg-primary/10 text-primary border-0 hover:bg-primary/20">
                  {product.category}
                </Badge>
              )}

              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {product.name || "Product Name"}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                {discountedPrice ? (
                  <>
                    <p className="text-3xl font-bold text-green-600">
                      PKR{" "}
                      {discountedPrice.toLocaleString("en-PK", {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <p className="text-xl font-medium text-muted-foreground line-through">
                      PKR {product.price.toLocaleString()}
                    </p>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-primary">
                    PKR {(product.price || 0).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                {product.description && product.description.root ? (
                  <div className="text-muted-foreground leading-relaxed">
                    <EditorReadonly
                      editorSerializedState={product.description}
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    No description available
                  </p>
                )}
              </div>

              <Card className="bg-muted/50 border-border/50">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.category && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Category
                        </p>
                        <p className="font-semibold">{product.category}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Price
                      </p>
                      <p className="font-semibold text-primary">
                        PKR {(product.price || 0).toLocaleString()}
                      </p>
                    </div>
                    {product.type && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Type
                        </p>
                        <p className="font-semibold">{product.type}</p>
                      </div>
                    )}
                    {product.function && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Function
                        </p>
                        <p className="font-semibold">{product.function}</p>
                      </div>
                    )}
                    {product.usage && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Usage
                        </p>
                        <p className="font-semibold">{product.usage}</p>
                      </div>
                    )}
                    {product.discount && product.discount > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Discount
                        </p>
                        <p className="font-semibold text-green-600">
                          {product.discount.toFixed(0)}% OFF
                        </p>
                      </div>
                    )}
                    {discountedPrice && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          You Save
                        </p>
                        <p className="font-semibold text-green-600">
                          PKR{" "}
                          {(product.price - discountedPrice).toLocaleString(
                            "en-PK",
                            { maximumFractionDigits: 0 }
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
