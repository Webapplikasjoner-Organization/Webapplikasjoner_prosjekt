import { type Params } from "@/utils/parse-params";

const LIST_LIMIT_MIN = 0;
const LIST_LIMIT_MAX = 100;

export type UserListParams = {
  q?: string;
  limit?: number;
};

export type ListParamsValidation =
  | {
      ok: true;
      params: UserListParams;
    }
  | {
      ok: false;
      field: keyof UserListParams;
      errors: string;
    };

export function validateListParams(input: Params): ListParamsValidation {
  const params: UserListParams = {};

  const search = input.q?.trim();
  if (search === undefined || search === "") {
    return {
      ok: false,
      field: "q",
      errors: "Search query cannot be empty.",
    };
  }
  params.q = search;

  if (input.limit) {
    const limit = Number(input.limit);
    const isValidLimit =
      Number.isInteger(limit) &&
      limit > LIST_LIMIT_MIN &&
      limit <= LIST_LIMIT_MAX;
    if (!isValidLimit) {
      return {
        ok: false,
        field: "limit",
        errors: `Limit must be a number between ${LIST_LIMIT_MIN + 1} and ${LIST_LIMIT_MAX}.`,
      };
    }
    params.limit = limit;
  }
  return {
    ok: true,
    params,
  };
}
