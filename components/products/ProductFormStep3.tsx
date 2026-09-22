"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { initialValues, withForm } from "./product-form-setup";

export const ProductFormStep3 = withForm({
  defaultValues: initialValues,

  props: {
    errors: {} as Record<string, string>,
    onFieldChange: () => {},
  },

  render: function Render({ form, errors, onFieldChange }) {
    return (
      <div className="grid gap-5">
        <form.Field name="isAvailable">
          {(field) => (
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="grid gap-1">
                <Label htmlFor={field.name}>Produkt dostępny</Label>

                <p className="text-sm text-muted-foreground">
                  Określa, czy produkt jest aktualnie dostępny.
                </p>
              </div>

              <Switch
                id={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => {
                  field.handleChange(checked);
                  onFieldChange();
                }}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="isLimited">
          {(field) => (
            <div className="flex items-start gap-3">
              <Checkbox
                id={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => {
                  field.handleChange(checked === true);

                  if (checked !== true) {
                    form.setFieldValue("stockQuantity", null);
                  }

                  onFieldChange();
                }}
              />

              <div className="grid gap-1">
                <Label htmlFor={field.name} className="cursor-pointer">
                  Ograniczona liczba produktów
                </Label>

                <p className="text-sm text-muted-foreground">
                  Zaznacz, jeśli produkt ma ograniczoną liczbę dostępnych sztuk.
                </p>
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="stockQuantity">
          {(field) => {
            const isLimited = form.state.values.isLimited;

            if (!isLimited) {
              return null;
            }

            return (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Stan magazynowy</Label>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min="0"
                  step="1"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const value = event.target.value;

                    field.handleChange(value === "" ? null : Number(value));

                    onFieldChange();
                  }}
                />

                {errors.stockQuantity && (
                  <p className="text-sm text-destructive">
                    {errors.stockQuantity}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <form.Field name="minOrderQuantity">
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Minimalna liczba sztuk</Label>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min="1"
                  step="1"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(Number(event.target.value));
                    onFieldChange();
                  }}
                />

                {errors.minOrderQuantity && (
                  <p className="text-sm text-destructive">
                    {errors.minOrderQuantity}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="maxOrderQuantity">
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Maksymalna liczba sztuk</Label>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min="1"
                  step="1"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(Number(event.target.value));
                    onFieldChange();
                  }}
                />

                {errors.maxOrderQuantity && (
                  <p className="text-sm text-destructive">
                    {errors.maxOrderQuantity}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>
      </div>
    );
  },
});
