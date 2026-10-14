import type { Category } from "./types";

export const volume: Category = {
  id: "volume",
  label: "Объём",
  baseUnit: "l",
  units: [
    { id: "ml",  label: "Миллилитр", symbol: "мл",  toBase: 0.001 },
    { id: "l",   label: "Литр",      symbol: "л",   toBase: 1 },
    { id: "m3",  label: "Кубометр",  symbol: "м³",  toBase: 1000 },
    { id: "gal", label: "Галлон (US)", symbol: "гал", toBase: 3.78541 },
    { id: "pt",  label: "Пинта (US)",  symbol: "пт",  toBase: 0.473176 },
    { id: "cup", label: "Чашка (US)",  symbol: "чашка", toBase: 0.236588 },
  ],
};