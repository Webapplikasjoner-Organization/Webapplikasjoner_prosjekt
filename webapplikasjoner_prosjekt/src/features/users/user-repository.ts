import { db, type DB } from "@/db";
import type { CreateUser, UpdateUser, User } from "@/db/schema/user-schema";
import type { Result } from "@/shared/result";
import { users } from "@/db/schema/user-schema";
import { eq, desc } from "drizzle-orm";

export interface UserRepository {
  create: (user: CreateUser) => Promise<Result<User>>;
  findMany: (params: any) => Promise<Result<User[]>>;
  findById: (id: string) => Promise<Result<User> | null>;
  update: (id: string, user: UpdateUser) => Promise<Result<User> | null>;
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
    async findMany(params: any): Promise<Result<User[]>> {
      try {
        const listUsers = await _db
          .select()
          .from(users)
          .orderBy(desc(users.username));
        return {
          ok: true,
          data: listUsers,
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
    async update(id: string, user: UpdateUser): Promise<Result<User> | null> {
      try {
        const updateUser = await _db
          .update(users)
          .set({ ...user })
          .where(eq(users.id, id))
          .returning()
          .get();
        if (!updateUser) {
          return null;
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
    async delete(id: string): Promise<Result<void>> {
      try {
        const deleteUser = await _db.delete(users).where(eq(users.id, id));
        return {
          ok: true,
          data: deleteUser,
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
