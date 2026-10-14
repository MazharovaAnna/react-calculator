import type { Category } from "./types";

export const mass: Category = {
  id: "mass",
  label: "Масса",
  baseUnit: "kg",
  units: [
    { id: "mg", label: "Миллиграмм", symbol: "мг",   toBase: 0.000001 },
    { id: "g",  label: "Грамм",      symbol: "г",    toBase: 0.001 },
    { id: "kg", label: "Килограмм",  symbol: "кг",   toBase: 1 },
    { id: "t",  label: "Тонна",      symbol: "т",    toBase: 1000 },
    { id: "oz", label: "Унция",      symbol: "oz",   toBase: 0.0283495 },
    { id: "lb", label: "Фунт",       symbol: "lb",   toBase: 0.453592 },
  ],
};