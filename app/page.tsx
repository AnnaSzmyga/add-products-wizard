"use client";

import { useMemo, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Check, ChevronLeft, ChevronRight, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProductForm } from "@/components/products/ProductForm";
import { mockProducts } from "@/data/mock-products";
import type { Product, ProductFormValues } from "@/types/product";
import { cn } from "@/lib/utils";

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

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

          <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger
              render={
                <Button>
                  <PlusIcon />
                  Dodaj produkt
                </Button>
              }
            />

            <DialogContent className="flex h-full w-full max-w-none flex-col rounded-none p-0 sm:h-auto sm:max-h-[90vh] sm:max-w-[720px] sm:rounded-xl sm:border sm:border-border">
              <DialogHeader className="h-[72px] shrink-0 justify-center border-b border-border px-4">
                <DialogTitle className="text-base font-medium leading-5 text-foreground">
                  Dodaj nowy produkt
                </DialogTitle>
              </DialogHeader>

              <ProductForm key={formKey} onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Desktop / tablet */}
        <div className="hidden overflow-hidden rounded-xl border border-border bg-white shadow-sm md:block">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="h-[54px] border-border bg-[#F9FAFB] font-medium hover:bg-[#F9FAFB]">
                  <TableHead className="px-6 text-sm font-medium text-muted-foreground">
                    Nazwa
                  </TableHead>

                  <TableHead className="px-6 text-sm font-medium text-muted-foreground">
                    SKU
                  </TableHead>

                  <TableHead className="px-6 text-sm font-medium text-muted-foreground">
                    Kategoria
                  </TableHead>

                  <TableHead className="px-6 text-sm font-medium text-muted-foreground">
                    Cena brutto
                  </TableHead>

                  <TableHead className="px-6 text-sm font-medium text-muted-foreground">
                    Status
                  </TableHead>

                  <TableHead className="px-6 text-sm font-medium text-muted-foreground">
                    Magazyn
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="h-[54px] border-border bg-white hover:bg-white"
                  >
                    <TableCell className="px-6 font-medium text-foreground">
                      {product.name}
                    </TableCell>

                    <TableCell className="px-6 text-sm text-muted-foreground">
                      {product.sku}
                    </TableCell>

                    <TableCell className="px-6 text-sm text-muted-foreground">
                      {product.category}
                    </TableCell>

                    <TableCell className="px-6 text-sm font-medium text-foreground">
                      {product.grossPrice.toFixed(2)} {product.currency}
                    </TableCell>

                    <TableCell className="px-6">
                      <Badge
                        variant="outline"
                        className={
                          product.isAvailable
                            ? "border-none bg-green-100 text-green-600"
                            : "border-none bg-red-100 text-red-600"
                        }
                      >
                        {product.isAvailable ? "Dostępny" : "Niedostępny"}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-6 text-sm text-foreground">
                      {product.stockQuantity ?? "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="border-t border-border bg-[#F9FAFB] px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <p className="whitespace-nowrap text-sm text-muted-foreground">
                Strona {currentPage} z {totalPages} · {totalProducts} produktów
              </p>

              <div className="flex shrink-0 items-center gap-1">
                <Button
                  variant="ghost"
                  size="pagination"
                  className="rounded-md"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft />
                  Wstecz
                </Button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === currentPage;

                  return (
                    <Button
                      key={pageNumber}
                      variant={isActive ? "default" : "ghost"}
                      size="pagination"
                      className={cn(
                        "rounded-md",
                        !isActive &&
                          "bg-transparent text-foreground hover:bg-muted"
                      )}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}

                <Button
                  variant="ghost"
                  size="pagination"
                  className="rounded-md"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Dalej
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex flex-col gap-3">
            {paginatedProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-xl border border-border bg-white p-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-medium leading-5 text-foreground">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-xs font-normal leading-4 text-muted-foreground">
                      {product.sku}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0 border-none",
                      product.isAvailable
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    )}
                  >
                    {product.isAvailable ? "Dostępny" : "Niedostępny"}
                  </Badge>
                </div>

                <div className="mt-3 grid grid-cols-3 rounded-xl bg-[#F5F5F5] px-3 py-3">
                  <div>
                    <p className="text-xs font-normal leading-4 text-muted-foreground">
                      Kategoria
                    </p>

                    <p className="mt-1 text-sm font-normal leading-5 text-foreground">
                      {product.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-normal leading-4 text-muted-foreground">
                      Cena brutto
                    </p>

                    <p className="mt-1 whitespace-nowrap text-sm font-medium leading-5 text-foreground">
                      {product.grossPrice.toFixed(2)} {product.currency}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-normal leading-4 text-muted-foreground">
                      Magazyn
                    </p>

                    <p className="mt-1 text-sm font-normal leading-5 text-foreground">
                      {product.stockQuantity ?? "—"}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile pagination */}
          <div className="mt-8">
            <p className="text-center text-sm font-normal leading-5 text-muted-foreground">
              Strona {currentPage} z {totalPages} · {totalProducts} produktów
            </p>

            <div className="mt-4 flex items-center justify-center gap-1">
              <Button
                variant="ghost"
                size="pagination"
                className="rounded-md"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft />
                Wstecz
              </Button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;

                return (
                  <Button
                    key={pageNumber}
                    variant={isActive ? "default" : "ghost"}
                    size="pagination"
                    className={cn(
                      "rounded-md",
                      !isActive &&
                        "bg-transparent text-foreground hover:bg-muted"
                    )}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              <Button
                variant="ghost"
                size="pagination"
                className="rounded-md"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Dalej
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
