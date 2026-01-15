"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminProductForm } from "./admin-product-form";
import { AdminProductList } from "./admin-product-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminNavbar } from "./admin-navbar";


export function AdminDashboard({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setActiveTab("add");
  };

  const handleFormSuccess = () => {
    setEditingProduct(null);
    setActiveTab("products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <AdminNavbar />

      <main className="max-w-10xl w-full mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val);
            if (val === "add") {
              setEditingProduct(null);
            }
          }}
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add">
              {editingProduct ? "Edit Product" : "Add Product"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">All Products</CardTitle>
                <CardDescription>Manage your printer inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminProductList
                  onProductUpdated={handleFormSuccess}
                  onEdit={handleEdit}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="mt-6">
            <Card className="border-border/50 shadow-lg py-4">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </CardTitle>
                <CardDescription>
                  {editingProduct
                    ? "Update product details"
                    : "Add a new printer to your catalog"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminProductForm
                  onSuccess={handleFormSuccess}
                  editProduct={editingProduct}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
