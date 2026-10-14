import { length } from "./length";
import { mass } from "./mass";
import { area } from "./area";
import { volume } from "./volume";
import { time } from "./time";
import { speed } from "./speed";
import { temperature } from "./temperature";
import type { AnyCategory } from "./types";

export const CATEGORIES: AnyCategory[] = [
  length,
  mass,
  area,
  volume,
  time,
  speed,
  temperature,
];

export function getCategory(id: string): AnyCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

// Экспорт типов и утилит
export type { AnyCategory, Category, NonLinearCategory, Unit } from "./types";
export { isLinear } from "./types";
export { convert } from "./convert";   // ← ЭТОЙ СТРОКИ НЕ ХВАТАЛО