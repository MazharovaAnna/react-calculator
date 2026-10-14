import { useState } from "react";
import { useCalculatorContext } from "@/context";
import { Keypad } from "@/components/calculator/Keypad";
import {
  simpleKeys,
  scientificMainKeys,
  scientificAltKeys,
} from "@/constants/keypads";
import styles from "./CalculatorPage.module.scss";

type Props = {
  mode?: "simple" | "scientific";
};

export function CalculatorPage({ mode = "simple" }: Props) {
  const calc = useCalculatorContext();
  const [alt, setAlt] = useState(false);

  // Собираем раскладку в зависимости от режима
  const keys =
    mode === "simple"
      ? simpleKeys(calc)
      : alt
      ? scientificAltKeys(calc, {
          angleMode: calc.angleMode,
          onToggleAngleMode: calc.toggleAngleMode,
          onToggleAlt: () => setAlt((v) => !v),
        })
      : scientificMainKeys(calc, {
          angleMode: calc.angleMode,
          onToggleAngleMode: calc.toggleAngleMode,
          onToggleAlt: () => setAlt((v) => !v),
        });

  return (
    <div className={styles.page}>
      <div className={styles.display}>
        <div className={styles.expression}>{calc.expression}</div>
        <div className={styles.preview}>{calc.preview}</div>
      </div>
      <div className={styles.keypadWrap}>
        <Keypad keys={keys} />
      </div>
    </div>
  );
}