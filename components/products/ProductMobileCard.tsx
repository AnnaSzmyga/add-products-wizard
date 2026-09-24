import { Product } from "@/types/product";
import { Badge } from "../ui/badge";
import { cn } from "cn";

type ProductMobileCardProps = {
  product: Product;
};

export function ProductMobileCard({ product }: ProductMobileCardProps) {
  return (
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
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
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
  );
}
