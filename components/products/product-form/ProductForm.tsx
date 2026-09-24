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
import { Button } from "../../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductFormStepper } from "./ProductFormStepper";

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
    <div className="flex min-h-0 flex-1 flex-col">
      <ProductFormStepper currentStep={currentStep} />

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
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
      </div>

      <div className="flex h-17 shrink-0 items-center justify-between border-t border-border bg-secondary px-4">
        {currentStep !== 0 ? (
          <Button
            onClick={handleBack}
            variant="outline"
            className="bg-secondary"
          >
            <ArrowLeft />
            Wstecz
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 2 ? (
          <Button onClick={handleNext}>
            Dalej
            <ArrowRight />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Zapisz produkt</Button>
        )}
      </div>
    </div>
  );
}
