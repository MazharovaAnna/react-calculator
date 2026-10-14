import { useConverter } from "@/hooks/useConverter";
import { CategoryTabs } from "@/components/converter/CategoryTabs";
import { ConverterField } from "@/components/converter/ConverterField";
import { ConverterKeypad } from "@/components/converter/ConverterKeypad";
import { formatConverterValue } from "@/lib/format";
import styles from "./ConverterPage.module.scss";

export function ConverterPage() {
  const c = useConverter();

  // Находим символы единиц
  const fromUnit = c.category.units.find((u) => u.id === c.fromUnitId);
  const toUnit = c.category.units.find((u) => u.id === c.toUnitId);

  const fromSymbol = fromUnit?.symbol ?? "";
  const toSymbol = toUnit?.symbol ?? "";

  // Форматируем результат
  const formattedResult =
    c.converted === null ? "—" : formatConverterValue(c.converted);

  return (
    <div className={styles.page}>
      <CategoryTabs
        categories={c.categories}
        activeId={c.categoryId}
        onSelect={c.setCategory}
      />

      <div className={styles.fields}>
        <ConverterField
          category={c.category}
          unitId={c.fromUnitId}
          value={c.input}
          symbol={fromSymbol}
          onUnitChange={c.setFromUnit}
          
        />

        <ConverterField
          category={c.category}
          unitId={c.toUnitId}
          value={formattedResult}
          symbol={toSymbol}
          readonly
          onUnitChange={c.setToUnit}
        />
      </div>

      <div className={styles.keypadWrap}>
        <ConverterKeypad
          onDigit={c.appendDigit}
          onDecimal={c.appendDecimal}
          onClear={c.clear}
          onBackspace={c.backspace}
          onToggleSign={c.toggleSign}
          onSwap={c.swap}
        />
      </div>
    </div>
  );
}