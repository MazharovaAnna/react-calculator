import { useState } from "react";
import { Keypad } from "@/components/calculator/Keypad";
import { simpleKeys } from "@/constants/keypads";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  document.body.className = `theme-${theme}`;

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
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
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
        <Keypad keys={simpleKeys} />
      </div>
    </div>
  );
}