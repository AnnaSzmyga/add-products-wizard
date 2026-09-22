"use client";

import { useMemo, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

import { Badge } from "@/components/ui/badge";
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProductForm } from "@/components/products/ProductForm";
import { mockProducts } from "@/data/mock-products";
import type { Product, ProductFormValues } from "@/types/product";

const PRODUCTS_PER_PAGE = 5;

export default function Home() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    setIsDialogOpen(false);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Produkty</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {totalProducts} produktów w katalogu
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Dodaj produkt
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Dodaj produkt</DialogTitle>
              </DialogHeader>

              <ProductForm onSubmit={handleAddProduct} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Cena brutto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Magazyn</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>

                  <TableCell>{product.category}</TableCell>

                  <TableCell>
                    {product.grossPrice.toFixed(2)} {product.currency}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        product.isAvailable
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-red-200 bg-red-50 text-red-700"
                      }
                    >
                      {product.isAvailable ? "Dostępny" : "Niedostępny"}
                    </Badge>
                  </TableCell>

                  <TableCell>{product.stockQuantity ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="whitespace-nowrap text-sm text-muted-foreground">
                      Strona {currentPage} z {totalPages} · {totalProducts}{" "}
                      produktów
                    </p>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                      >
                        Wstecz
                      </button>

                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((pageNumber) => (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() => handlePageChange(pageNumber)}
                          className={`h-9 min-w-9 rounded-md border px-3 text-sm font-medium transition-colors ${
                            pageNumber === currentPage
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                      >
                        Dalej
                      </button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </main>
  );
}
