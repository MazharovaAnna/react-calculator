// Единица измерения
export type Unit = {
  id: string;              // "m", "cm", "km"
  label: string;           // "Метр", "Сантиметр"
  symbol: string;          // "m", "cm", "км" — то, что показывается рядом с числом
  toBase: number;          // коэффициент для перевода в базовую единицу
};

// Категория единиц
export type Category = {
  id: string;              // "length", "mass"
  label: string;           // "Длина", "Масса"
  baseUnit: string;        // id базовой единицы
  units: Unit[];
};

// Для нелинейных конверсий (температура)
export type NonLinearCategory = {
  id: string;
  label: string;
  baseUnit: string;
  units: {
    id: string;
    label: string;
    symbol: string;
    toBase: (value: number) => number;
    fromBase: (value: number) => number;
  }[];
};

export type AnyCategory = Category | NonLinearCategory;

// Проверка: линейная или нет
export function isLinear(cat: AnyCategory): cat is Category {
  return "units" in cat && cat.units.length > 0 && "toBase" in cat.units[0] && typeof cat.units[0].toBase === "number";
}