import { sqliteTable, text, int, integer } from "drizzle-orm/sqlite-core";

export const games = sqliteTable("games", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  cover: text(),
  genres: text().notNull(),
  rating: int().notNull(),
  releaseDate: integer("releaseDate", { mode: "timestamp" }).notNull(),
  summary: text().notNull(),
});

export type Game = typeof games.$inferSelect;
