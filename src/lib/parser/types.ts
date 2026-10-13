export type AngleMode = "deg" | "rad";

export type Token =
  | { type: "number"; value: number }
  | { type: "ident"; value: string }        // sin, cos, log, π, e, ...
  | { type: "plus" }
  | { type: "minus" }
  | { type: "multiply" }
  | { type: "divide" }
  | { type: "lparen" }
  | { type: "rparen" }
  | { type: "comma" }                       // для max(a, b), mod(a, b)
  | { type: "factorial" }                   // !
  | { type: "square" }                      // ²
  | { type: "power" };                      // ^ (для xʸ)