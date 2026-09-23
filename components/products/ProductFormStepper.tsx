"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductFormStepperProps = {
  currentStep: number;
};

const steps = [
  {
    title: "Informacje",
    description: "Dane podstawowe",
  },
  {
    title: "Cena",
    description: "Dane cenowe",
  },
  {
    title: "Dostępność",
    description: "Stany magazynowe",
  },
];

export function ProductFormStepper({ currentStep }: ProductFormStepperProps) {
  return (
    <div className="flex w-full pb-6 border-b border-border px-4 gap-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={step.title}
            className="relative flex flex-1 sm:flex-none flex-col sm:flex-row sm:gap-4 sm:items-center"
          >
            <div
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                isActive || isCompleted
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground border border-border"
              )}
            >
              {isCompleted ? (
                <Check className="size-4" strokeWidth={2.5} />
              ) : (
                index + 1
              )}
            </div>

            <div className="mt-3 sm:m-0 shrink-0">
              <p
                className={cn(
                  "text-sm font-medium leading-5",
                  isActive || isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </p>

              <p className="text-xs leading-4 text-muted-foreground">
                {step.description}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "hidden h-px w-[67px] sm:block",
                  index < currentStep ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
