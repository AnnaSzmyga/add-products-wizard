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

import { initialValues, withForm } from "./product-form-setup";
import { Badge } from "../ui/badge";
import { cn } from "cn";

export const ProductFormStep1 = withForm({
  defaultValues: initialValues,

  props: {
    errors: {} as Record<string, string>,
    onFieldChange: () => {},
  },

  render: function Render({ form, errors, onFieldChange }) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Nazwa produktu */}
        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Nazwa produktu</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="np. MacBook Pro 14"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* SKU */}
        <form.Field name="sku">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>SKU</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="np. MBP14M3PRO"
                aria-invalid={!!errors.sku}
              />
              {errors.sku && (
                <p className="text-xs text-destructive">{errors.sku}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Opis — pełna szerokość */}
        <form.Field name="description">
          {(field) => (
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor={field.name}>Opis</Label>
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Krótki opis produktu"
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Producent */}
        <form.Field name="manufacturer">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Producent</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  if (value === null) return;
                  field.handleChange(value);
                }}
              >
                <SelectTrigger id={field.name}>
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
                <p className="text-xs text-destructive">
                  {errors.manufacturer}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Kategoria */}
        <form.Field name="category">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Kategoria</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  if (value === null) return;
                  field.handleChange(value);
                }}
              >
                <SelectTrigger id={field.name}>
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
                <p className="text-xs text-destructive">{errors.category}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="features">
          {(field) => {
            const selectedFeatures = field.state.value;

            return (
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label>Cechy produktu</Label>

                <div className="flex flex-wrap gap-2">
                  {productFeatures.map((feature) => {
                    const isSelected = selectedFeatures.includes(feature);

                    return (
                      <Badge
                        key={feature}
                        variant={isSelected ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer rounded-full px-2 py-0.5 text-sm font-normal",
                          isSelected ? "text-white" : "text-muted-foreground"
                        )}
                        onClick={() => {
                          if (isSelected) {
                            field.handleChange(
                              selectedFeatures.filter(
                                (item) => item !== feature
                              )
                            );
                          } else {
                            field.handleChange([...selectedFeatures, feature]);
                          }
                        }}
                      >
                        {feature}
                      </Badge>
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
