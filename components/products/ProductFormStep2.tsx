"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { currencies, vatRates } from "@/data/product-options";
import { initialValues, withForm } from "./product-form-setup";

export const ProductFormStep2 = withForm({
  defaultValues: initialValues,

  props: {
    errors: {} as Record<string, string>,
    onFieldChange: () => {},
  },

  render: function Render({ form, errors, onFieldChange }) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <form.Field name="netPrice">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Cena netto</Label>

              <Input
                id={field.name}
                name={field.name}
                type="number"
                min="0"
                step="0.01"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const netPrice = Number(event.target.value);
                  const vat = form.state.values.vat;

                  field.handleChange(netPrice);

                  const grossPrice = Number(
                    (netPrice * (1 + vat / 100)).toFixed(2)
                  );

                  form.setFieldValue("grossPrice", grossPrice);
                  onFieldChange();
                }}
              />

              {errors.netPrice && (
                <p className="text-sm text-destructive">{errors.netPrice}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="grossPrice">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Cena brutto</Label>

              <Input
                id={field.name}
                name={field.name}
                type="number"
                min="0"
                step="0.01"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const grossPrice = Number(event.target.value);
                  const vat = form.state.values.vat;

                  field.handleChange(grossPrice);

                  const netPrice = Number(
                    (grossPrice / (1 + vat / 100)).toFixed(2)
                  );

                  form.setFieldValue("netPrice", netPrice);
                  onFieldChange();
                }}
              />

              {errors.grossPrice && (
                <p className="text-sm text-destructive">{errors.grossPrice}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="vat">
          {(field) => (
            <div className="grid gap-2">
              <Label>Stawka VAT</Label>

              <Select
                value={String(field.state.value)}
                onValueChange={(value) => {
                  if (value === null) {
                    return;
                  }

                  const vat = Number(value);
                  const netPrice = form.state.values.netPrice;

                  field.handleChange(vat);

                  const grossPrice = Number(
                    (netPrice * (1 + vat / 100)).toFixed(2)
                  );

                  form.setFieldValue("grossPrice", grossPrice);
                  onFieldChange();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz VAT" />
                </SelectTrigger>

                <SelectContent>
                  {vatRates.map((rate) => (
                    <SelectItem key={rate} value={String(rate)}>
                      {rate}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.vat && (
                <p className="text-sm text-destructive">{errors.vat}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="currency">
          {(field) => (
            <div className="grid gap-2">
              <Label>Waluta</Label>

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
                  <SelectValue placeholder="Wybierz walutę" />
                </SelectTrigger>

                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.currency && (
                <p className="text-sm text-destructive">{errors.currency}</p>
              )}
            </div>
          )}
        </form.Field>
      </div>
    );
  },
});
