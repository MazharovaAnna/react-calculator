import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeToggle, setActiveToggle] = useState(false);

  document.body.className = `theme-${theme}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        background: "var(--bg)",
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          style={{
            padding: "8px 16px",
            background: "var(--bg-btn)",
            color: "var(--text)",
            borderRadius: 8,
          }}
        >
          Тема: {theme}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 80px)",
          gap: 12,
        }}
      >
        <Button variant="number" tooltip="цифра 7" hotkey="7" onPress={() => console.log("7")}>
          7
        </Button>
        <Button variant="operator" tooltip="умножение" hotkey="*" onPress={() => console.log("*")}>
          ×
        </Button>
        <Button variant="function" tooltip="синус" onPress={() => console.log("sin")}>
          sin
        </Button>
        <Button variant="danger" tooltip="стереть" hotkey="Backspace" onPress={() => console.log("⌫")}>
          ⌫
        </Button>
        <Button variant="danger" tooltip="Очистить" hotkey="Escape" onPress={() => console.log("C")}>
          C
        </Button>
        <Button variant="equals" tooltip="результат" hotkey="Enter" onPress={() => console.log("=")}>
          =
        </Button>
        <Button variant="accent" tooltip="поменять местами" onPress={() => console.log("↓")}>
          ↓
        </Button>
        <Button
          variant="toggle"
          active={activeToggle}
          tooltip="Другие функции"
          onPress={() => setActiveToggle((v) => !v)}
        >
          ⇄
        </Button>
      </div>
    </div>
  );
}