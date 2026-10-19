import { useState } from "react";
import { useCalculatorContext } from "@/context";
import { Button } from "@/components/ui/Button";
import { simpleKeys, scientificMainKeys, scientificAltKeys } from "@/constants/keypads";
import styles from "./CalculatorPage.module.scss";

type Props = {
  mode?: "simple" | "scientific";
};

export function CalculatorPage({ mode = "simple" }: Props) {
  const calc = useCalculatorContext();
  const [alt, setAlt] = useState(false);

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
      {/* ДИСПЛЕЙ */}
      <div className={styles.display}>
        <div className={styles.expression}>{calc.expression}</div>
        <div className={styles.preview}>{calc.preview}</div>
      </div>

      {/* КЛАВИАТУРА */}
      <div className={styles.keypadWrap}>
        <div className={`${styles.keypad} ${mode === "scientific" ? styles["keypad--scientific"] : ""}`}>
          {keys.map((key) => (
            <Button
              key={key.id}
              variant={key.variant}
              active={key.active}
              disabled={key.disabled}
              tooltip={key.tooltip}
              hotkey={key.hotkey}
              onPress={key.onPress}
            >
              {key.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}