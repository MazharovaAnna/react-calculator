import { useCalculatorContext } from "@/context";
import { Keypad } from "@/components/calculator/Keypad";
import { simpleKeys } from "@/constants/keypads";
import styles from "./CalculatorPage.module.scss";

export function CalculatorPage() {
  const calc = useCalculatorContext();
  const keys = simpleKeys(calc);

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