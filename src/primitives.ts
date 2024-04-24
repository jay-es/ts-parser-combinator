import type { Parser } from "./types";

export const anyChar: Parser<string> = (input) => {
  const [data, ...rest] = input;

  return data
    ? {
        result: "success",
        data,
        rest,
      }
    : { result: "fail" };
};

export const eof: Parser<null> = (input) => {
  return input.length === 0
    ? {
        result: "success",
        data: null,
        rest: [],
      }
    : { result: "fail" };
};
