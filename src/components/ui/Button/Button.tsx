import { useEffect, useRef, useState } from "react";
import type { ButtonVariant } from "@/types";
import styles from "./Button.module.scss";
import { Tooltip, type TooltipPlacement } from "./Tooltip";


type Props = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  active?: boolean;
  tooltip?: string;
  hotkey?: string;
  disabled?: boolean;
  onPress?: () => void;
};

const PRESS_DURATION = 200;
const TOOLTIP_DELAY = 150;

export function Button({
  children,
  variant = "number",
  active = false,
  tooltip,
  hotkey,
  disabled = false,
  onPress,
}: Props) {
  const [pressed, setPressed] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [placement, setPlacement] = useState<TooltipPlacement>("bottom-left");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const releaseTimerRef = useRef<number | null>(null);
  const tooltipTimerRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (releaseTimerRef.current !== null) {
      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }
    if (tooltipTimerRef.current !== null) {
      window.clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
  };

  const computePlacement = (): TooltipPlacement => {
    const el = buttonRef.current;
    if (!el) return "bottom-left";

    const rect = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceLeft = rect.left;

    const vertical: "top" | "bottom" = spaceBelow > 80 ? "bottom" : "top";
    const horizontal: "left" | "right" = spaceLeft > 150 ? "left" : "right";

    return `${vertical}-${horizontal}` as TooltipPlacement;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    clearTimers();
    setPressed(true);

    if (tooltip) {
      setPlacement(computePlacement());
      tooltipTimerRef.current = window.setTimeout(() => {
        setTooltipVisible(true);
      }, TOOLTIP_DELAY);
    }
  };

  const handlePointerUp = () => {
    if (disabled) return;
    if (tooltipTimerRef.current !== null) {
      window.clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
    setTooltipVisible(false);

    releaseTimerRef.current = window.setTimeout(() => {
      setPressed(false);
    }, PRESS_DURATION);

    onPress?.();
  };

  const handlePointerLeave = () => {
    if (disabled) return;
    clearTimers();
    setPressed(false);
    setTooltipVisible(false);
  };

  // Обработка клавиатуры
  useEffect(() => {
    if (!hotkey || disabled) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== hotkey.toLowerCase()) return;
      if (e.repeat) return;
      e.preventDefault();
      setPressed(true);
      onPress?.();
      window.setTimeout(() => setPressed(false), PRESS_DURATION);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hotkey, disabled, onPress]);

  // Очистка таймеров при размонтировании
  useEffect(() => clearTimers, []);

  const className = [
    styles.btn,
    styles[`btn--${variant}`],
    active && styles["is-active"],
    pressed && styles["is-pressed"],
    disabled && styles["btn--disabled"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={buttonRef}
      type="button"
      className={className}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onContextMenu={(e) => e.preventDefault()}
    >
      <span className={styles.btn__label}>{children}</span>
      {tooltip && (
        <Tooltip text={tooltip} visible={tooltipVisible} placement={placement} />
      )}
    </button>
  );
}