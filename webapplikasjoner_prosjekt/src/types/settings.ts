import { z } from "zod";

export const UserSettingsSchema = z.object({
  settings: z.array(z.string({message: "At least 1 settings option: is required "})),
})

export type UserSettings = z.infer<typeof UserSettingsSchema>;

/*
export type userSettings = {
  settings: string[],
}
*/