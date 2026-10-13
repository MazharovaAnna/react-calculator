import type { Node } from "./parser";
import { FUNCTIONS, CONSTANTS } from "./functions";
import type { AngleMode } from "./types";

export function evaluateNode(node: Node, angleMode: AngleMode): number | null {
  switch (node.kind) {
    case "number":
      return node.value;

    case "const": {
      const value = CONSTANTS[node.name];
      return value ?? null;
    }

    case "unary": {
      const v = evaluateNode(node.arg, angleMode);
      if (v === null) return null;
      return node.op === "-" ? -v : v;
    }

    case "binary": {
      const l = evaluateNode(node.left, angleMode);
      const r = evaluateNode(node.right, angleMode);
      if (l === null || r === null) return null;

      switch (node.op) {
        case "+": return l + r;
        case "-": return l - r;
        case "*": return l * r;
        case "/": return r === 0 ? null : l / r;
        case "^": return Math.pow(l, r);
      }
      return null;
    }

    case "factorial": {
      const v = evaluateNode(node.arg, angleMode);
      if (v === null) return null;
      const fn = FUNCTIONS.fact;
      return fn([v], angleMode);
    }

    case "square": {
      const v = evaluateNode(node.arg, angleMode);
      if (v === null) return null;
      return v * v;
    }

    case "call": {
      const fn = FUNCTIONS[node.name];
      if (!fn) return null;

      const args: number[] = [];
      for (const argNode of node.args) {
        const v = evaluateNode(argNode, angleMode);
        if (v === null) return null;
        args.push(v);
      }
      return fn(args, angleMode);
    }
  }
}