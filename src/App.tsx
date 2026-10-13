import { useCalculator } from "@/hooks/useCalculator";
import { useTheme } from "@/hooks/useTheme";
import { Keypad } from "@/components/calculator/Keypad";
import type { KeyDef } from "@/types";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const calc = useCalculator();

  // Собираем раскладку с реальными обработчиками
  const keys: KeyDef[] = [
    { id: "clear", label: "C", variant: "danger", tooltip: "Очистить", onPress: calc.clear },
    { id: "backspace", label: "⌫", variant: "danger", tooltip: "стереть", onPress: calc.backspace },
    { id: "percent", label: "%", variant: "number", tooltip: "процент", onPress: calc.percent },
    { id: "divide", label: "÷", variant: "operator", tooltip: "деление", onPress: () => calc.appendOperator("/") },

    { id: "7", label: "7", variant: "number", hotkey: "7", onPress: () => calc.appendNumber("7") },
    { id: "8", label: "8", variant: "number", hotkey: "8", onPress: () => calc.appendNumber("8") },
    { id: "9", label: "9", variant: "number", hotkey: "9", onPress: () => calc.appendNumber("9") },
    { id: "multiply", label: "×", variant: "operator", tooltip: "умножение", onPress: () => calc.appendOperator("*") },

    { id: "4", label: "4", variant: "number", hotkey: "4", onPress: () => calc.appendNumber("4") },
    { id: "5", label: "5", variant: "number", hotkey: "5", onPress: () => calc.appendNumber("5") },
    { id: "6", label: "6", variant: "number", hotkey: "6", onPress: () => calc.appendNumber("6") },
    { id: "subtract", label: "−", variant: "operator", tooltip: "вычитание", onPress: () => calc.appendOperator("-") },

    { id: "1", label: "1", variant: "number", hotkey: "1", onPress: () => calc.appendNumber("1") },
    { id: "2", label: "2", variant: "number", hotkey: "2", onPress: () => calc.appendNumber("2") },
    { id: "3", label: "3", variant: "number", hotkey: "3", onPress: () => calc.appendNumber("3") },
    { id: "add", label: "+", variant: "operator", tooltip: "сложение", onPress: () => calc.appendOperator("+") },

    { id: "paren", label: "( )", variant: "number", tooltip: "скобки", onPress: calc.appendParen },
    { id: "0", label: "0", variant: "number", hotkey: "0", onPress: () => calc.appendNumber("0") },
    { id: "decimal", label: ",", variant: "number", tooltip: "запятая", onPress: calc.appendDecimal },
    { id: "equals", label: "=", variant: "equals", tooltip: "результат", hotkey: "Enter", onPress: calc.calculate },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: "var(--bg)",
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          alignSelf: "flex-start",
          padding: "8px 16px",
          background: "var(--bg-btn)",
          color: "var(--text)",
          borderRadius: 8,
        }}
      >
        Тема: {theme}
      </button>

      <div style={{ maxWidth: 400, margin: "auto", width: "100%" }}>
        {/* Экран */}
        <div
          style={{
            textAlign: "right",
            padding: "20px 12px",
            fontSize: 48,
            fontWeight: 300,
            color: "var(--text)",
            wordBreak: "break-all",
          }}
        >
          {calc.expression}
        </div>
        <div
          style={{
            textAlign: "right",
            padding: "0 12px",
            fontSize: 22,
            color: "var(--text-muted)",
            minHeight: 30,
          }}
        >
          {calc.preview}
        </div>

        {/* Клавиатура */}
        <div style={{ marginTop: 20 }}>
          <Keypad keys={keys} />
        </div>
      </div>
    </div>
  );
}