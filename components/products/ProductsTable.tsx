import { Product } from "@/types/product";
import { ProductPagination } from "./ProductsPagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

type ProductsTableProps = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
};

export function ProductsTable({
  products,
  currentPage,
  totalPages,
  totalProducts,
  onPageChange,
}: ProductsTableProps) {
  return (
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
            {products.map((product) => (
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

      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalProducts={totalProducts}
        onPageChange={onPageChange}
      />
    </div>
  );
}
