"use client";

import { useMemo, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { mockProducts } from "@/data/mock-products";
import type { Product, ProductFormValues } from "@/types/product";
import { ProductDialog } from "@/components/products/ProductDialog";
import { ProductsTable } from "@/components/products/ProductsTable";
import { ProductsMobileList } from "@/components/products/ProductsMobileList";

const PRODUCTS_PER_PAGE = 5;

export default function Home() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const totalProducts = products.length;

  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));

  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [products, currentPage]);

  const handleAddProduct = (product: ProductFormValues) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...product,
    };

    setProducts((currentProducts) => [...currentProducts, newProduct]);

    toast.success("Produkt został dodany", {
      icon: (
        <span className="flex size-5 items-center justify-center rounded-full bg-green-500">
          <Check className="size-3 text-white" strokeWidth={3} />
        </span>
      ),
    });

    setIsDialogOpen(false);
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setFormKey((key) => key + 1);
    }

    setIsDialogOpen(open);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:p-8">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Produkty</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {totalProducts} produktów w katalogu
            </p>
          </div>
          <ProductDialog
            isDialogOpen={isDialogOpen}
            formKey={formKey}
            handleDialogChange={handleDialogChange}
            handleAddProduct={handleAddProduct}
          />
        </div>

        {/* Desktop / tablet */}
        <ProductsTable
          products={paginatedProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={totalProducts}
          onPageChange={setPage}
        />

        {/* Mobile */}
        <ProductsMobileList
          products={paginatedProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={totalProducts}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
