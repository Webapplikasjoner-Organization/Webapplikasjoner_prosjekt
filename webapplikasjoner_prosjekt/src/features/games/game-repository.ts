"use server";

import { db, type DB } from "@/db";
import type {
  UserGame,
  CreateUserGame,
  UpdateUserGame,
} from "@/db/schema/user-game-schema";
import type { Result } from "@/shared/result";
import { usergames } from "@/db/schema/user-game-schema";
import { eq, desc } from "drizzle-orm";
import { type GameListParams } from "@/features/games/utils/validate-list-params";

export interface GameRepository {
  create: (game: CreateUserGame) => Promise<Result<UserGame>>;
  findMany: (params?: GameListParams) => Promise<Result<UserGame[]>>;
  findById: (id: string) => Promise<Result<UserGame> | null>;
  delete: (id: string) => Promise<Result<void> | null>;
}

export function createGameRepository(_db: DB): GameRepository {
  return {
    async create(game: CreateUserGame): Promise<Result<UserGame>> {
      try {
        const existingGame = game.id ? await this.findById(game?.id) : null;
        if ((existingGame?.ok && existingGame?.data) || existingGame === null) {
          return {
            ok: false,
            error: {
              code: 409,
              message: "Game already exists.",
            },
          };
        }
        const addedGame = await _db
          .insert(usergames)
          .values(game)
          .returning()
          .get();
        return {
          ok: true,
          data: addedGame,
          code: 201,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Server error. Could not add a new game to the list.",
          },
        };
      }
    },
    async findMany({ q, limit }: GameListParams = {}): Promise<
      Result<UserGame[]>
    > {
      try {
        const rows = await _db.query.usergames.findMany({
          where: q ? { gameid: q } : undefined,
          orderBy: { id: "desc" },
          limit,
        });
        return {
          ok: true,
          data: rows,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Server error. Could not retrieve the list of games.",
          },
        };
      }
    },
    async findById(id: string): Promise<Result<UserGame> | null> {
      try {
        const getGame = await _db.query.usergames.findFirst({ where: { id } });
        if (!getGame) {
          return null;
        }
        return {
          ok: true,
          data: getGame,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Server error. Could not retrieve the game.",
          },
        };
      }
    },
    async delete(id: string): Promise<Result<void> | null> {
      try {
        await _db.delete(usergames).where(eq(usergames.id, id));
        return {
          ok: true,
          data: undefined,
          code: 204,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Server error. Could not delete the game.",
          },
        };
      }
    },
  };
}

export const gameRepository = createGameRepository(db);
