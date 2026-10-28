import { createId } from "@/lib/id";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { users } from "./user-schema";

export const usergames = sqliteTable("usergames", {
  id: text("id")
    .primaryKey()
    .$default(() => createId()),
  userid: text("userid")
    .notNull()
    .references(() => users.id),
  gameid: text("gameid").notNull(),
});

export type UserGame = typeof usergames.$inferSelect;
export type CreateUserGame = typeof usergames.$inferInsert;
export type UpdateUserGame = Partial<UserGame>;
