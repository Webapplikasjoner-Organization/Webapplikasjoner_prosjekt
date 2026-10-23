"use client";

import { brandStyles } from "@/app/styles/brand-styles";

import type { FormState, LoginFormAction } from "@/features/users/actions";
import { useActionState } from "react";
import { navigate } from "rwsdk/client";

interface LoginFormProps {
  action: LoginFormAction;
}

export function LoginForm({ action }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: FormState, formData: FormData) => {
      const result = await action(prevState, formData);
      if (result?.ok) {
        await navigate(`/users/${encodeURIComponent(result?.data?.id)}`);
      }
      return result;
    },
    null,
  );

  const failed = state?.ok === false ? state : null;
  const usernameError = failed?.error?.fieldErrors?.username?.[0];
  const passwordError = failed?.error?.fieldErrors?.password?.[0];
  const hasFieldErrors = usernameError ?? passwordError;
  const success = state?.ok === true;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form action={formAction}>
        <div className="flex flex-col w-50 md:w-100">
          <label htmlFor="username" className="font-bold">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            defaultValue={failed ? failed?.values.username : ""}
            className="border p-2 rounded"
          ></input>
          <label htmlFor="password" className="font-bold">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue={failed ? failed?.values.password : ""}
            className="border p-2 rounded"
          ></input>
          <button
            type="submit"
            disabled={isPending}
            className={`${brandStyles.button} w-auto`}
          >
            {isPending ? "Logging in..." : "Log in"}
          </button>
          {usernameError && (
            <p id="username-error" className="text-red-500 text-center">
              {usernameError}
            </p>
          )}
          {passwordError && (
            <p id="password-error" className="text-red-500 text-center">
              {passwordError}
            </p>
          )}
          {failed && !hasFieldErrors && (
            <p role="alert" className="text-red-500 text-center">
              {failed?.error?.message}
            </p>
          )}
          {success && !hasFieldErrors && (
            <p role="alert" className="text-green-500 text-center">
              Logged in successfully!
            </p>
          )}
        </div>
      </form>
    </>
  );
}
