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
            <div className="flex gap-2 border-b border-border pb-4">
              <Switch
                id={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => {
                  field.handleChange(checked);
                  onFieldChange();
                }}
              />
              <div className="grid gap-1">
                <Label htmlFor={field.name}>Produkt jest dostępny</Label>
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="isLimited">
          {(field) => (
            <div className="flex gap-2 border-b border-border pb-4">
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

              <Label htmlFor={field.name} className="cursor-pointer">
                Produkt limitowany
              </Label>
            </div>
          )}
        </form.Field>

        <h2 className="font-medium font-heading text-base">Limity koszyka</h2>

        <form.Subscribe selector={(state) => state.values.isLimited}>
          {(isLimited) => (
            <>
              {isLimited && (
                <form.Field name="stockQuantity">
                  {(field) => (
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

                          field.handleChange(
                            value === "" ? null : Number(value)
                          );

                          onFieldChange();
                        }}
                      />

                      {errors.stockQuantity && (
                        <p className="text-sm text-destructive">
                          {errors.stockQuantity}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              )}
            </>
          )}
        </form.Subscribe>

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
