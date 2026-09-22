"use client";

import { useState } from "react";

import type { ProductFormValues } from "@/types/product";

import {
  productStep1Schema,
  productStep2Schema,
  productStep3Schema,
} from "@/schemas/product.schema";

import { initialValues, useAppForm } from "./product-form-setup";

import { ProductFormStep1 } from "./ProductFormStep1";
import { ProductFormStep2 } from "./ProductFormStep2";
import { ProductFormStep3 } from "./ProductFormStep3";

type ProductFormProps = {
  onSubmit: (product: ProductFormValues) => void;
};

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const form = useAppForm({
    defaultValues: initialValues,

    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  const validateStep = () => {
    let result;

    switch (currentStep) {
      case 0:
        result = productStep1Schema.safeParse(form.state.values);
        break;

      case 1:
        result = productStep2Schema.safeParse(form.state.values);
        break;

      case 2:
        result = productStep3Schema.safeParse(form.state.values);
        break;

      default:
        return true;
    }

    if (result.success) {
      setStepErrors({});
      return true;
    }

    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0];

      if (typeof fieldName === "string" && !errors[fieldName]) {
        errors[fieldName] = issue.message;
      }
    });

    setStepErrors(errors);

    return false;
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    setStepErrors({});
    setCurrentStep((step) => step + 1);
  };

  const handleBack = () => {
    setStepErrors({});
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    await form.handleSubmit();
  };

  const handleFieldChange = () => {
    if (Object.keys(stepErrors).length > 0) {
      setStepErrors({});
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Krok {currentStep + 1} z 3
          </p>

          <h2 className="text-lg font-semibold">
            {currentStep === 0 && "Informacje podstawowe"}
            {currentStep === 1 && "Cena"}
            {currentStep === 2 && "Dostępność i stany magazynowe"}
          </h2>
        </div>

        <div className="flex gap-1">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`h-1.5 w-8 rounded-full ${
                step <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {currentStep === 0 && (
        <ProductFormStep1
          form={form}
          errors={stepErrors}
          onFieldChange={handleFieldChange}
        />
      )}

      {currentStep === 1 && (
        <ProductFormStep2
          form={form}
          errors={stepErrors}
          onFieldChange={handleFieldChange}
        />
      )}

      {currentStep === 2 && (
        <ProductFormStep3
          form={form}
          errors={stepErrors}
          onFieldChange={handleFieldChange}
        />
      )}

      <div className="flex justify-between border-t pt-4">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
        >
          Wstecz
        </button>

        {currentStep < 2 ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Dalej
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Dodaj produkt
          </button>
        )}
      </div>
    </div>
  );
}
