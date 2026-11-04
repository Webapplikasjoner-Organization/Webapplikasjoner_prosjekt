/*Claude chat som forklarer tidligere feil med z object nesting: https://claude.ai/share/b9bcfa63-8997-4e41-b591-bdabbbd7a6f0*/

import { z } from "zod";
import { UserSettingsSchema } from "./settings";
import { GameSchema } from "./game";

export const UserSchema = z.object({
  id: z.string().min(1, { message: "Id: is required " }),
  email: z.string().min(1, { message: "Email: is required " }),
  username: z.string().min(1, { message: "Username: is required " }).optional(),
  password: z.string().min(1, { message: "Password: is required " }),
});

export type User = z.infer<typeof UserSchema>;

/*
export type User = {
  readonly id: string,
  email: string,
  username?: string,
  password: string,
}
*/
