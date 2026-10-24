import { useState, useMemo } from "react";
import { useCalculatorContext } from "@/context";
import { Keypad } from "@/components/calculator/Keypad";
import { simpleKeys, scientificMainKeys, scientificAltKeys } from "@/constants/keypads";
import styles from "./CalculatorPage.module.scss";

type Props = {
  mode?: "simple" | "scientific";
};

export function CalculatorPage({ mode = "simple" }: Props) {
  const calc = useCalculatorContext();
  const [alt, setAlt] = useState(false);

  
  const keys = useMemo(() => {
    if (mode === "simple") return simpleKeys(calc);
    
    return alt
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
  }, [calc, mode, alt]);

  return (
    <div className={styles.page}>
      <div className={styles.display}>
        <div className={styles.expression}>{calc.expression}</div>
        <div className={styles.preview}>{calc.preview}</div>
      </div>

      <div className={styles.keypadWrap}>
        <Keypad keys={keys} scientific={mode === "scientific"} />
      </div>
    </div>
  );
}