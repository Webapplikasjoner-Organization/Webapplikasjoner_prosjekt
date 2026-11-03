import { addGameSchema } from "@/features/games/game-schema";
import { z } from "zod";
import { toGameDTO, toDBGame } from "./game-mapper";
import type { Result } from "@/shared/result";
import { gameRepository, type GameRepository } from "./game-repository";
import { GameDTO } from "./game-mapper";
import { Params } from "@/utils/parse-params";
import { validateListParams } from "@/features/games/utils/validate-list-params";
export interface GameService {
  add: (input: unknown) => Promise<Result<GameDTO>>;
  list: (params?: Params) => Promise<Result<GameDTO[]>>;
  findById: (input: unknown) => Promise<Result<GameDTO> | null>;
  remove: (input: unknown) => Promise<Result<void> | null>;
}

export function createGameService(_repository: GameRepository): GameService {
  return {
    async add(input: unknown): Promise<Result<GameDTO>> {
      const parsed = addGameSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Invalid input for adding games.",
            fieldErrors: z.flattenError(parsed.error).fieldErrors,
          },
        };
      }
      if (Object.keys(parsed.data).length === 0) {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Input is empty.",
          },
        };
      }
      const result = await _repository.create(toDBGame(parsed.data));
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: toGameDTO(result.data),
        code: 201,
      };
    },
    async list(params: Params = {}): Promise<Result<GameDTO[]>> {
      const paramsValidationResult = validateListParams(params);
      if (!paramsValidationResult.ok) {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Invalid list parameters.",
            fieldErrors: {
              [paramsValidationResult.field]: [paramsValidationResult.errors],
            },
          },
        };
      }
      const result = await _repository.findMany(paramsValidationResult.params);
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: result.data.map(toGameDTO),
        code: 200,
      };
    },
    async findById(input: unknown): Promise<Result<GameDTO> | null> {
      if (typeof input !== "string") {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Id must be a string.",
          },
        };
      }
      const result = await _repository.findById(input);
      if (result === null) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "Game could not be found.",
          },
        };
      }
      if (!result.ok) {
        return result;
      }
      if (!result.data) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "Game could not be found.",
          },
        };
      }
      return {
        ok: true,
        data: toGameDTO(result.data),
        code: 200,
      };
    },
    async remove(input: unknown): Promise<Result<void> | null> {
      if (typeof input !== "string") {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Id must be a string.",
          },
        };
      }
      const foundGame = await _repository.findById(input);
      if (!foundGame) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "Game could not be found.",
          },
        };
      }
      const result = await _repository.delete(input);
      if (result === null) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "Game could not be found.",
          },
        };
      }
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: result.data,
        code: 200,
      };
    },
  };
}

export const gameService = createGameService(gameRepository);
