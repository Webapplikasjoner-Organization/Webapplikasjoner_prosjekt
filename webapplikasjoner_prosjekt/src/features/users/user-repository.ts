import { db, type DB } from "@/db";
import { User } from "@/db/schema/user-schema";
import type { CreateUser, UpdateUser } from "@/db/schema/user-schema";
import type { Result } from "@/shared/result";
import { users } from "@/db/schema/user-schema";
import { eq } from "drizzle-orm";

export interface UserRepository {
  createUser: (user: CreateUser) => Promise<Result<User>>;
  getUser: (id: string) => Promise<Result<User>>;
  updateUser: (id: string, username: string) => Promise<Result<User>>;
  deleteUser: (id: string) => Promise<Result<void>>;
}

export function createUserRepository(_db: DB): UserRepository {
  return {
    async createUser(user: CreateUser): Promise<Result<User>> {
      try {
        const createUser = await _db
          .insert(users)
          .values(user)
          .returning()
          .get();
        return {
          ok: true,
          data: createUser,
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
    async getUser(id: string): Promise<Result<User>> {
      try {
        const getUser = await _db
          .select()
          .from(users)
          .where(eq(users.id, Number(id)))
          .get();
        if (!getUser) {
          return {
            ok: false,
            error: {
              code: 404,
              message: `A user with the ID ${id} was not found.`,
            },
          };
        }
        return {
          ok: true,
          data: getUser,
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
    async updateUser(id: string, username: string): Promise<Result<User>> {
      try {
        const updateUser = await _db
          .update(users)
          .set({ username })
          .where(eq(users.id, Number(id)))
          .returning()
          .get();
        if (!updateUser) {
          return {
            ok: false,
            error: {
              code: 404,
              message: `A user with the ID ${id} was not found.`,
            },
          };
        }
        return {
          ok: true,
          data: updateUser,
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
    async deleteUser(id: string): Promise<Result<void>> {
      try {
        const deleteUser = await _db
          .delete(users)
          .where(eq(users.id, Number(id)));
        if (!deleteUser) {
          return {
            ok: false,
            error: {
              code: 404,
              message: `A user with the ID ${id} was not found.`,
            },
          };
        }
        return {
          ok: true,
          data: undefined,
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
