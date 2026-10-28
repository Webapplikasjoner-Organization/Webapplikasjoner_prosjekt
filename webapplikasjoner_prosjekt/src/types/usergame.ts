import { z } from "zod";

export const UserGameSchema = z.object({
  id: z.string().min(1),
  userid: z.string().min(1),
  gameid: z.string().min(1),
});

export type UserGame = z.infer<typeof UserGameSchema>;
