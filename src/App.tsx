import { useState } from "react";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // Применяем класс к body вручную (потом сделаем через хук)
  document.body.className = `theme-${theme}`;

  return (
    <div style={{ padding: 40 }}>
      <p>Тема: {theme}</p>
      <button
        onClick={toggle}
        style={{
          padding: "10px 20px",
          background: "var(--bg-btn)",
          color: "var(--text)",
          borderRadius: 8,
        }}
      >
        Переключить тему
      </button>
    </div>
  );
}