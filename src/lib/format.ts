export function formatResult(num: number): string {
  if (!Number.isFinite(num)) return "Ошибка";
  return String(parseFloat(num.toPrecision(12)));
}

/**
 * Форматирование результата для конвертера.
 * Округляет до 6 значащих знаков после запятой, убирает хвостовые нули.
 * Например: 2.54 → "2.54", 0.84666666 → "0.846667", 100 → "100"
 */
export function formatConverterValue(num: number): string {
  if (!Number.isFinite(num)) return "—";

  // Округляем до 6 знаков после запятой
  const rounded = Math.round(num * 1_000_000) / 1_000_000;

  // Превращаем в строку и убираем хвостовые нули
  let str = rounded.toString();

  // Если число в экспоненциальной форме (для очень больших/маленьких) — оставляем
  if (str.includes("e")) return str;

  // Если есть точка — убираем хвостовые нули
  if (str.includes(".")) {
    str = str.replace(/\.?0+$/, "");
  }

  return str;
}