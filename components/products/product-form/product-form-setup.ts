import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import type { ProductFormValues } from "@/types/product";

export const initialValues: ProductFormValues = {
  name: "",
  sku: "",
  description: "",
  manufacturer: "",
  category: "",
  features: [],

  netPrice: 0,
  grossPrice: 0,
  vat: 23,
  currency: "PLN",

  isAvailable: true,
  isLimited: false,
  stockQuantity: null,
  minOrderQuantity: 1,
  maxOrderQuantity: 1,
};

const { fieldContext, formContext } = createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
