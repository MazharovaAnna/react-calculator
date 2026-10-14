import type { AnyCategory } from "./types";
/**
 * Конвертирует значение из одной единицы в другую.
 *
 * @param value — значение в исходной единице
 * @param fromId — id исходной единицы
 * @param toId — id целевой единицы
 * @param category — категория (нужна, чтобы найти единицы и понять линейная/нет)
 * @returns сконвертированное число, или null при ошибке
 */
export function convert(
  value: number,
  fromId: string,
  toId: string,
  category: AnyCategory,
): number | null {
  if (!Number.isFinite(value)) return null;

  const from = category.units.find((u) => u.id === fromId);
  const to = category.units.find((u) => u.id === toId);
  if (!from || !to) return null;

  // Проверяем, линейная ли единица.
  // У линейных toBase — число, у нелинейных — функция.
  if (typeof from.toBase === "number" && typeof to.toBase === "number") {
    // Линейные: value × from.toBase / to.toBase
    // Например: 5 km → m: 5 × 1000 / 1 = 5000
    const valueInBase = value * from.toBase;
    return valueInBase / to.toBase;
  }

  // Нелинейные: toBase и fromBase — функции
  // Сначала в базовую, потом из базовой в целевую.
  const fromNonLinear = from as Extract<AnyCategory["units"][number], { toBase: (v: number) => number }>;
  const toNonLinear = to as Extract<AnyCategory["units"][number], { toBase: (v: number) => number }>;

  const valueInBase = fromNonLinear.toBase(value);
  return toNonLinear.fromBase(valueInBase);
}