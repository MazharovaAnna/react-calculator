import type React from "react";

export type ButtonVariant =
  | "number"
  | "operator"
  | "function"
  | "danger"
  | "equals"
  | "accent"
  | "toggle";

export type KeyDef = {
  id: string;
  label: React.ReactNode;
  variant: ButtonVariant;
  tooltip?: string;
  hotkey?: string;
  active?: boolean;
  disabled?: boolean;
  onPress: () => void;
};