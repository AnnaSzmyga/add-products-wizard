"use client";

import {
  categories,
  manufacturers,
  productFeatures,
} from "@/data/product-options";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { initialValues, withForm } from "./product-form-setup";

export const ProductFormStep1 = withForm({
  defaultValues: initialValues,

  props: {
    errors: {} as Record<string, string>,
    onFieldChange: () => {},
  },

  render: function Render({ form, errors, onFieldChange }) {
    return (
      <div className="grid gap-5">
        <form.Field name="name">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Nazwa produktu</Label>

              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                  onFieldChange();
                }}
                placeholder='Np. MacBook Pro 14"'
              />

              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="sku">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>SKU produktu</Label>

              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                  onFieldChange();
                }}
                maxLength={24}
                placeholder="Np. MBP14M3PRO"
              />

              {errors.sku && (
                <p className="text-sm text-destructive">{errors.sku}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Opis</Label>

              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                  onFieldChange();
                }}
                placeholder="Dodaj opis produktu..."
                rows={4}
              />

              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="manufacturer">
          {(field) => (
            <div className="grid gap-2">
              <Label>Producent</Label>

              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  if (value === null) {
                    return;
                  }

                  field.handleChange(value);
                  onFieldChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz producenta" />
                </SelectTrigger>

                <SelectContent>
                  {manufacturers.map((manufacturer) => (
                    <SelectItem key={manufacturer} value={manufacturer}>
                      {manufacturer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.manufacturer && (
                <p className="text-sm text-destructive">
                  {errors.manufacturer}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <div className="grid gap-2">
              <Label>Kategoria</Label>

              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  if (value === null) {
                    return;
                  }

                  field.handleChange(value);
                  onFieldChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz kategorię" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="features">
          {(field) => {
            const selectedFeatures = field.state.value;

            return (
              <div className="grid gap-3">
                <div>
                  <Label>Cechy produktu</Label>

                  <p className="text-sm text-muted-foreground">
                    Wybierz co najmniej jedną cechę.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {productFeatures.map((feature) => {
                    const checked = selectedFeatures.includes(feature);

                    return (
                      <label
                        key={feature}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(value) => {
                            if (value) {
                              field.handleChange([
                                ...selectedFeatures,
                                feature,
                              ]);
                            } else {
                              field.handleChange(
                                selectedFeatures.filter(
                                  (item) => item !== feature
                                )
                              );
                            }

                            onFieldChange();
                          }}
                        />

                        <span className="text-sm">{feature}</span>
                      </label>
                    );
                  })}
                </div>

                {errors.features && (
                  <p className="text-sm text-destructive">{errors.features}</p>
                )}
              </div>
            );
          }}
        </form.Field>
      </div>
    );
  },
});
