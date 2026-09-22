const roundPrice = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export const calculateGrossPrice = (netPrice: number, vat: number) => {
  return roundPrice(netPrice * (1 + vat / 100));
};

export const calculateNetPrice = (grossPrice: number, vat: number) => {
  return roundPrice(grossPrice / (1 + vat / 100));
};
