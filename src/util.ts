import { char } from "./char";
import { cat, rep } from "./combinators";
import type { Parser } from "./types";

type MapFunc = <T, U>(p: Parser<T>, f: (a: T) => U) => Parser<U>;
export const map: MapFunc = (p, f) => (input) => {
  const r = p(input);
  if (r.result === "fail") {
    return r;
  }

  return {
    result: "success",
    data: f(r.data),
    rest: r.rest,
  };
};

type StrFunc = (s: string) => Parser<string>;
export const str: StrFunc = (s) => {
  const p = cat([...s].map(char));

  return (input) => {
    const r = p(input);
    if (r.result === "fail") {
      return r;
    }

    return {
      result: "success",
      data: s,
      rest: r.rest,
    };
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

type OptFunc = <T>(p: Parser<T>) => Parser<Option<T>>;
export const opt: OptFunc = (p) => (input) => {
  const r = p(input);

  if (r.result === "fail") {
    return {
      result: "success",
      data: { status: "none" },
      rest: input,
    };
  }

  return {
    result: "success",
    data: { status: "some", value: r.data },
    rest: r.rest,
  };
};

type DiffFunc = <T>(p: Parser<T>, q: Parser<unknown>) => Parser<T>;
export const diff: DiffFunc = (p, q) => (input) => {
  if (q(input).result === "success") {
    return { result: "fail" };
  }

  return p(input);
};

type ListFunc = <T>(p: Parser<T>, delimiter: Parser<unknown>) => Parser<T[]>;
export const list: ListFunc = (p, delimiter) =>
  map(
    cat([p, rep(map(cat([delimiter, p]), ([, r]) => r))]),
    ([first, rest]) => [first, ...rest],
  );
