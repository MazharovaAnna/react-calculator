import type { AnyCategory } from "@/lib/units";
import styles from "./UnitSelect.module.scss";

type Props = {
  category: AnyCategory;
  value: string;
  onChange: (id: string) => void;
};

export function UnitSelect({ category, value, onChange }: Props) {
  return (
    <div className={styles.selectWrap}>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {category.units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.label}
          </option>
        ))}
      </select>
      <span className={styles.arrow}>
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none"
             stroke="currentColor" strokeWidth="2.5"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}