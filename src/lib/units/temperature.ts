import type { NonLinearCategory } from "./types";

export const temperature: NonLinearCategory = {
  id: "temperature",
  label: "Температура",
  baseUnit: "c",     // будем хранить всё в Цельсиях как «базовую»
  units: [
    {
      id: "c",
      label: "Цельсий",
      symbol: "°C",
      toBase: (c) => c,
      fromBase: (c) => c,
    },
    {
      id: "f",
      label: "Фаренгейт",
      symbol: "°F",
      // F → C: (F - 32) * 5/9
      toBase: (f) => (f - 32) * (5 / 9),
      // C → F: C * 9/5 + 32
      fromBase: (c) => c * (9 / 5) + 32,
    },
    {
      id: "k",
      label: "Кельвин",
      symbol: "K",
      // K → C: K - 273.15
      toBase: (k) => k - 273.15,
      // C → K: C + 273.15
      fromBase: (c) => c + 273.15,
    },
  ],
};