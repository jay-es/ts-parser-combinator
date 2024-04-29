import { char } from "../char";
import { cat, or, rep } from "../combinators";
import type { Parser, ParserInput, ParserOutput } from "../types";
import { map } from "../util";
import { numbers } from "./int";

const term: Parser<number> = map(
  cat([factor, rep(cat([or([char("*"), char("/")]), factor]))]),
  ([first, rest]) =>
    rest.reduce(
      (lhs, [op, rhs]) => (op === "*" ? lhs * rhs : lhs / rhs),
      first,
    ),
);

export const expr: Parser<number> = map(
  cat([term, rep(cat([or([char("+"), char("-")]), term]))]),
  ([first, rest]) =>
    rest.reduce(
      (lhs, [op, rhs]) => (op === "+" ? lhs + rhs : lhs - rhs),
      first,
    ),
);

function factor(input: ParserInput): ParserOutput<number> {
  return or([numbers, map(cat([char("("), expr, char(")")]), ([, n]) => n)])(
    input,
  );
}
