import { char } from "./char";
import { cat, not, rep } from "./combinators";
import type { ParseSuccess, Parser } from "./types";

// （独自）ParseSuccess 用の map
type MapSuccessFunc = <T, U>(r: ParseSuccess<T>, data: U) => ParseSuccess<U>;
export const mapSuccess: MapSuccessFunc = (r, data) => ({ ...r, data });

// 解析結果の map
type MapFunc = <T, U>(p: Parser<T>, f: (a: T) => U) => Parser<U>;
export const map: MapFunc = (p, f) => (input) => {
  const r = p(input);
  return r.result === "success" ? mapSuccess(r, f(r.data)) : r;
};

// 文字列のパーサ
type StrFunc = (s: string) => Parser<string>;
export const str: StrFunc = (s) => {
  const p = cat([...s].map(char));

  return (input) => {
    const r = p(input);
    return r.result === "success" ? mapSuccess(r, s) : r;
  };
};

interface Some<T> {
  status: "some";
  value: T;
}
interface None {
  status: "none";
}
export type Option<T> = Some<T> | None;

// オプション演算子
type OptFunc = <T>(p: Parser<T>) => Parser<Option<T>>;
export const opt: OptFunc = (p) => (input) => {
  const r = p(input);
  return r.result === "success"
    ? mapSuccess(r, { status: "some", value: r.data })
    : {
        result: "success",
        data: { status: "none" },
        rest: input,
      };
};

// 差分演算子
type DiffFunc = <T>(p: Parser<T>, q: Parser<unknown>) => Parser<T>;
export const diff: DiffFunc = (p, q) => map(cat([not(q), p]), ([, r]) => r);

// リストパーサ
type ListFunc = <T>(p: Parser<T>, delimiter: Parser<unknown>) => Parser<T[]>;
export const list: ListFunc = (p, delimiter) =>
  map(
    cat([p, rep(map(cat([delimiter, p]), ([, r]) => r))]),
    ([first, rest]) => [first, ...rest],
  );
