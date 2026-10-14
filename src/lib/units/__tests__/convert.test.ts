import { describe, it, expect } from "vitest";
import { convert } from "../convert";
import { length } from "../length";
import { mass } from "../mass";
import { temperature } from "../temperature";

describe("convert — линейные (длина)", () => {
  it("м в см", () => {
    expect(convert(1, "m", "cm", length)).toBeCloseTo(100);
  });

  it("см в м", () => {
    expect(convert(100, "cm", "m", length)).toBeCloseTo(1);
  });

  it("км в м", () => {
    expect(convert(5, "km", "m", length)).toBeCloseTo(5000);
  });

  it("м в км", () => {
    expect(convert(5000, "m", "km", length)).toBeCloseTo(5);
  });

  it("дюйм в см", () => {
    // 1 дюйм = 2.54 см
    expect(convert(1, "in", "cm", length)).toBeCloseTo(2.54);
  });

  it("фут в дюйм", () => {
    // 1 фут = 12 дюймов
    expect(convert(1, "ft", "in", length)).toBeCloseTo(12);
  });

  it("миля в км", () => {
    // 1 миля ≈ 1.609 км
    expect(convert(1, "mi", "km", length)).toBeCloseTo(1.609344);
  });

  it("та же единица → то же значение", () => {
    expect(convert(42, "m", "m", length)).toBe(42);
  });
});

describe("convert — линейные (масса)", () => {
  it("кг в г", () => {
    expect(convert(1, "kg", "g", mass)).toBeCloseTo(1000);
  });

  it("г в мг", () => {
    expect(convert(1, "g", "mg", mass)).toBeCloseTo(1000);
  });

  it("фунт в кг", () => {
    // 1 lb ≈ 0.4536 kg
    expect(convert(1, "lb", "kg", mass)).toBeCloseTo(0.453592);
  });
});

describe("convert — температура", () => {
  it("0°C = 32°F", () => {
    expect(convert(0, "c", "f", temperature)).toBeCloseTo(32);
  });

  it("100°C = 212°F", () => {
    expect(convert(100, "c", "f", temperature)).toBeCloseTo(212);
  });

  it("32°F = 0°C", () => {
    expect(convert(32, "f", "c", temperature)).toBeCloseTo(0);
  });

  it("212°F = 100°C", () => {
    expect(convert(212, "f", "c", temperature)).toBeCloseTo(100);
  });

  it("0°C = 273.15 K", () => {
    expect(convert(0, "c", "k", temperature)).toBeCloseTo(273.15);
  });

  it("0 K = -273.15°C", () => {
    expect(convert(0, "k", "c", temperature)).toBeCloseTo(-273.15);
  });

  it("100°F = 310.928 K", () => {
    // 100°F → °C: (100-32) × 5/9 ≈ 37.7778°C
    // 37.7778°C → K: 37.7778 + 273.15 ≈ 310.928 K
    expect(convert(100, "f", "k", temperature)).toBeCloseTo(310.928, 2);
  });

  it("та же единица → то же значение", () => {
    expect(convert(25, "c", "c", temperature)).toBe(25);
    expect(convert(25, "f", "f", temperature)).toBe(25);
  });
});

describe("convert — ошибки", () => {
  it("несуществующая единица → null", () => {
    expect(convert(1, "m", "xyz", length)).toBeNull();
    expect(convert(1, "xyz", "m", length)).toBeNull();
  });

  it("NaN → null", () => {
    expect(convert(NaN, "m", "cm", length)).toBeNull();
  });

  it("Infinity → null", () => {
    expect(convert(Infinity, "m", "cm", length)).toBeNull();
  });
});