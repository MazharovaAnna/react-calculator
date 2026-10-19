import { Button } from "@/components/ui/Button";
import type { KeyDef } from "@/types";
import styles from "./Keypad.module.scss";

type Props = {
  keys: KeyDef[];
  className?: string;
  scientific?: boolean;
};

export function Keypad({ keys, className, scientific = false }: Props) {
  const rootClass = [
    styles.keypad,
    scientific && styles["keypad--scientific"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
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
  );
}
