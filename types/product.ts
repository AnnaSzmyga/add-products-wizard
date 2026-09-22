import { currencies } from "@/data/product-options";

export type Currency = (typeof currencies)[number];

export type Product = {
  id: string;
  name: string;
  sku: string;
  description: string;
  manufacturer: string;
  category: string;
  features: string[];
  netPrice: number;
  grossPrice: number;
  vat: number;
  currency: Currency;
  isAvailable: boolean;
  isLimited: boolean;
  stockQuantity: number | null;
  minOrderQuantity: number;
  maxOrderQuantity: number;
};

export type ProductFormValues = Omit<Product, "id">;
