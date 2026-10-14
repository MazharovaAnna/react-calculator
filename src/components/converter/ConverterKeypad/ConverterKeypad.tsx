import { Button } from "@/components/ui/Button";
import type { KeyDef } from "@/types";
import styles from "./ConverterKeypad.module.scss";

type Props = {
  onDigit: (d: string) => void;
  onDecimal: () => void;
  onClear: () => void;
  onBackspace: () => void;
  onToggleSign: () => void;
  onSwap: () => void;
};

export function ConverterKeypad({
  onDigit,
  onDecimal,
  onClear,
  onBackspace,
  onToggleSign,
  onSwap,
}: Props) {
  // Локальная раскладка — не выносим в keypads.ts,
  // потому что она используется только здесь
  const keys: KeyDef[] = [
    { id: "7", label: "7", variant: "number", hotkey: "7", onPress: () => onDigit("7") },
    { id: "8", label: "8", variant: "number", hotkey: "8", onPress: () => onDigit("8") },
    { id: "9", label: "9", variant: "number", hotkey: "9", onPress: () => onDigit("9") },
    { id: "clear", label: "C", variant: "danger", tooltip: "Очистить", hotkey: "Escape", onPress: onClear },

    { id: "4", label: "4", variant: "number", hotkey: "4", onPress: () => onDigit("4") },
    { id: "5", label: "5", variant: "number", hotkey: "5", onPress: () => onDigit("5") },
    { id: "6", label: "6", variant: "number", hotkey: "6", onPress: () => onDigit("6") },
    { id: "backspace", label: "⌫", variant: "danger", tooltip: "стереть", hotkey: "Backspace", onPress: onBackspace },

    { id: "1", label: "1", variant: "number", hotkey: "1", onPress: () => onDigit("1") },
    { id: "2", label: "2", variant: "number", hotkey: "2", onPress: () => onDigit("2") },
    { id: "3", label: "3", variant: "number", hotkey: "3", onPress: () => onDigit("3") },
    { id: "up", label: "↑", variant: "accent", tooltip: "поменять местами", onPress: onSwap },

    { id: "sign", label: "+/−", variant: "number", tooltip: "сменить знак", onPress: onToggleSign },
    { id: "0", label: "0", variant: "number", hotkey: "0", onPress: () => onDigit("0") },
    { id: "decimal", label: ",", variant: "number", tooltip: "запятая", hotkey: ".", onPress: onDecimal },
    { id: "down", label: "↓", variant: "accent", tooltip: "поменять местами", onPress: onSwap },
  ];

  return (
    <div className={styles.keypad}>
      {keys.map((key) => (
        <Button
          key={key.id}
          variant={key.variant}
          tooltip={key.tooltip}
          hotkey={key.hotkey}
          onPress={key.onPress}
          round
        >
          {key.label}
        </Button>
      ))}
    </div>
  );
}