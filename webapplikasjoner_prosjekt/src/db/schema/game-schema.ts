import { sqliteTable, text, int, integer } from "drizzle-orm/sqlite-core";

export const games = sqliteTable("games", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  cover: text(),
  platforms: text(),
  genres: text(),
  rating: int(),
  releaseDate: integer("releaseDate", { mode: "timestamp" }).notNull(),
  summary: text().notNull(),
  age_ratings: int(),
  storyline: text(),
  websites: text(),
});

export type Game = typeof games.$inferSelect;
