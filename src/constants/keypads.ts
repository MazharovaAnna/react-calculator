import type { KeyDef } from "@/types";
import type { useCalculator } from "@/hooks/useCalculator";

type Calc = ReturnType<typeof useCalculator>;

// ============================================================
//  ПРОСТОЙ РЕЖИМ (5 рядов)
// ============================================================
export function simpleKeys(c: Calc): KeyDef[] {
  return [
    { id: "clear", label: "C", variant: "danger", tooltip: "Очистить", hotkey: "Escape", onPress: c.clear },
    { id: "backspace", label: "⌫", variant: "danger", tooltip: "стереть", hotkey: "Backspace", onPress: c.backspace },
    { id: "percent", label: "%", variant: "number", tooltip: "процент", hotkey: "%", onPress: c.percent },
    { id: "divide", label: "÷", variant: "operator", tooltip: "деление", hotkey: "/", onPress: () => c.appendOperator("/") },

    { id: "7", label: "7", variant: "number", hotkey: "7", onPress: () => c.appendNumber("7") },
    { id: "8", label: "8", variant: "number", hotkey: "8", onPress: () => c.appendNumber("8") },
    { id: "9", label: "9", variant: "number", hotkey: "9", onPress: () => c.appendNumber("9") },
    { id: "multiply", label: "×", variant: "operator", tooltip: "умножение", hotkey: "*", onPress: () => c.appendOperator("*") },

    { id: "4", label: "4", variant: "number", hotkey: "4", onPress: () => c.appendNumber("4") },
    { id: "5", label: "5", variant: "number", hotkey: "5", onPress: () => c.appendNumber("5") },
    { id: "6", label: "6", variant: "number", hotkey: "6", onPress: () => c.appendNumber("6") },
    { id: "subtract", label: "−", variant: "operator", tooltip: "вычитание", hotkey: "-", onPress: () => c.appendOperator("-") },

    { id: "1", label: "1", variant: "number", hotkey: "1", onPress: () => c.appendNumber("1") },
    { id: "2", label: "2", variant: "number", hotkey: "2", onPress: () => c.appendNumber("2") },
    { id: "3", label: "3", variant: "number", hotkey: "3", onPress: () => c.appendNumber("3") },
    { id: "add", label: "+", variant: "operator", tooltip: "сложение", hotkey: "+", onPress: () => c.appendOperator("+") },

    { id: "paren", label: "( )", variant: "number", tooltip: "скобки", hotkey: "(", onPress: c.appendParen },
    { id: "0", label: "0", variant: "number", hotkey: "0", onPress: () => c.appendNumber("0") },
    { id: "decimal", label: ",", variant: "number", tooltip: "запятая", hotkey: ".", onPress: c.appendDecimal },
    { id: "equals", label: "=", variant: "equals", tooltip: "результат", hotkey: "Enter", onPress: c.calculate },
  ];
}

// ============================================================
//  НАУЧНЫЙ РЕЖИМ — вспомогательные ряды (с 5 по 9)
// ============================================================
const baseSciBottomRows = (c: Calc): KeyDef[] => [
  // Ряд 5: C, ⌫, %, ÷
  { id: "clear", label: "C", variant: "danger", tooltip: "Очистить", hotkey: "Escape", onPress: c.clear },
  { id: "backspace", label: "⌫", variant: "danger", tooltip: "стереть", hotkey: "Backspace", onPress: c.backspace },
  { id: "percent", label: "%", variant: "number", tooltip: "процент", hotkey: "%", onPress: c.percent },
  { id: "divide", label: "÷", variant: "operator", tooltip: "деление", hotkey: "/", onPress: () => c.appendOperator("/") },

  // Ряд 6
  { id: "7", label: "7", variant: "number", hotkey: "7", onPress: () => c.appendNumber("7") },
  { id: "8", label: "8", variant: "number", hotkey: "8", onPress: () => c.appendNumber("8") },
  { id: "9", label: "9", variant: "number", hotkey: "9", onPress: () => c.appendNumber("9") },
  { id: "multiply", label: "×", variant: "operator", tooltip: "умножение", hotkey: "*", onPress: () => c.appendOperator("*") },

  // Ряд 7
  { id: "4", label: "4", variant: "number", hotkey: "4", onPress: () => c.appendNumber("4") },
  { id: "5", label: "5", variant: "number", hotkey: "5", onPress: () => c.appendNumber("5") },
  { id: "6", label: "6", variant: "number", hotkey: "6", onPress: () => c.appendNumber("6") },
  { id: "subtract", label: "−", variant: "operator", tooltip: "вычитание", hotkey: "-", onPress: () => c.appendOperator("-") },

  // Ряд 8
  { id: "1", label: "1", variant: "number", hotkey: "1", onPress: () => c.appendNumber("1") },
  { id: "2", label: "2", variant: "number", hotkey: "2", onPress: () => c.appendNumber("2") },
  { id: "3", label: "3", variant: "number", hotkey: "3", onPress: () => c.appendNumber("3") },
  { id: "add", label: "+", variant: "operator", tooltip: "сложение", hotkey: "+", onPress: () => c.appendOperator("+") },

  // Ряд 9
  { id: "paren", label: "( )", variant: "number", tooltip: "скобки", hotkey: "(", onPress: c.appendParen },
  { id: "0", label: "0", variant: "number", hotkey: "0", onPress: () => c.appendNumber("0") },
  { id: "decimal", label: ",", variant: "number", tooltip: "запятая", hotkey: ".", onPress: c.appendDecimal },
  { id: "equals", label: "=", variant: "equals", tooltip: "результат", hotkey: "Enter", onPress: c.calculate },
];

type SciExtras = {
  angleMode: "deg" | "rad";
  onToggleAngleMode: () => void;
  onToggleAlt: () => void;
};

// ============================================================
//  НАУЧНЫЙ РЕЖИМ — основной набор (9 рядов)
// ============================================================
export function scientificMainKeys(c: Calc, extras: SciExtras): KeyDef[] {
  return [
    // Ряд 1
    { id: "alt-toggle", label: "⇄", variant: "toggle", active: false, tooltip: "Другие функции", onPress: extras.onToggleAlt },
    { id: "angle", label: extras.angleMode === "deg" ? "Deg" : "Rad", variant: "toggle", active: false, tooltip: "Режим угла", onPress: extras.onToggleAngleMode },
    { id: "sqrt", label: "√", variant: "function", tooltip: "корень", onPress: () => c.appendFunction("sqrt") },
    { id: "abs", label: "|x|", variant: "function", tooltip: "модуль", onPress: () => c.appendFunction("abs") },

    // Ряд 2
    { id: "sin", label: "sin", variant: "function", tooltip: "синус", onPress: () => c.appendFunction("sin") },
    { id: "cos", label: "cos", variant: "function", tooltip: "косинус", onPress: () => c.appendFunction("cos") },
    { id: "tan", label: "tan", variant: "function", tooltip: "тангенс", onPress: () => c.appendFunction("tan") },
    { id: "pi", label: "π", variant: "function", tooltip: "число пи", onPress: () => c.appendConstant("π") },

    // Ряд 3
    { id: "ln", label: "ln", variant: "function", tooltip: "натуральный логарифм", onPress: () => c.appendFunction("ln") },
    { id: "log", label: "log", variant: "function", tooltip: "десятичный логарифм", onPress: () => c.appendFunction("log") },
    { id: "inv", label: "1/x", variant: "function", tooltip: "обратное число", onPress: () => c.appendFunction("inv") },
    { id: "e", label: "e", variant: "function", tooltip: "число e", onPress: () => c.appendConstant("e") },

    // Ряд 4
    { id: "exp", label: "eˣ", variant: "function", tooltip: "экспонента", onPress: () => c.appendFunction("exp") },
    { id: "sq", label: "x²", variant: "function", tooltip: "квадрат", onPress: () => c.appendPostfix("²") },
    { id: "pow", label: "xʸ", variant: "function", tooltip: "степень", onPress: () => c.appendOperator("^") },
    { id: "sign", label: "+/−", variant: "function", tooltip: "сменить знак", onPress: c.toggleSign },

    // Ряды 5–9 (C, ⌫, %, ÷, цифры, =)
    ...baseSciBottomRows(c),
  ];
}

// ============================================================
//  НАУЧНЫЙ РЕЖИМ — альтернативный набор (гиперболические)
// ============================================================
export function scientificAltKeys(c: Calc, extras: SciExtras): KeyDef[] {
  return [
    // Ряд 1
    { id: "alt-toggle", label: "⇄", variant: "toggle", active: false, tooltip: "Основные функции", onPress: extras.onToggleAlt },
    { id: "angle", label: extras.angleMode === "deg" ? "Deg" : "Rad", variant: "toggle", active: false, tooltip: "Режим угла", onPress: extras.onToggleAngleMode },
    { id: "cbrt", label: "∛", variant: "function", tooltip: "кубический корень", onPress: () => c.appendFunction("cbrt") },
    { id: "pow2", label: "2ˣ", variant: "function", tooltip: "2 в степени", onPress: () => { c.appendNumber("2"); c.appendOperator("^"); } },

    // Ряд 2
    { id: "asin", label: "sin⁻¹", variant: "function", tooltip: "арксинус", onPress: () => c.appendFunction("asin") },
    { id: "acos", label: "cos⁻¹", variant: "function", tooltip: "арккосинус", onPress: () => c.appendFunction("acos") },
    { id: "atan", label: "tan⁻¹", variant: "function", tooltip: "арктангенс", onPress: () => c.appendFunction("atan") },
    { id: "cube", label: "x³", variant: "function", tooltip: "куб", onPress: () => c.appendPostfix("³") },

    // Ряд 3
    { id: "sinh", label: "sinh", variant: "function", tooltip: "гиперб. синус", onPress: () => c.appendFunction("sinh") },
    { id: "cosh", label: "cosh", variant: "function", tooltip: "гиперб. косинус", onPress: () => c.appendFunction("cosh") },
    { id: "tanh", label: "tanh", variant: "function", tooltip: "гиперб. тангенс", onPress: () => c.appendFunction("tanh") },
    { id: "fact", label: "x!", variant: "function", tooltip: "факториал", onPress: () => c.appendPostfix("!") },

    // Ряд 4
    { id: "asinh", label: "sinh⁻¹", variant: "function", tooltip: "обратный гиперб. синус", onPress: () => c.appendFunction("asinh") },
    { id: "acosh", label: "cosh⁻¹", variant: "function", tooltip: "обратный гиперб. косинус", onPress: () => c.appendFunction("acosh") },
    { id: "atanh", label: "tanh⁻¹", variant: "function", tooltip: "обратный гиперб. тангенс", onPress: () => c.appendFunction("atanh") },
    { id: "sign", label: "+/−", variant: "function", tooltip: "сменить знак", onPress: c.toggleSign },

    // Ряды 5–9 (C, ⌫, %, ÷, цифры, =)
    ...baseSciBottomRows(c),
  ];
}