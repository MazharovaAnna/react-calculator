export type AngleMode = "deg" | "rad";

export type Token =
  | { type: "number"; value: number }
  | { type: "ident"; value: string }
  | { type: "plus" }
  | { type: "minus" }
  | { type: "multiply" }
  | { type: "divide" }
  | { type: "lparen" }
  | { type: "rparen" }
  | { type: "comma" }
  | { type: "factorial" }
  | { type: "square" }
  | { type: "cube" }        // ← новое
  | { type: "power" };