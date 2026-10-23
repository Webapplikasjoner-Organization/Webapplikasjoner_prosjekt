"use client";

import type {
  CreateUserFormState,
  CreateUserFormAction,
} from "@/features/users/actions";
import { useActionState } from "react";

interface CreateUserFormProps {
  action: CreateUserFormAction;
}

export function CreateUserForm({ action }: CreateUserFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: CreateUserFormState, formData: FormData) => {
      return action(prevState, formData);
    },
    null,
  );

  const failed = state?.ok === false ? state : null;
  const usernameError = failed?.error?.fieldErrors?.username[0];
  const passwordError = failed?.error?.fieldErrors?.password[0];
  const hasFieldErrors = usernameError ?? passwordError;

  return (
    <form action={formAction}>
      <label htmlFor="username">Username:</label>
      <div>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={failed ? failed?.values.username : ""}
          className="border p-4 m-4 rounded-sm"
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue={failed ? failed?.values.password : ""}
          className="border p-4 m-4 rounded-sm"
        ></input>
        <button type="submit" disabled={isPending} className="border p-4 m-4 font-semibold text-brand-white rounded-sm bg-emerald-900 hover:opacity-90 active:scale-95 transition-all">
          {isPending ? "Creating Account..." : "Create Account"}
        
        </button>
        {usernameError && (
          <p id="username-error" className="text-red-500">
            {usernameError}
          </p>
        )}
        {passwordError && (
          <p id="password-error" className="text-red-500">
            {passwordError}
          </p>
        )}
        {failed && !hasFieldErrors && (
          <p role="alert" className="text-red-500">
            {failed?.error?.message}
          </p>
        )}
      </div>
    </form>
  );
}
