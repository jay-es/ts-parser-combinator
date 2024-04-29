import { type Digit, char, digit } from "../char";
import { cat, or, rep } from "../combinators";
import type { Parser } from "../types";
import { diff, map, opt } from "../util";

const nonZeroDigit: Parser<Digit> = diff(digit, char("0"));
const zeroNumber: Parser<0> = map(char("0"), () => 0);
const nonZeroNumber: Parser<number> = map(
  cat([nonZeroDigit, rep(digit)]),
  ([first, rest]) => Number.parseInt([first, ...rest].join(""), 10),
);
export const numbers: Parser<number> = or([zeroNumber, nonZeroNumber]);
const sign: Parser<1 | -1> = map(opt(or([char("+"), char("-")])), (r) =>
  r.status === "some" && r.value === "-" ? -1 : 1,
);
export const int: Parser<number> = map(cat([sign, numbers]), ([s, n]) => s * n);
