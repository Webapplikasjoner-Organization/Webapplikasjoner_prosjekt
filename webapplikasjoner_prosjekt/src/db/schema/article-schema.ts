import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text().notNull(),
  articleImageURL: text().notNull().unique(),
});

export type Article = typeof articles.$inferSelect;