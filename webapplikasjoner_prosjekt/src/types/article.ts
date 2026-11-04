import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.string().min(1, {message: "Id: is required "}),
  title: z.string().min(1, {message: "Title: is required " }),
  content: z.string().min(1, {message: "Content: is required "}),
  articleImageURL: z.string().min(10, {message: "Image-URL: is required "}),
});

export type Article = z.infer<typeof ArticleSchema>;