import { useCallback, useMemo, useState } from "react";
import { CATEGORIES, getCategory, convert} from "@/lib/units";

export function useConverter() {
  const [categoryId, setCategoryIdState] = useState<string>(CATEGORIES[0].id);
  const [fromUnitId, setFromUnitId] = useState<string>("");
  const [toUnitId, setToUnitId] = useState<string>("");
  const [input, setInput] = useState<string>("0");

  // Находим текущую категорию
  const category = useMemo(() => {
    return getCategory(categoryId) ?? CATEGORIES[0];
  }, [categoryId]);

  // Дефолтные единицы для категории
  const defaultFromUnit = category.units[0]?.id ?? "";
  const defaultToUnit = category.units[1]?.id ?? category.units[0]?.id ?? "";

  // Синхронизация: если единица пустая — берём дефолт
  const actualFromUnit = fromUnitId || defaultFromUnit;
  const actualToUnit = toUnitId || defaultToUnit;

  // Значение для конвертации
  const numericValue = useMemo(() => {
    const n = parseFloat(input);
    return Number.isFinite(n) ? n : 0;
  }, [input]);

  // Результат конвертации
  const converted = useMemo(() => {
    return convert(numericValue, actualFromUnit, actualToUnit, category);
  }, [numericValue, actualFromUnit, actualToUnit, category]);

  // ===== Смена категории =====
  const setCategory = useCallback((id: string) => {
    setCategoryIdState(id);
    setFromUnitId("");  // сброс → возьмётся дефолт
    setToUnitId("");
    setInput("0");
  }, []);

  // ===== Ввод цифр =====
  const appendDigit = useCallback((digit: string) => {
    setInput((prev) => {
      if (prev === "0") return digit;
      if (prev === "-0") return "-" + digit;
      // Ограничение: не больше 15 цифр
      if (prev.replace(/[^0-9]/g, "").length >= 15) return prev;
      return prev + digit;
    });
  }, []);

  // ===== Десятичная запятая =====
  const appendDecimal = useCallback(() => {
    setInput((prev) => {
      if (prev.includes(".")) return prev;
      if (prev === "0") return "0.";
      if (prev === "-0") return "-0.";
      return prev + ".";
    });
  }, []);

  // ===== Backspace =====
  const backspace = useCallback(() => {
    setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  }, []);

  // ===== Clear =====
  const clear = useCallback(() => {
    setInput("0");
  }, []);

  // ===== Смена знака =====
  const toggleSign = useCallback(() => {
    setInput((prev) => {
      if (prev === "0") return prev;
      if (prev.startsWith("-")) return prev.slice(1);
      return "-" + prev;
    });
  }, []);

  // ===== Swap (↑/↓) =====
  const swap = useCallback(() => {
    setFromUnitId(actualToUnit);
    setToUnitId(actualFromUnit);
  }, [actualFromUnit, actualToUnit]);

  // ===== Смена единиц =====
  const setFromUnit = useCallback((id: string) => {
    setFromUnitId(id);
  }, []);

  const setToUnit = useCallback((id: string) => {
    setToUnitId(id);
  }, []);

  // ===== Сброс при смене единиц, если ввод "0" =====
  // (опционально: можно сохранять значение — оставляем как есть)

  return {
    // Состояние
    category,
    categoryId,
    fromUnitId: actualFromUnit,
    toUnitId: actualToUnit,
    input,
    converted,

    // Категории
    categories: CATEGORIES,

    // Действия
    setCategory,
    setFromUnit,
    setToUnit,

    appendDigit,
    appendDecimal,
    backspace,
    clear,
    toggleSign,
    swap,
  };
}