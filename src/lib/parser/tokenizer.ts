import type { Token } from "./types";

// Символы, которые калькулятор использует в UI,
// но в парсере работают как стандартные операторы
const NORMALIZE_MAP: Record<string, string> = {
  "×": "*",
  "÷": "/",
  "−": "-",
  "√": "sqrt",
  "∛": "cbrt",
  π: "pi",
};

function normalize(input: string): string {
  return input
    .split("")
    .map((ch) => NORMALIZE_MAP[ch] ?? ch)
    .join("");
}

export function tokenize(input: string): Token[] {
  const src = normalize(input);
  const tokens: Token[] = [];
  let i = 0;

  while (i < src.length) {
    const ch = src[i];

    // Пробелы игнорируем
    if (ch === " ") {
      i++;
      continue;
    }

    // Числа: 42, 3.14, .5
    if (/[0-9.]/.test(ch)) {
      let num = "";
      let dots = 0;
      while (i < src.length && /[0-9.]/.test(src[i])) {
        if (src[i] === ".") dots++;
        if (dots > 1) throw new Error("Invalid number");
        num += src[i++];
      }
      tokens.push({ type: "number", value: parseFloat(num) });
      continue;
    }

    // Идентификаторы: sin, cos, log, ln, pi, e, sqrt, ...
    // Начинаются с буквы, могут содержать буквы и цифры
    if (/[a-zA-Z]/.test(ch)) {
      let ident = "";
      while (i < src.length && /[a-zA-Z0-9_]/.test(src[i])) {
        ident += src[i++];
      }
      tokens.push({ type: "ident", value: ident.toLowerCase() });
      continue;
    }

    // Одиночные символы
    switch (ch) {
      case "+":
        tokens.push({ type: "plus" });
        i++;
        break;
      case "-":
        tokens.push({ type: "minus" });
        i++;
        break;
      case "*":
        tokens.push({ type: "multiply" });
        i++;
        break;
      case "/":
        tokens.push({ type: "divide" });
        i++;
        break;
      case "^":
        tokens.push({ type: "power" });
        i++;
        break;
      case "(":
        tokens.push({ type: "lparen" });
        i++;
        break;
      case ")":
        tokens.push({ type: "rparen" });
        i++;
        break;
      case ",":
        tokens.push({ type: "comma" });
        i++;
        break;
      case "!":
        tokens.push({ type: "factorial" });
        i++;
        break;
      case "²":
        tokens.push({ type: "square" });
        i++;
        break;
      case "³":
        tokens.push({ type: "cube" });
        i++;
        break;
      default:
        throw new Error(`Unexpected character: ${ch}`);
    }
  }

  return tokens;
}
