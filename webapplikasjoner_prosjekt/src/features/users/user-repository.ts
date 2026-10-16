import { db, type DB } from "@/db";
import type { CreateUser, UpdateUser, User } from "@/db/schema/user-schema";
import type { Result } from "@/shared/result";
import { users } from "@/db/schema/user-schema";
import { eq, desc } from "drizzle-orm";
import { type UserListParams } from "@/utils/validate-list-params";

export interface UserRepository {
  create: (user: CreateUser) => Promise<Result<User>>;
  findMany: (params: UserListParams) => Promise<Result<User[]>>;
  findById: (id: string) => Promise<Result<User> | null>;
  update: (id: string, username: string) => Promise<Result<User> | null>;
  delete: (id: string) => Promise<Result<void>>;
}

export function createUserRepository(_db: DB): UserRepository {
  return {
    async create(user: CreateUser): Promise<Result<User>> {
      try {
        const createUser = await _db
          .insert(users)
          .values(user)
          .returning()
          .get();
        return {
          ok: true,
          data: createUser,
          code: 201,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Server error. Could not create a new user.",
          },
        };
      }
    },
    async findMany({ q, limit }: UserListParams): Promise<Result<User[]>> {
      try {
        const rows = await _db.query.users.findMany({
          where: {
            username: q ? { like: `%${q}%` } : undefined,
          },
          orderBy: { username: "desc" },
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
            message: "Server error. Could not retrieve the list of users.",
          },
        };
      }
    },
    async findById(id: string): Promise<Result<User> | null> {
      try {
        const getUser = await _db
          .select()
          .from(users)
          .where(eq(users.id, id))
          .get();
        if (!getUser) {
          return null;
        }
        return {
          ok: true,
          data: getUser,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Server error. Could not retrieve the user.",
          },
        };
      }
    },
    async update(id: string, username: string): Promise<Result<User> | null> {
      try {
        const updateUser = await _db
          .update(users)
          .set({ username: username })
          .where(eq(users.id, id))
          .returning()
          .get();
        if (!updateUser) {
          return null;
        }
        return {
          ok: true,
          data: updateUser,
          code: 201,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Server error. Could not update the user.",
          },
        };
      }
    },
    async delete(id: string): Promise<Result<void>> {
      try {
        const deleteUser = await _db.delete(users).where(eq(users.id, id));
        return {
          ok: true,
          data: deleteUser,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Server error. Could not delete the user.",
          },
        };
      }
    },
  };
}

export const userRepository = createUserRepository(db);
