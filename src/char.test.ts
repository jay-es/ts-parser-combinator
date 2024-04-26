import { describe, expect, test } from "vitest";
import { alpha, char, digit, is, lowerAlpha, upperAlpha } from "./char";
import type { Alphabet, Digit, LowerAlphabet, UpperAlphabet } from "./char";
import type { ParserOutput } from "./types";

describe('char("a")', () => {
  const parser = char("a");

  test("Empty input", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<"a">>({
      result: "fail",
    });
  });

  test('Input "a"', () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<"a">>({
      result: "success",
      data: "a",
      rest: [],
    });
  });

  test('Input "A"', () => {
    const input = [..."A"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<"a">>({
      result: "fail",
    });
  });

  test('Input "hoge"', () => {
    const input = [..."hoge"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<"a">>({
      result: "fail",
    });
  });
});

describe("is()", () => {
  describe('is(c => c === "a")', () => {
    const parser = is((c): c is "a" => c === "a");

    test("Empty input", () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a">>({
        result: "fail",
      });
    });

    test('Input "a"', () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a">>({
        result: "success",
        data: "a",
        rest: [],
      });
    });

    test('Input "A"', () => {
      const input = [..."A"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a">>({
        result: "fail",
      });
    });
  });

  describe('is(c => c === "0" || c === "1")', () => {
    const parser = is((c): c is "0" | "1" => c === "0" || c === "1");

    test("Empty input", () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"0" | "1">>({
        result: "fail",
      });
    });

    test('Input "0"', () => {
      const input = [..."0"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"0" | "1">>({
        result: "success",
        data: "0",
        rest: [],
      });
    });

    test('Input "1"', () => {
      const input = [..."1"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"0" | "1">>({
        result: "success",
        data: "1",
        rest: [],
      });
    });

    test('Input "A"', () => {
      const input = [..."A"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"0" | "1">>({
        result: "fail",
      });
    });
  });
});

describe("upperAlpha", () => {
  const parser = upperAlpha;

  test("Empty input", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<UpperAlphabet>>({
      result: "fail",
    });
  });

  test('Input "a"', () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<UpperAlphabet>>({
      result: "fail",
    });
  });

  test('Input "A"', () => {
    const input = [..."A"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<UpperAlphabet>>({
      result: "success",
      data: "A",
      rest: [],
    });
  });
});

describe("lowerAlpha", () => {
  const parser = lowerAlpha;

  test("Empty input", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LowerAlphabet>>({
      result: "fail",
    });
  });

  test('Input "a"', () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LowerAlphabet>>({
      result: "success",
      data: "a",
      rest: [],
    });
  });

  test('Input "A"', () => {
    const input = [..."A"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<LowerAlphabet>>({
      result: "fail",
    });
  });
});

describe("alpha", () => {
  const parser = alpha;

  test("Empty input", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: "fail",
    });
  });

  test('Input "a"', () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: "success",
      data: "a",
      rest: [],
    });
  });

  test('Input "A"', () => {
    const input = [..."A"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: "success",
      data: "A",
      rest: [],
    });
  });

  test('Input "1"', () => {
    const input = [..."1"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Alphabet>>({
      result: "fail",
    });
  });
});

describe("digit", () => {
  const parser = digit;

  test("Empty input", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: "fail",
    });
  });

  test('Input "5"', () => {
    const input = [..."5"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: "success",
      data: "5",
      rest: [],
    });
  });

  test('Input "a"', () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<Digit>>({
      result: "fail",
    });
  });
});
