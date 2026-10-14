import { createContext, useContext, type ReactNode } from "react";
import { useCalculator } from "@/hooks/useCalculator";

type CalculatorValue = ReturnType<typeof useCalculator>;

const CalculatorContext = createContext<CalculatorValue | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const value = useCalculator();
  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculatorContext(): CalculatorValue {
  const ctx = useContext(CalculatorContext);
  if (!ctx) {
    throw new Error("useCalculatorContext must be used within CalculatorProvider");
  }
  return ctx;
}