import { z } from "zod";

import {
  categories,
  currencies,
  manufacturers,
  productFeatures,
  vatRates,
} from "@/data/product-options";

export const productStep1Schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nazwa produktu musi mieć co najmniej 3 znaki"),

  sku: z
    .string()
    .trim()
    .min(1, "SKU jest wymagane")
    .max(24, "SKU może mieć maksymalnie 24 znaki")
    .regex(/^[a-zA-Z0-9]+$/, "SKU może zawierać tylko litery i cyfry"),

  description: z.string(),

  manufacturer: z.enum(manufacturers, {
    message: "Wybierz producenta",
  }),

  category: z.enum(categories, {
    message: "Wybierz kategorię",
  }),

  features: z
    .array(z.enum(productFeatures))
    .min(1, "Wybierz co najmniej jedną cechę"),
});

export const productStep2Schema = z.object({
  netPrice: z.number().positive("Cena netto musi być większa od 0"),

  grossPrice: z.number().positive("Cena brutto musi być większa od 0"),

  vat: z
    .number()
    .refine(
      (value) => (vatRates as readonly number[]).includes(value),
      "Wybierz prawidłową stawkę VAT"
    ),

  currency: z.enum(currencies, {
    message: "Wybierz walutę",
  }),
});

export const productStep3Schema = z
  .object({
    isAvailable: z.boolean(),

    isLimited: z.boolean(),

    stockQuantity: z
      .number()
      .int("Stan magazynowy musi być liczbą całkowitą")
      .nonnegative("Stan magazynowy nie może być ujemny")
      .nullable(),

    minOrderQuantity: z
      .number()
      .int("Minimalna ilość musi być liczbą całkowitą")
      .positive("Minimalna ilość musi być większa od 0"),

    maxOrderQuantity: z
      .number()
      .int("Maksymalna ilość musi być liczbą całkowitą")
      .positive("Maksymalna ilość musi być większa od 0"),
  })
  .superRefine((data, ctx) => {
    if (data.isLimited && data.stockQuantity === null) {
      ctx.addIssue({
        code: "custom",
        path: ["stockQuantity"],
        message: "Podaj ilość produktu na magazynie",
      });
    }

    if (data.minOrderQuantity > data.maxOrderQuantity) {
      ctx.addIssue({
        code: "custom",
        path: ["minOrderQuantity"],
        message: "Minimalna ilość nie może być większa od maksymalnej",
      });

      ctx.addIssue({
        code: "custom",
        path: ["maxOrderQuantity"],
        message: "Maksymalna ilość nie może być mniejsza od minimalnej",
      });
    }
  });
