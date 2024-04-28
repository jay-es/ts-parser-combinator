import type { Parser, ParserData, ParserOutput } from "./types";
import { mapSuccess } from "./util";

// not 演算子
type NotFunc = (p: Parser<unknown>) => Parser<null>;
export const not: NotFunc = (p) => (input) => {
  return p(input).result === "success"
    ? { result: "fail" }
    : { result: "success", data: null, rest: input };
};

// or 演算子
type OrFunc = <T>(ps: Parser<T>[]) => Parser<T>;
export const or: OrFunc = (ps) => (input) => {
  return ps.reduce<ReturnType<(typeof ps)[number]>>(
    (acc, p) => (acc.result === "fail" ? p(input) : acc),
    { result: "fail" },
  );
};

// 連結演算子
type CatFunc = <T extends Parser<unknown>[]>(
  ps: [...T],
) => Parser<{ [K in keyof T]: ParserData<T[K]> }>;
export const cat: CatFunc = (ps) => (input) => {
  // biome-ignore lint/suspicious/noExplicitAny: 型推論が効かない
  return ps.reduce<ParserOutput<any>>(
    (acc, p) => {
      if (acc.result === "fail") {
        return acc;
      }

      const r = p(acc.rest);

      return r.result === "success" ? mapSuccess(r, [...acc.data, r.data]) : r;
    },
    {
      result: "success",
      data: [],
      rest: input,
    },
  );
};

// 繰り返し演算子
type RepFunc = <T>(p: Parser<T>, min?: number, max?: number) => Parser<T[]>;
export const rep: RepFunc =
  (p, min = 0, max = Number.MAX_SAFE_INTEGER) =>
  (input) => {
    if (min > max) throw new Error("rep: min > max is not allowed.");
    if (min < 0) throw new Error("rep: negative min is not allowed.");
    if (max < 0) throw new Error("rep: negative max is not allowed.");

    const data: ParserData<typeof p>[] = [];
    let rest = input;

    while (rest && data.length < max) {
      const r = p(rest);

      if (r.result === "fail") {
        break;
      }

      data.push(r.data);
      rest = r.rest;
    }

    return data.length >= min
      ? {
          result: "success",
          data,
          rest,
        }
      : { result: "fail" };
  };
