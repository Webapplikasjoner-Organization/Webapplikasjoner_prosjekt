import { z } from "zod";

export const GameSchema = z.object({
  id: z.string().min(1, { message: "Id: is required " }),
  name: z.string().min(1, { message: "Title: is required " }),
  cover: z.object({
    id: z.string().min(1, { message: "Cover ID: is required " }),
    image_id: z.string().min(1, { message: "Cover Image ID: is required " }),
  }),
  genres: z.array(
    z.object({
      id: z.string().min(1, { message: "Genre ID: is required " }),
      name: z.string().min(1, { message: "Genre name: is required " }),
    }),
  ),
  rating: z.number().min(1, { message: "Rating: is required " }),
  releaseDate: z.date({ message: "Date: is required " }),
  summary: z.string().min(1, { message: "Description: is required " }),
});

export type Game = z.infer<typeof GameSchema>;

/*
export type Game = {
  readonly id: string,
  name: string,
  cover: string,
  genres: string,
  rating: number,
  releaseDate: Date,
  summary: string,
}
*/
