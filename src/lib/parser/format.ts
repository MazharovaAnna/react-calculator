export function formatResult(num: number): string {
  if (!Number.isFinite(num)) return "Ошибка";
  return String(parseFloat(num.toPrecision(12)));
}