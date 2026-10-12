import { useState } from "react";
import type { Mode } from "@/types";

export default function App() {
  const [mode, setMode] = useState<Mode>("simple");

  return (
    <div>
      <p>Калькулятор скоро здесь</p>
      <p>Режим: {mode}</p>
      <button onClick={() => setMode("scientific")}>В научный</button>
    </div>
  );
}