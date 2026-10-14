import { describe, it, expect } from "vitest";
import { evaluate } from "../index";

describe("evaluate — базовые операции", () => {
  it("складывает", () => {
    expect(evaluate("2+3")).toBe(5);
    expect(evaluate("10 + 0.5")).toBe(10.5);
  });

  it("вычитает", () => {
    expect(evaluate("10-3")).toBe(7);
    expect(evaluate("3-10")).toBe(-7);
  });

  it("умножает", () => {
    expect(evaluate("4×5")).toBe(20);
    expect(evaluate("2*3*4")).toBe(24);
  });

  it("делит", () => {
    expect(evaluate("10÷2")).toBe(5);
    expect(evaluate("1/4")).toBe(0.25);
  });

  it("деление на ноль → null", () => {
    expect(evaluate("1/0")).toBeNull();
  });
});

describe("evaluate — приоритет", () => {
  it("умножение выше сложения", () => {
    expect(evaluate("2+3×4")).toBe(14);
  });

  it("скобки меняют приоритет", () => {
    expect(evaluate("(2+3)×4")).toBe(20);
  });

  it("вложенные скобки", () => {
    expect(evaluate("((2+3)×(4-1))")).toBe(15);
  });

  it("унарный минус", () => {
    expect(evaluate("-5+3")).toBe(-2);
    expect(evaluate("-(2+3)")).toBe(-5);
  });

  it("степень право-ассоциативна", () => {
    expect(evaluate("2^3^2")).toBe(512); // 2^(3^2) = 2^9
  });
});

describe("evaluate — функции", () => {
  it("sin в градусах", () => {
    expect(evaluate("sin(30)", "deg")).toBeCloseTo(0.5);
  });

  it("sin в радианах", () => {
    expect(evaluate("sin(0)", "rad")).toBe(0);
    expect(evaluate("sin(pi/2)", "rad")).toBeCloseTo(1);
  });

  it("log и ln", () => {
    expect(evaluate("log(100)")).toBeCloseTo(2);
    expect(evaluate("ln(e)")).toBeCloseTo(1);
  });

  it("sqrt", () => {
    expect(evaluate("sqrt(9)")).toBe(3);
    expect(evaluate("sqrt(2)")).toBeCloseTo(1.41421356);
  });

  it("sqrt отрицательного → null", () => {
    expect(evaluate("sqrt(-1)")).toBeNull();
  });

  it("факториал", () => {
    expect(evaluate("5!")).toBe(120);
    expect(evaluate("0!")).toBe(1);
  });

  it("квадрат", () => {
    expect(evaluate("5²")).toBe(25);
  });

  it("куб", () => {
    expect(evaluate("5³")).toBe(125);
    expect(evaluate("2³")).toBe(8);
    expect(evaluate("(2+3)³")).toBe(125);
  });

  it("abs", () => {
    expect(evaluate("abs(-7)")).toBe(7);
  });
});

describe("evaluate — константы", () => {
  it("pi", () => {
    expect(evaluate("π")).toBeCloseTo(Math.PI);
    expect(evaluate("pi")).toBeCloseTo(Math.PI);
  });

  it("e", () => {
    expect(evaluate("e")).toBeCloseTo(Math.E);
  });
});

describe("evaluate — ошибки", () => {
  it("пустое выражение → null", () => {
    expect(evaluate("")).toBeNull();
    expect(evaluate("   ")).toBeNull();
  });

  it("двойной унарный знак допустим", () => {
    expect(evaluate("2++3")).toBe(5);
    expect(evaluate("--5")).toBe(5);
    expect(evaluate("-(-5)")).toBe(5);
  });

  it("синтаксические ошибки → null", () => {
    expect(evaluate("2+")).toBeNull();
    expect(evaluate("(2+3")).toBeNull();
    expect(evaluate("2 3")).toBeNull();
  });

  it("неизвестная функция → null", () => {
    expect(evaluate("foo(2)")).toBeNull();
  });
});
