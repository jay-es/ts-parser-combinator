import { or } from "../combinators";
import type { Parser } from "../types";
import { map, str } from "../util";

const parseTrue: Parser<true> = map(str("true"), () => true);
const parseFalse: Parser<false> = map(str("false"), () => false);
export const bool: Parser<boolean> = or([parseTrue, parseFalse]);
