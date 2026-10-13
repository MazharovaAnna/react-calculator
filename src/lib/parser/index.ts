import { tokenize } from "./tokenizer";
import { Parser } from "./parser";
import { evaluateNode } from "./evaluate";
import type { AngleMode } from "./types";

export type { AngleMode };

export function evaluate(
  expression: string,
  angleMode: AngleMode = "deg",
): number | null {
  if (!expression.trim()) return null;

  try {
    const tokens = tokenize(expression);
    if (tokens.length === 0) return null;
    const parser = new Parser(tokens);
    const ast = parser.parse();
    const result = evaluateNode(ast, angleMode);
    if (result === null || !Number.isFinite(result)) return null;
    return result;
  } catch {
    return null;
  }
}