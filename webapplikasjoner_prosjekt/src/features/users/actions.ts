"use server";

import type { Result, ResultData, ResultError } from "@/shared/result";
import type { UserDTO } from "@/features/users/user-mapper";
import { requestInfo } from "rwsdk/worker";
import { createSessionCookie } from "@/features/auth/session";
import { userService } from "@/features/users/user-service";
import { loginSchema, createUserSchema } from "./user-schema";

export type FormState =
  | ResultData<UserDTO>
  | (ResultError & { values: FormValues })
  | null;
export type FormValues = { email: string; username?: string; password: string };

export type CreateUserFormAction = (
  prevState: FormState,
  formData: FormData,
) => Promise<FormState>;

export async function createUserAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const values: FormValues = {
      email: String(formData.get("email")) as string,
      username: String(formData.get("username")) as string,
      password: String(formData.get("password")) as string,
    };

    const validation = createUserSchema.safeParse(values);

    if (!validation.success) {
      return {
        ok: false,
        error: {
          code: 400,
          message: "Input fields cannot be empty.",
        },
        values,
      };
    }

    const result = await userService.create({
      email: values.email,
      username: values.username,
      password: values.password,
    });

    if (!result.ok) {
      return { ok: false, error: result.error, values };
    }

    requestInfo.response.headers.append(
      "Set-Cookie",
      createSessionCookie(result.data.id),
    );

    return { ok: true, data: result.data, code: 201 };
  } catch (error) {
    return {
      ok: false,
      error: {
        code: 500,
        message: "An unexpected error occurred while trying to create a user.",
      },
      values: {
        email: String(formData.get("email")),
        username: String(formData.get("username")),
        password: String(formData.get("password")),
      },
    };
  }
}

export type LoginFormAction = (
  prevState: FormState,
  formData: FormData,
) => Promise<FormState>;

export async function loginAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const values: FormValues = {
      email: String(formData.get("email")) as string,
      username: String(formData.get("username")) as string,
      password: String(formData.get("password")) as string,
    };

    const validation = loginSchema.safeParse(values);

    if (!validation.success) {
      return {
        ok: false,
        error: {
          code: 400,
          message: "Input fields cannot be empty.",
        },
        values,
      };
    }

    const result = await userService.findByEmail(values.email);

    if (result === null) {
      return {
        ok: false,
        error: {
          code: 404,
          message: "No user could be found with this information.",
        },
        values,
      };
    }

    if (!result.ok) {
      return { ok: false, error: result.error, values };
    }

    requestInfo.response.headers.append(
      "Set-Cookie",
      createSessionCookie(result.data.id),
    );

    return { ok: true, data: result.data, code: 200 };
  } catch (error) {
    return {
      ok: false,
      error: {
        code: 500,
        message: "An unexpected error occurred while trying to login.",
      },
      values: {
        email: String(formData.get("email")),
        username: String(formData.get("username")),
        password: String(formData.get("password")),
      },
    };
  }
}
