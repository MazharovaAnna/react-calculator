import { useState } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { HistoryPanel } from "@/components/layout/HistoryPanel";
import styles from "./AppLayout.module.scss";

export function AppLayout() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <TopBar onOpenHistory={() => setHistoryOpen(true)} />
      <main className={styles.content}>
        <Outlet />
      </main>
      <HistoryPanel open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  );
}