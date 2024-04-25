import { describe, expect, test } from "vitest";
import { char } from "./char";
import { cat, not, or, rep } from "./combinators";
import type { ParserOutput } from "./types";

describe('not(char("a"))', () => {
  const parser = not(char("a"));

  test("Empty input", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: "success",
      data: null,
      rest: [],
    });
  });

  test('Input "a"', () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: "fail",
    });
  });

  test('Input "A"', () => {
    const input = [..."A"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: "success",
      data: null,
      rest: [..."A"],
    });
  });

  test('Input "hoge"', () => {
    const input = [..."hoge"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<null>>({
      result: "success",
      data: null,
      rest: [..."hoge"],
    });
  });
});

describe("or()", () => {
  describe("or([])", () => {
    const parser = or([]);

    test("Empty input", () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<unknown>>({
        result: "fail",
      });
    });

    test('Input "a"', () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<unknown>>({
        result: "fail",
      });
    });
  });

  describe('or([char("a"), char("b")])', () => {
    const parser = or([char("a"), char("b")]);

    test("Empty input", () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a" | "b">>({
        result: "fail",
      });
    });

    test('Input "a"', () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a" | "b">>({
        result: "success",
        data: "a",
        rest: [],
      });
    });

    test('Input "b"', () => {
      const input = [..."b"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a" | "b">>({
        result: "success",
        data: "b",
        rest: [],
      });
    });

    test('Input "A"', () => {
      const input = [..."A"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a" | "b">>({
        result: "fail",
      });
    });
  });
});

describe("cat()", () => {
  describe("cat([])", () => {
    const parser = cat([]);

    test("Empty input", () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<[]>>({
        result: "success",
        data: [],
        rest: [],
      });
    });

    test('Input "a"', () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<[]>>({
        result: "success",
        data: [],
        rest: [..."a"],
      });
    });
  });

  describe('cat([char("a"), char("b")])', () => {
    const parser = cat([char("a"), char("b")]);

    test("Empty input", () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<["a", "b"]>>({
        result: "fail",
      });
    });

    test('Input "a"', () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<["a", "b"]>>({
        result: "fail",
      });
    });

    test('Input "abc"', () => {
      const input = [..."abc"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<["a", "b"]>>({
        result: "success",
        data: ["a", "b"],
        rest: [..."c"],
      });
    });

    test('Input "A"', () => {
      const input = [..."A"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<["a", "b"]>>({
        result: "fail",
      });
    });
  });
});

describe("rep()", () => {
  describe('rep(char("a"))', () => {
    const parser = rep(char("a"));

    test("Empty input", () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: [],
        rest: [],
      });
    });

    test('Input "a"', () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: ["a"],
        rest: [],
      });
    });

    test('Input "aa"', () => {
      const input = [..."aa"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: ["a", "a"],
        rest: [],
      });
    });

    test('Input "aab"', () => {
      const input = [..."aab"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: ["a", "a"],
        rest: [..."b"],
      });
    });
  });

  describe('rep(char("a"), 1)', () => {
    const parser = rep(char("a"), 1);

    test("Empty input", () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "fail",
      });
    });

    test('Input "a"', () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: ["a"],
        rest: [],
      });
    });

    test('Input "aa"', () => {
      const input = [..."aa"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: ["a", "a"],
        rest: [],
      });
    });

    test('Input "aab"', () => {
      const input = [..."aab"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: ["a", "a"],
        rest: [..."b"],
      });
    });
  });

  describe('rep(char("a"), 1, 2)', () => {
    const parser = rep(char("a"), 1, 2);

    test("Empty input", () => {
      const input = [] as const;
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "fail",
      });
    });

    test('Input "a"', () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: ["a"],
        rest: [],
      });
    });

    test('Input "aa"', () => {
      const input = [..."aa"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: ["a", "a"],
        rest: [],
      });
    });

    test('Input "aaa"', () => {
      const input = [..."aaa"];
      const output = parser(input);
      expect(output).toEqual<ParserOutput<"a"[]>>({
        result: "success",
        data: ["a", "a"],
        rest: [..."a"],
      });
    });
  });
});
