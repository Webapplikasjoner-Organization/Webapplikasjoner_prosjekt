"use server";

import { db, type DB } from "@/db";
import type { CreateUser, UpdateUser, User } from "@/db/schema/user-schema";
import type { Result } from "@/shared/result";
import { users } from "@/db/schema/user-schema";
import { eq, desc } from "drizzle-orm";
import { type UserListParams } from "@/features/users/utils/validate-list-params";

export interface UserRepository {
  create: (user: CreateUser) => Promise<Result<User>>;
  findMany: (params?: UserListParams) => Promise<Result<User[]>>;
  findById: (id: string) => Promise<Result<User> | null>;
  login: (email: string, password: string) => Promise<Result<User> | null>;
  findByEmail: (email: string) => Promise<Result<User> | null>;
  findByUsername: (username: string) => Promise<Result<User> | null>;
  update: (
    id: string,
    category: string,
    newValue: string,
  ) => Promise<Result<void> | null>;
  delete: (id: string) => Promise<Result<void> | null>;
}

export function createUserRepository(_db: DB): UserRepository {
  return {
    async create(user: CreateUser): Promise<Result<User>> {
      try {
        const existingUserWithUsername = user.username
          ? await this.findByUsername(user.username)
          : null;
        const existingUserWithEmail = await this.findByEmail(user?.email);
        if (existingUserWithUsername !== null) {
          if (existingUserWithEmail !== null) {
            return {
              ok: false,
              error: {
                code: 409,
                message: "A user with this email or username already exists.",
              },
            };
          }
        }
        if (existingUserWithEmail !== null) {
          return {
            ok: false,
            error: {
              code: 409,
              message: "A user with this email already exists.",
            },
          };
        }
        const createdUser = await _db
          .insert(users)
          .values(user)
          .returning()
          .get();
        return {
          ok: true,
          data: createdUser,
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
    async findMany({ q, limit }: UserListParams = {}): Promise<Result<User[]>> {
      try {
        const rows = await _db.query.users.findMany({
          where: q
            ? {
                OR: [
                  { username: { like: `%${q}%` } },
                  { email: { like: `%${q}%` } },
                ],
              }
            : undefined,
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
    async login(email: string, password: string): Promise<Result<User> | null> {
      try {
        const getUser = await _db.query.users.findFirst({
          where: { email, password },
        });
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
            message: "Server error. Could not retrieve the user by login.",
          },
        };
      }
    },
    async findByEmail(email: string): Promise<Result<User> | null> {
      try {
        const getUser = await _db.query.users.findFirst({
          where: { email },
        });
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
            message: "Server error. Could not retrieve the user by email.",
          },
        };
      }
    },
    async findByUsername(username: string): Promise<Result<User> | null> {
      try {
        const getUser = await _db.query.users.findFirst({
          where: { username },
        });
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
            message: "Server error. Could not retrieve the user by username.",
          },
        };
      }
    },
    async update(
      id: string,
      category: string,
      newValue: string,
    ): Promise<Result<void> | null> {
      try {
        await _db
          .update(users)
          .set({ [category]: newValue })
          .where(eq(users.id, id))
          .returning()
          .get();
        return {
          ok: true,
          data: undefined,
          code: 200,
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
    async delete(id: string): Promise<Result<void> | null> {
      try {
        await _db.delete(users).where(eq(users.id, id));
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
            message: "Server error. Could not delete the user.",
          },
        };
      }
    },
  };
}

export const userRepository = createUserRepository(db);
