import type { Category } from "./types";

export const length: Category = {
  id: "length",
  label: "Длина",
  baseUnit: "m",
  units: [
    { id: "mm", label: "Миллиметр",  symbol: "мм",   toBase: 0.001 },
    { id: "cm", label: "Сантиметр",  symbol: "см",   toBase: 0.01 },
    { id: "m",  label: "Метр",       symbol: "м",    toBase: 1 },
    { id: "km", label: "Километр",   symbol: "км",   toBase: 1000 },
    { id: "in", label: "Дюйм",       symbol: "дюйм", toBase: 0.0254 },
    { id: "ft", label: "Фут",        symbol: "фут",  toBase: 0.3048 },
    { id: "yd", label: "Ярд",        symbol: "ярд",  toBase: 0.9144 },
    { id: "mi", label: "Миля",       symbol: "миля", toBase: 1609.344 },
  ],
};