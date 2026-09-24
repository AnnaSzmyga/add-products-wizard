import { Suspense } from "react";
import ProductsPage from "@/components/products/ProductsPage";

export default function Home() {
  return (
    <Suspense>
      <ProductsPage />
    </Suspense>
  );
}
