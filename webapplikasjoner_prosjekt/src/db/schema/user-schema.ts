import { createId } from "@/lib/id";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  username: text().notNull(),
  password: text().notNull(),
});

export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;
export type UpdateUser = Partial<User>;
