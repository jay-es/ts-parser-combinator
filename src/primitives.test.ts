import { describe, expect, test } from "vitest";
import { anyChar, eof } from "./primitives";
import type { ParserOutput } from "./types";

describe("anyChar", () => {
  const parser = anyChar;

  test("Empty input", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: "fail",
    });
  });

  test("1 character input", () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: "success",
      data: "a",
      rest: [],
    });
  });

  test("Many characters input", () => {
    const input = [..."hoge"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<string>>({
      result: "success",
      data: "h",
      rest: [..."oge"],
    });
  });
});

describe("eof", () => {
  const parser = eof;

  test("Empty input", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: "success",
      data: null,
      rest: [],
    });
  });

  test("1 character input", () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: "fail",
    });
  });
});
