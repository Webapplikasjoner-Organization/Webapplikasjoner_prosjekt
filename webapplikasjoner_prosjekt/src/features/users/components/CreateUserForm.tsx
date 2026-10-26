"use client";

import { brandStyles } from "@/app/styles/brand-styles";

import type { FormState, CreateUserFormAction } from "@/features/users/actions";
import { useActionState } from "react";
import { navigate } from "rwsdk/client";

interface CreateUserFormProps {
  action: CreateUserFormAction;
}

export function CreateUserForm({ action }: CreateUserFormProps) {
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
  const emailError = failed?.error?.fieldErrors?.email?.[0];
  const usernameError = failed?.error?.fieldErrors?.username?.[0];
  const passwordError = failed?.error?.fieldErrors?.password?.[0];
  const hasFieldErrors = emailError ?? usernameError ?? passwordError;
  const success = state?.ok === true;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
      <form action={formAction}>
        <div className="flex flex-col w-50 md:w-100">
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={failed ? failed?.values.email : ""}
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
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
          {emailError && (
            <p id="email-error" className="text-red-500 text-center">
              {emailError}
            </p>
          )}
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
              Account created successfully!
            </p>
          )}
        </div>
      </form>
    </>
  );
}
