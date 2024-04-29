import { describe, expect, test } from "vitest";
import type { ParserOutput } from "../types";
import { bool } from "./bool";

describe("bool", () => {
  const parser = bool;

  test("Empty input", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<ParserOutput<boolean>>({
      result: "fail",
    });
  });

  test('Input "true"', () => {
    const input = [..."true"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<boolean>>({
      result: "success",
      data: true,
      rest: [],
    });
  });

  test('Input "false"', () => {
    const input = [..."false"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<boolean>>({
      result: "success",
      data: false,
      rest: [],
    });
  });

  test('Input "null"', () => {
    const input = [..."null"];
    const output = parser(input);
    expect(output).toEqual<ParserOutput<boolean>>({
      result: "fail",
    });
  });
});
