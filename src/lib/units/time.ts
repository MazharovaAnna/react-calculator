import type { Category } from "./types";

export const time: Category = {
  id: "time",
  label: "Время",
  baseUnit: "s",
  units: [
    { id: "ms",  label: "Миллисекунда", symbol: "мс",  toBase: 0.001 },
    { id: "s",   label: "Секунда",      symbol: "с",   toBase: 1 },
    { id: "min", label: "Минута",       symbol: "мин", toBase: 60 },
    { id: "h",   label: "Час",          symbol: "ч",   toBase: 3600 },
    { id: "day", label: "День",         symbol: "д",   toBase: 86400 },
    { id: "wk",  label: "Неделя",       symbol: "нед", toBase: 604800 },
  ],
};