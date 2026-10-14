import type { Token } from "./types";

// AST-узлы — простое дерево
export type Node =
  | { kind: "number"; value: number }
  | { kind: "const"; name: string }
  | { kind: "call"; name: string; args: Node[] }
  | { kind: "unary"; op: "-" | "+"; arg: Node }
  | { kind: "binary"; op: "+" | "-" | "*" | "/" | "^"; left: Node; right: Node }
  | { kind: "factorial"; arg: Node }
  | { kind: "square"; arg: Node }
  | { kind: "cube"; arg: Node } 

export class Parser {
  private tokens: Token[];
  private pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private next(): Token | undefined {
    return this.tokens[this.pos++];
  }

  private expect(type: Token["type"]): Token {
    const t = this.next();
    if (!t || t.type !== type) {
      throw new Error(`Expected ${type}, got ${t?.type ?? "EOF"}`);
    }
    return t;
  }

  parse(): Node {
    const node = this.parseExpression();
    if (this.pos !== this.tokens.length) {
      throw new Error("Unexpected tokens after expression");
    }
    return node;
  }

  // expression = term (("+" | "-") term)*
  private parseExpression(): Node {
    let left = this.parseTerm();
    while (true) {
      const t = this.peek();
      if (t?.type === "plus" || t?.type === "minus") {
        this.next();
        const right = this.parseTerm();
        left = {
          kind: "binary",
          op: t.type === "plus" ? "+" : "-",
          left,
          right,
        };
      } else {
        break;
      }
    }
    return left;
  }

  // term = unary (("*" | "/") unary)*
  private parseTerm(): Node {
    let left = this.parseUnary();
    while (true) {
      const t = this.peek();
      if (t?.type === "multiply" || t?.type === "divide") {
        this.next();
        const right = this.parseUnary();
        left = {
          kind: "binary",
          op: t.type === "multiply" ? "*" : "/",
          left,
          right,
        };
      } else {
        break;
      }
    }
    return left;
  }

  // unary = ("+" | "-") unary | postfix
  private parseUnary(): Node {
    const t = this.peek();
    if (t?.type === "minus") {
      this.next();
      return { kind: "unary", op: "-", arg: this.parseUnary() };
    }
    if (t?.type === "plus") {
      this.next();
      return { kind: "unary", op: "+", arg: this.parseUnary() };
    }
    return this.parsePostfix();
  }

  // postfix = primary ("!" | "²" | "^" unary)*
  private parsePostfix(): Node {
  let node = this.parsePrimary();
  while (true) {
    const t = this.peek();
    if (t?.type === "factorial") {
      this.next();
      node = { kind: "factorial", arg: node };
    } else if (t?.type === "square") {
      this.next();
      node = { kind: "square", arg: node };
    } else if (t?.type === "cube") {
      this.next();
      node = { kind: "cube", arg: node };
    } else if (t?.type === "power") {
      this.next();
      const right = this.parseUnary();
      node = { kind: "binary", op: "^", left: node, right };
    } else {
      break;
    }
  }
  return node;
}

  // primary = number | ident ("(" args ")")? | "(" expression ")"
  private parsePrimary(): Node {
    const t = this.next();
    if (!t) throw new Error("Unexpected end of input");

    if (t.type === "number") {
      return { kind: "number", value: t.value };
    }

    if (t.type === "lparen") {
      const inner = this.parseExpression();
      this.expect("rparen");
      return inner;
    }

    if (t.type === "ident") {
      // Функция с аргументами?
      if (this.peek()?.type === "lparen") {
        this.next(); // съедаем "("
        const args: Node[] = [];
        if (this.peek()?.type !== "rparen") {
          args.push(this.parseExpression());
          while (this.peek()?.type === "comma") {
            this.next();
            args.push(this.parseExpression());
          }
        }
        this.expect("rparen");
        return { kind: "call", name: t.value, args };
      }
      // Константа без скобок
      return { kind: "const", name: t.value };
    }

    throw new Error(`Unexpected token: ${t.type}`);
  }
}