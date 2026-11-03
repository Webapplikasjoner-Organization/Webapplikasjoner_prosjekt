import z from "zod";

export const addGameSchema = z.object({
  userId: z.string().min(1),
  gameId: z.string().min(1),
});

export type AddGameInput = z.infer<typeof addGameSchema>;
