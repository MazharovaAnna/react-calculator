import styles from "./Tooltip.module.scss";

export type TooltipPlacement =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

type Props = {
  text: string;
  visible: boolean;
  placement: TooltipPlacement;
};

export function Tooltip({ text, visible, placement }: Props) {
  if (!visible) return null;

  return (
    <div
      className={`${styles.tooltip} ${styles[`tooltip--${placement}`]}`}
      role="tooltip"
    >
      {text}
    </div>
  );
}