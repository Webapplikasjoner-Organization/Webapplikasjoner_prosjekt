import { describe, it, expect } from "vitest";
import {
  type UserListParams,
  validateListParams,
} from "@/features/users/utils/validate-list-params";

describe("validateListParams", () => {
  it("Return errors whenlimit cannot be converted to a number", () => {
    const invalidLimit = "not-a-number";
    const result = validateListParams({ q: "username", limit: invalidLimit });
    expect(result).toHaveProperty("errors");
  });
  it("Return errors when limit is below 1", () => {
    const invalidLimit = "0";
    const result = validateListParams({ q: "username", limit: invalidLimit });
    expect(result).toHaveProperty("errors");
  });
  it("Return errors when limit is above 100", () => {
    const invalidLimit = "101";
    const result = validateListParams({ q: "username", limit: invalidLimit });
    expect(result).toHaveProperty("errors");
  });
  it("Returns with ok = true even if q is undefined", () => {
    const result = validateListParams({ q: undefined, limit: "10" });
    expect(result).toHaveProperty("ok", true);
  });
  it("Returns with ok = true even if limit is undefined", () => {
    const result = validateListParams({ q: "username", limit: undefined });
    expect(result).toHaveProperty("ok", true);
  });
});
