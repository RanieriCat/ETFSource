export const formatPct = (value: number): string => `${value.toFixed(2)}%`;
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
