import { z } from "zod";

export const GameSchema = z.object({
  id: z.string().min(1, {message: "Id: is required "}),
  title: z.string().min(1, { message: "Title: is required " }),
  boxArtImageURL: z.string().min(10, {message: "Image-URL: is required "}),
  genres: z.array(z.string()).min(1, {message: "At least 1 genre: is required "}),
  releaseDate: z.date({message: "Date: is required "}),
  description: z.string().min(1, {message: "Description: is required "}),
});

export type Game = z.infer<typeof GameSchema>;

/*
export type Game = {
  readonly id: string,
  title: string,
  boxArtImageURL: string,
  genres: string[],
  releaseDate: Date
}
*/