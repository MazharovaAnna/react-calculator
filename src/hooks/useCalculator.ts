import { useCallback, useEffect, useMemo, useState } from "react";
import { evaluate, type AngleMode } from "@/lib/parser";
import { formatResult } from "@/lib/format";

const HISTORY_KEY = "calculator_history";
const HISTORY_LIMIT = 20;

export type HistoryItem = {
  expr: string;
  result: string;
  time: number;
};

function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(items: HistoryItem[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  } catch {}
}

// Красивое отображение операторов в expression
const OPERATOR_DISPLAY: Record<string, string> = {
  "*": "×",
  "/": "÷",
  "-": "−",
  "+": "+",
};

export function useCalculator() {
  const [expression, setExpression] = useState("0");
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory);

  // Сохраняем историю при каждом изменении
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  // Предпросмотр — вычисляем, если выражение завершено
  const preview = useMemo(() => {
    if (!expression || expression === "0") return "";
    if (justEvaluated) return "";

    const last = expression.slice(-1);
    // Неполные выражения не считаем
    if ("+-*/^(".includes(last)) return "";

    const value = evaluate(expression, angleMode);
    if (value === null) return "";

    const formatted = formatResult(value);
    // Если результат совпадает с выражением — не дублируем
    if (formatted === expression) return "";
    return formatted;
  }, [expression, angleMode, justEvaluated]);

  // ===== Ввод цифр =====
  const appendNumber = useCallback(
    (num: string) => {
      setExpression((prev) => {
        if (justEvaluated) {
          setJustEvaluated(false);
          return num;
        }
        // Заменяем одиночный "0"
        if (prev === "0") return num;
        if (prev === "-0") return "-" + num;

        // Ограничение длины
        const digits = prev.replace(/[^0-9]/g, "").length;
        if (digits >= 15) return prev;

        return prev + num;
      });
    },
    [justEvaluated],
  );

  // ===== Десятичная запятая =====
  const appendDecimal = useCallback(() => {
    setExpression((prev) => {
      if (justEvaluated) {
        setJustEvaluated(false);
        return "0.";
      }

      // Находим последнее число
      const lastNumberMatch = prev.match(/[\d.]+$/);
      if (lastNumberMatch && lastNumberMatch[0].includes(".")) return prev;

      // Если выражение пустое или заканчивается оператором/скобкой
      const last = prev.slice(-1);
      if (prev === "0") return "0.";
      if ("+-*/^(".includes(last)) return prev + "0.";
      return prev + ".";
    });
  }, [justEvaluated]);

  // ===== Оператор =====
  const appendOperator = useCallback(
    (op: "*" | "/" | "-" | "+") => {
      setJustEvaluated(false);
      setExpression((prev) => {
        const last = prev.slice(-1);
        const display = OPERATOR_DISPLAY[op] ?? op;
        const prevDisplay = OPERATOR_DISPLAY[last] ?? last;

        // Если уже оператор в конце — заменяем
        if ("+-*/".includes(last) || "×÷−".includes(last)) {
          // Не даём ставить оператор сразу после "("
          if (prev.length === 1) return prev;
          const beforeLast = prev.slice(0, -1);
          if (beforeLast.slice(-1) === "(") return prev;
          return beforeLast + display;
        }

        // Нельзя после "("
        if (last === "(") return prev;

        return prev + display;
      });
    },
    [],
  );

  // ===== Скобки =====
  const appendParen = useCallback(() => {
    setJustEvaluated(false);
    setExpression((prev) => {
      const last = prev.slice(-1);
      const open = (prev.match(/\(/g) || []).length;
      const close = (prev.match(/\)/g) || []).length;

      // Если есть незакрытая и последний — цифра или ")" — закрываем
      if (open > close && (/\d/.test(last) || last === ")")) {
        return prev + ")";
      }

      // Иначе открываем
      // Неявное умножение: 5( → 5×(
      if (/\d/.test(last) || last === ")") {
        return prev === "0" ? "(" : prev + "×(";
      }
      return prev === "0" ? "(" : prev + "(";
    });
  }, []);

  // ===== Функция (sin, cos, log и т.д.) =====
  const appendFunction = useCallback(
    (fn: string) => {
      setJustEvaluated(false);
      setExpression((prev) => {
        const last = prev.slice(-1);
        // Неявное умножение: 5sin( → 5×sin(
        if (/\d/.test(last) || last === ")" || last === "π" || last === "e") {
          return (prev === "0" ? "" : prev + "×") + `${fn}(`;
        }
        return (prev === "0" ? "" : prev) + `${fn}(`;
      });
    },
    [],
  );

  // ===== Константа (π, e) =====
  const appendConstant = useCallback(
    (c: string) => {
      setJustEvaluated(false);
      setExpression((prev) => {
        const last = prev.slice(-1);
        if (/\d/.test(last) || last === ")" || last === "π" || last === "e") {
          return (prev === "0" ? "" : prev + "×") + c;
        }
        return (prev === "0" ? "" : prev) + c;
      });
    },
    [],
  );

  // ===== Постфикс (! — факториал, ² — квадрат) =====
  const appendPostfix = useCallback((suffix: "!" | "²") => {
    setExpression((prev) => {
      const last = prev.slice(-1);
      // Применяем только после числа или ")"
      if (/\d/.test(last) || last === ")" || last === "π" || last === "e") {
        return prev + suffix;
      }
      return prev;
    });
  }, []);

  // ===== Backspace =====
  const backspace = useCallback(() => {
    if (justEvaluated) {
      setExpression("0");
      setJustEvaluated(false);
      return;
    }
    setExpression((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  }, [justEvaluated]);

  // ===== Clear =====
  const clear = useCallback(() => {
    setExpression("0");
    setJustEvaluated(false);
  }, []);

  // ===== Смена знака =====
  const toggleSign = useCallback(() => {
    setExpression((prev) => {
      if (prev === "0") return prev;
      // Находим последнее число и меняем его знак
      const match = prev.match(/(-?\d+\.?\d*)$/);
      if (!match) return prev;

      const numStr = match[0];
      const before = prev.slice(0, -numStr.length);
      const last = before.slice(-1);

      // Если перед числом уже минус — убираем
      if (last === "-" || last === "−") {
        return before.slice(0, -1) + numStr.replace(/^-/, "");
      }
      // Иначе — добавляем минус
      return before + "-" + numStr.replace(/^-/, "");
    });
  }, []);

  // ===== Процент =====
  const percent = useCallback(() => {
    setExpression((prev) => {
      const match = prev.match(/(\d+\.?\d*)$/);
      if (!match) return prev;

      const num = parseFloat(match[0]);
      const before = prev.slice(0, -match[0].length);
      const lastOp = before.slice(-1);

      let replacement: string;

      // Для × и ÷ — просто делим на 100
      if ("×*÷/".includes(lastOp)) {
        replacement = formatResult(num / 100);
      }
      // Для + и − — процент от левой части
      else if ("+-−".includes(lastOp)) {
        const leftExpr = before.slice(0, -1);
        const leftVal = evaluate(leftExpr, angleMode);
        if (leftVal !== null && isFinite(leftVal)) {
          replacement = formatResult((leftVal * num) / 100);
        } else {
          replacement = formatResult(num / 100);
        }
      }
      // Нет оператора — просто /100
      else {
        replacement = formatResult(num / 100);
      }

      return prev.slice(0, -match[0].length) + replacement;
    });
  }, [angleMode]);

  // ===== Вычисление =====
  const calculate = useCallback(() => {
    setExpression((prev) => {
      // Автозакрытие скобок
      const open = (prev.match(/\(/g) || []).length;
      const close = (prev.match(/\)/g) || []).length;
      let expr = prev;
      for (let i = 0; i < open - close; i++) expr += ")";

      const value = evaluate(expr, angleMode);
      if (value === null) {
        setJustEvaluated(true);
        return "Ошибка";
      }

      const formatted = formatResult(value);

      // Пишем в историю
      setHistory((h) =>
        [
          { expr, result: formatted, time: Date.now() },
          ...h,
        ].slice(0, HISTORY_LIMIT),
      );

      setJustEvaluated(true);
      return formatted;
    });
  }, [angleMode]);

  // ===== Скобки-автомат =====
  const toggleAngleMode = useCallback(() => {
    setAngleMode((m) => (m === "deg" ? "rad" : "deg"));
  }, []);

  // ===== История =====
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const useHistoryItem = useCallback((result: string) => {
    setExpression(result);
    setJustEvaluated(true);
  }, []);

  return {
    expression,
    preview,
    angleMode,
    history,

    appendNumber,
    appendDecimal,
    appendOperator,
    appendParen,
    appendFunction,
    appendConstant,
    appendPostfix,

    backspace,
    clear,
    toggleSign,
    percent,
    calculate,
    toggleAngleMode,

    clearHistory,
    useHistoryItem,
  };
}