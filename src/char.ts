import { anyChar } from "./primitives";
import type { Parser, ParserInput } from "./types";
import { mapSuccess } from "./util";

// 特定の 1 文字のみのパーサ
type CharFunc = <T extends ParserInput[0]>(c: T) => Parser<T>;
export const char: CharFunc = (c) => (input) => {
  const r = anyChar(input);

  return r.result === "success" && r.data === c
    ? mapSuccess(r, c)
    : { result: "fail" };
};

// 条件を満たす 1 文字のパーサ
type IsFunc = <T extends string>(f: (c: ParserInput[0]) => c is T) => Parser<T>;
export const is: IsFunc = (f) => (input) => {
  const r = anyChar(input);

  return r.result === "success" && f(r.data)
    ? mapSuccess(r, r.data) // r をそのまま返すのは型エラー
    : { result: "fail" };
};

// アルファベットのパーサ
// biome-ignore format:
export type UpperAlphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
export type LowerAlphabet = Lowercase<UpperAlphabet>;
export type Alphabet = UpperAlphabet | LowerAlphabet;
export const upperAlpha: Parser<UpperAlphabet> = is((c): c is UpperAlphabet =>
  /^[A-Z]$/.test(c),
);
export const lowerAlpha: Parser<LowerAlphabet> = is((c): c is LowerAlphabet =>
  /^[a-z]$/.test(c),
);
export const alpha: Parser<Alphabet> = is((c): c is LowerAlphabet =>
  /^[A-Za-z]$/.test(c),
);

// 数字のパーサ
// biome-ignore format:
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export const digit: Parser<Digit> = is((c): c is Digit => /^\d$/.test(c));
