"use server";

import type { Result, ResultError } from "@/shared/result";
import type { UserDTO } from "@/features/users/user-mapper";
import { requestInfo } from "rwsdk/worker";
import { userService } from "@/features/users/user-service";

export type CreateUserFormState =
  | { ok: true; data: UserDTO }
  | {
      ok: false;
      error: {
        code: number;
        message: string;
        fieldErrors?: Record<string, string | string[]>;
      };
      values: CreateUserFormValues;
    }
  | null;
export type CreateUserFormValues = { username: string; password: string };

export type CreateUserFormAction = (
  prevState: CreateUserFormState,
  formData: FormData,
) => Promise<CreateUserFormState>;

export async function createUserAction(
  _prevState: CreateUserFormState,
  formData: FormData,
): Promise<CreateUserFormState> {
  const { ctx, request } = requestInfo;

  const values: CreateUserFormValues = {
    username: String(formData.get("username")),
    password: String(formData.get("password")),
  };

  const result = await userService.create({
    username: values.username,
    password: values.password,
  });

  return result.ok
    ? { ok: true, data: result.data }
    : { ok: false, error: result.error, values };
}
