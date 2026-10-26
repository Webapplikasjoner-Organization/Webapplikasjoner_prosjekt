import { z } from "zod";

export const GameSchema = z.object({
  id: z.string().min(1, { message: "Id: is required " }),
  name: z.string().min(1, { message: "Title: is required " }),
  cover: z.object({
    id: z.string().min(1, { message: "Cover ID: is required " }),
    image_id: z.string().min(1, { message: "Cover Image ID: is required " }),
  }),
  platforms: z.array(
    z.object({
      id: z.string().min(1, { message: "Platform ID: is required " }),
      name: z.string().min(1, { message: "Platform name: is required " }),
    }),
  ),
  genres: z.array(
    z.object({
      id: z.string().min(1, { message: "Genre ID: is required " }),
      name: z.string().min(1, { message: "Genre name: is required " }),
    }),
  ),
  rating: z.number().min(1, { message: "Rating: is required " }),
  release_dates: z.array(
    z.object({
      id: z.string().min(1, { message: "Release Date ID: is required " }),
      human: z.date({ message: "Release Date: is required " }),
    }),
  ),
  summary: z.string().min(1, { message: "Description: is required " }),
  age_ratings: z
    .array(
      z.object({
        id: z.number().min(1, { message: "Age Rating ID: is required " }),
        rating_category: z.object({
          id: z
            .number()
            .min(1, { message: "Age Rating Category ID: is required " }),
          rating: z.string().min(1, { message: "Age Rating: is required " }),
        }),
      }),
    )
    .optional(),
  storyline: z.string().optional(),
  websites: z
    .array(
      z.object({
        id: z.number().min(1, { message: "Website ID: is required " }),
        url: z.string().min(1, { message: "Website URL: is required " }),
      }),
    )
    .optional(),
});

export type Game = z.infer<typeof GameSchema>;

/*
export type Game = {
  readonly id: string,
  name: string,
  cover: {
    id: string,
    image_id: string,
  },
  platforms: {
    id: string,
    name: string,
  }[],
  genres: {
    id: string,
    name: string,
  }[],
  rating: number,
  release_dates: {
    id: string,
    human: Date,
  }[],
  summary: string,
  age_ratings: {
    id: number,
    rating_category: {
      id: number,
      rating: string,
    },
  }[],
  storyline?: string,
  websites?: {
    id: number,
    url: string,
  }[]
}
*/
