import type { Category } from "./types";

export const speed: Category = {
  id: "speed",
  label: "Скорость",
  baseUnit: "mps",
  units: [
    { id: "mps",  label: "Метр в секунду",   symbol: "м/с",   toBase: 1 },
    { id: "kmph", label: "Километр в час",   symbol: "км/ч",  toBase: 0.277778 },
    { id: "mph",  label: "Миля в час",       symbol: "миль/ч", toBase: 0.44704 },
    { id: "knot", label: "Узел",             symbol: "уз",    toBase: 0.514444 },
  ],
};