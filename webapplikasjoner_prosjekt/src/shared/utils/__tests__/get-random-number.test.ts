import { describe, it, expect } from "vitest";
import { getRandomNumber } from "../get-random-number";

describe("getRandomNumber", () => {
  it("should return a number within the specified range", () => {
    const min = 0;
    const max = 100;
    const result = getRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
