import type { Category } from "./types";

export const area: Category = {
  id: "area",
  label: "Площадь",
  baseUnit: "m2",
  units: [
    { id: "cm2", label: "Квадратный сантиметр", symbol: "см²",  toBase: 0.0001 },
    { id: "m2",  label: "Квадратный метр",      symbol: "м²",   toBase: 1 },
    { id: "km2", label: "Квадратный километр",  symbol: "км²",  toBase: 1_000_000 },
    { id: "ha",  label: "Гектар",               symbol: "га",   toBase: 10_000 },
    { id: "acre",label: "Акр",                  symbol: "акр",  toBase: 4046.86 },
    { id: "ft2", label: "Квадратный фут",       symbol: "фут²", toBase: 0.092903 },
  ],
};