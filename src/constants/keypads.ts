import type { KeyDef } from "@/types";

// Временные обработчики — потом заменим на вызовы useCalculator
const noop = () => {};

export const simpleKeys: KeyDef[] = [
  // Ряд 1 — служебные
  { id: "clear", label: "C", variant: "danger", tooltip: "Очистить", onPress: noop },
  { id: "backspace", label: "⌫", variant: "danger", tooltip: "стереть", onPress: noop },
  { id: "percent", label: "%", variant: "number", tooltip: "процент", onPress: noop },
  { id: "divide", label: "÷", variant: "operator", tooltip: "деление", onPress: noop },

  // Ряд 2
  { id: "7", label: "7", variant: "number", hotkey: "7", onPress: noop },
  { id: "8", label: "8", variant: "number", hotkey: "8", onPress: noop },
  { id: "9", label: "9", variant: "number", hotkey: "9", onPress: noop },
  { id: "multiply", label: "×", variant: "operator", tooltip: "умножение", onPress: noop },

  // Ряд 3
  { id: "4", label: "4", variant: "number", hotkey: "4", onPress: noop },
  { id: "5", label: "5", variant: "number", hotkey: "5", onPress: noop },
  { id: "6", label: "6", variant: "number", hotkey: "6", onPress: noop },
  { id: "subtract", label: "−", variant: "operator", tooltip: "вычитание", onPress: noop },

  // Ряд 4
  { id: "1", label: "1", variant: "number", hotkey: "1", onPress: noop },
  { id: "2", label: "2", variant: "number", hotkey: "2", onPress: noop },
  { id: "3", label: "3", variant: "number", hotkey: "3", onPress: noop },
  { id: "add", label: "+", variant: "operator", tooltip: "сложение", onPress: noop },

  // Ряд 5
  { id: "paren", label: "( )", variant: "number", tooltip: "скобки", onPress: noop },
  { id: "0", label: "0", variant: "number", hotkey: "0", onPress: noop },
  { id: "decimal", label: ",", variant: "number", tooltip: "запятая", onPress: noop },
  { id: "equals", label: "=", variant: "equals", tooltip: "результат", hotkey: "Enter", onPress: noop },
];