import z from "zod";

export const createUserSchema = z.object({
  email: z.string().min(1, { message: "Email cannot be empty." }).trim(),
  username: z
    .string()
    .min(1, { message: "Username cannot be empty." })
    .trim()
    .optional(),
  password: z.string().min(1, { message: "Password cannot be empty." }).trim(),
});

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email cannot be empty." }).trim(),
  username: z
    .string()
    .min(1, { message: "Username cannot be empty." })
    .trim()
    .optional(),
  password: z.string().min(1, { message: "Password cannot be empty." }).trim(),
});

export const updateUserSchema = z.object({
  id: z.string().min(1, { message: "Id is required." }),
  category: z.string().min(1, { message: "Category cannot be empty." }).trim(),
  newValue: z.string().min(1, { message: "New Value cannot be empty." }).trim(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
