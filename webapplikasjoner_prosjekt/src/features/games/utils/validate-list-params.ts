import { type Params } from "@/utils/parse-params";

const LIST_LIMIT_MIN = 0;
const LIST_LIMIT_MAX = 100;

export type GameListParams = {
  q?: string;
  limit?: number;
};

export type ListParamsValidation =
  | {
      ok: true;
      params: GameListParams;
    }
  | {
      ok: false;
      field: keyof GameListParams;
      errors: string;
    };

export function validateListParams(input: Params): ListParamsValidation {
  const params: GameListParams = {};

  const search = input.q?.trim();
  if (search) {
    params.q = search;
  }

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
