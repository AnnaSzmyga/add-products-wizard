import { PaginationControls } from "./PaginationControls";

type ProductPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
};

export function ProductPagination({
  currentPage,
  totalPages,
  totalProducts,
  onPageChange,
}: ProductPaginationProps) {
  return (
    <div className="border-t border-border bg-[#F9FAFB] px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="whitespace-nowrap text-sm text-muted-foreground">
          Strona {currentPage} z {totalPages} · {totalProducts} produktów
        </p>

        <div className="flex shrink-0 items-center gap-1">
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
