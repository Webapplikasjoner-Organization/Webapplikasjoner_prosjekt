import { addGameSchema } from "@/features/games/game-schema";
import { z } from "zod";
import { toGameDTO } from "./game-mapper";
import type { Result } from "@/shared/result";
import { gameRepository, type GameRepository } from "./game-repository";
import { GameDTO } from "./game-mapper";
import { Params } from "@/utils/parse-params";
import { validateListParams } from "@/features/games/utils/validate-list-params";
export interface GameService {
  add: (input: unknown) => Promise<Result<GameDTO>>;
  list: (params?: Params) => Promise<Result<GameDTO[]>>;
  findById: (input: unknown) => Promise<Result<GameDTO> | null>;
  delete: (input: unknown) => Promise<Result<GameDTO> | null>;
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
      const result = await _repository.create(parsed.data);
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: toGameDTO(result.data),
        code: 201,
      };
    },
    async list(params?: Params): Promise<Result<GameDTO[]>> {},
    async findById(input: unknown): Promise<Result<GameDTO> | null> {},
    async delete(input: unknown): Promise<Result<GameDTO> | null> {},
  };
}

export const gameService = createGameService(gameRepository);
