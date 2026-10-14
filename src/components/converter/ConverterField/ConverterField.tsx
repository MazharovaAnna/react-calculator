import type { AnyCategory } from "@/lib/units";
import { UnitSelect } from "@/components/converter/UnitSelect";
import styles from "./ConverterField.module.scss";

type Props = {
  category: AnyCategory;
  unitId: string;
  value: string;
  symbol: string;
  readonly?: boolean;
  onUnitChange: (id: string) => void;
  onChange?: (value: string) => void;
};

export function ConverterField({
  category,
  unitId,
  value,
  symbol,
  readonly = false,
  onUnitChange,
  onChange,
}: Props) {
  return (
    <div className={styles.field}>
      <div className={styles.top}>
        <UnitSelect
          category={category}
          value={unitId}
          onChange={onUnitChange}
        />
      </div>
      <div className={styles.bottom}>
        {readonly ? (
          <div className={styles.value}>{value}</div>
        ) : (
          <input
            className={styles.input}
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
        )}
        <span className={styles.symbol}>{symbol}</span>
      </div>
    </div>
  );
}