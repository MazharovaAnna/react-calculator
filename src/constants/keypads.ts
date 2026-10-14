import type { KeyDef } from "@/types";
import type { useCalculator } from "@/hooks/useCalculator";

type Calc = ReturnType<typeof useCalculator>;

// ===== Простой режим — 5×4 =====
export function simpleKeys(c: Calc): KeyDef[] {
  return [
    { id: "clear",     label: "C",  variant: "danger",   tooltip: "Очистить",  hotkey: "Escape",     onPress: c.clear },
    { id: "backspace", label: "⌫",  variant: "danger",   tooltip: "стереть",   hotkey: "Backspace",  onPress: c.backspace },
    { id: "percent",   label: "%",  variant: "number",   tooltip: "процент",   hotkey: "%",          onPress: c.percent },
    { id: "divide",    label: "÷",  variant: "operator", tooltip: "деление",   hotkey: "/",          onPress: () => c.appendOperator("/") },

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

    { id: "paren",   label: "( )", variant: "number", tooltip: "скобки",   hotkey: "(",  onPress: c.appendParen },
    { id: "0",       label: "0",   variant: "number",                        hotkey: "0",  onPress: () => c.appendNumber("0") },
    { id: "decimal", label: ",",   variant: "number", tooltip: "запятая",  hotkey: ".",  onPress: c.appendDecimal },
    { id: "equals",  label: "=",   variant: "equals", tooltip: "результат", hotkey: "Enter", onPress: c.calculate },
  ];
}