import { useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "@/context";
import styles from "./TopBar.module.scss";

type Props = {
  onOpenHistory: () => void;
};

export function TopBar({ onOpenHistory }: Props) {
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isScientific = location.pathname === "/scientific";
  const isConverter = location.pathname === "/converter";

  return (
    <header className={styles.topbar}>
      <button
        className={styles.iconBtn}
        onClick={onOpenHistory}
        aria-label="История"
        type="button"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
             stroke="currentColor" strokeWidth="1.8"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v4h4" />
          <path d="M12 8v4l3 2" />
        </svg>
      </button>

      <div className={styles.right}>
        {/* Тема */}
        <button
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label="Переключить тему"
          type="button"
        >
          {theme === "light" ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
                 stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
                 stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          )}
        </button>

        {/* Simple ↔ Scientific */}
        {!isConverter && (
          <button
            className={styles.iconBtn}
            onClick={() => navigate(isScientific ? "/" : "/scientific")}
            aria-label={isScientific ? "Обычный режим" : "Научный режим"}
            type="button"
          >
            {isScientific ? (
              // Иконка обычного калькулятора
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
                   stroke="currentColor" strokeWidth="1.8"
                   strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="3" />
                <path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0" />
              </svg>
            ) : (
              // Иконка научного — с символом √
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
                   stroke="currentColor" strokeWidth="1.8"
                   strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="3" />
                <path d="M8 15l2-4 2 6 3-8" />
              </svg>
            )}
          </button>
        )}

        {/* Переключение конвертера */}
        <button
          className={styles.iconBtn}
          onClick={() => navigate(isConverter ? "/" : "/converter")}
          aria-label={isConverter ? "Выйти из конвертера" : "Конвертер"}
          type="button"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
               stroke="currentColor" strokeWidth="1.8"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 15 15 3l6 6L9 21z" />
            <path d="m7 11 2 2M10 8l2 2M13 5l2 2" />
          </svg>
        </button>
      </div>
    </header>
  );
}