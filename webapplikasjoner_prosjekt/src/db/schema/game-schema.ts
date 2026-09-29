import { sqliteTable, text, int, integer } from "drizzle-orm/sqlite-core";

export const games = sqliteTable("games", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  boxArtImageURL: text().notNull().unique(),
  genres: text().notNull(),
  releaseDate: integer("releaseDate", { mode: "timestamp" }).notNull(),
  description: text().notNull(),
});

export type Game = typeof games.$inferSelect;