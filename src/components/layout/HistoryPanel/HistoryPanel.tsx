import { useCalculatorContext } from "@/context";
import styles from "./HistoryPanel.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function HistoryPanel({ open, onClose }: Props) {
  const { history, clearHistory, useHistoryItem } = useCalculatorContext();

  if (!open) return null;

  const handlePick = (result: string) => {
    useHistoryItem(result);
    onClose();
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>История</span>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
               stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      {history.length === 0 ? (
        <div className={styles.empty}>Пока пусто</div>
      ) : (
        <ul className={styles.list}>
          {history.map((item, i) => (
            <li
              key={i}
              className={styles.item}
              onClick={() => handlePick(item.result)}
            >
              <span className={styles.expr}>{item.expr}</span>
              <span className={styles.result}>= {item.result}</span>
            </li>
          ))}
        </ul>
      )}

      <button className={styles.clearBtn} onClick={clearHistory}>
        Очистить историю
      </button>
    </div>
  );
}