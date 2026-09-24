import { Product } from "@/types/product";
import { ProductMobileCard } from "./ProductMobileCard";
import { PaginationControls } from "./PaginationControls";

type ProductsMobileListProps = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
};

export function ProductsMobileList({
  products,
  currentPage,
  totalPages,
  totalProducts,
  onPageChange,
}: ProductsMobileListProps) {
  return (
    <div className="md:hidden">
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <ProductMobileCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8">
        <p className="text-center text-sm font-normal leading-5 text-muted-foreground">
          Strona {currentPage} z {totalPages} · {totalProducts} produktów
        </p>

        <div className="mt-4 flex items-center justify-center gap-1">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
