import z from "zod";

export const createUserSchema = z.object({
  username: z.string().min(1, { message: "Username: is required " }),
  password: z.string().min(1, { message: "Password: is required " }),
});

export const updateUserSchema = z.object({
  id: z.string().min(1, { message: "Id: is required " }),
  category: z.string().min(1, { message: "Category: is required " }),
  newValue: z.string().min(1, { message: "New Value: is required " }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
