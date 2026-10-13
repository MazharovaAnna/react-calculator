import type { AngleMode } from "./types";

// ===== Тригонометрия =====

function toRadians(x: number, mode: AngleMode): number {
  return mode === "deg" ? (x * Math.PI) / 180 : x;
}

function fromRadians(x: number, mode: AngleMode): number {
  return mode === "deg" ? (x * 180) / Math.PI : x;
}

// ===== Факториал =====

function factorial(n: number): number | null {
  if (n < 0 || !Number.isInteger(n)) return null;
  if (n > 170) return Infinity; // 171! переполняет Number
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

// ===== Реестр функций =====

type FnImpl = (args: number[], mode: AngleMode) => number | null;

export const FUNCTIONS: Record<string, FnImpl> = {
  // Тригонометрия
  sin: ([x], m) => Math.sin(toRadians(x, m)),
  cos: ([x], m) => Math.cos(toRadians(x, m)),
  tan: ([x], m) => Math.tan(toRadians(x, m)),
  asin: ([x], m) => (x < -1 || x > 1 ? null : fromRadians(Math.asin(x), m)),
  acos: ([x], m) => (x < -1 || x > 1 ? null : fromRadians(Math.acos(x), m)),
  atan: ([x], m) => fromRadians(Math.atan(x), m),

  // Гиперболические
  sinh: ([x]) => Math.sinh(x),
  cosh: ([x]) => Math.cosh(x),
  tanh: ([x]) => Math.tanh(x),
  asinh: ([x]) => Math.asinh(x),
  acosh: ([x]) => (x < 1 ? null : Math.acosh(x)),
  atanh: ([x]) => (x <= -1 || x >= 1 ? null : Math.atanh(x)),

  // Логарифмы
  ln: ([x]) => (x <= 0 ? null : Math.log(x)),
  log: ([x]) => (x <= 0 ? null : Math.log10(x)),
  log2: ([x]) => (x <= 0 ? null : Math.log2(x)),

  // Корни и степени
  sqrt: ([x]) => (x < 0 ? null : Math.sqrt(x)),
  cbrt: ([x]) => Math.cbrt(x),
  abs: ([x]) => Math.abs(x),
  exp: ([x]) => Math.exp(x),

  // Специальные
  fact: ([x]) => factorial(x),
  inv: ([x]) => (x === 0 ? null : 1 / x),

  // Округления (опционально)
  floor: ([x]) => Math.floor(x),
  ceil: ([x]) => Math.ceil(x),
  round: ([x]) => Math.round(x),
};

// ===== Константы =====

export const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
  tau: Math.PI * 2,
};