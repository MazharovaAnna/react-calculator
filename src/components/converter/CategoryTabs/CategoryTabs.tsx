import type { AnyCategory } from "@/lib/units";
import styles from "./CategoryTabs.module.scss";

type Props = {
  categories: AnyCategory[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function CategoryTabs({ categories, activeId, onSelect }: Props) {
  return (
    <div className={styles.tabs}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`${styles.tab} ${cat.id === activeId ? styles.active : ""}`}
          onClick={() => onSelect(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}