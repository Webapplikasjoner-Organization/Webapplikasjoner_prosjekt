// src/features/auth/actions/auth.ts
"use server";

import { auth } from "@/auth/auth";
import { getRequestInfo } from "rwsdk/worker";
import { z } from "zod";
import { loginSchema } from "@/features/users/user-schema";

export async function login(
  _prev: {
    ok: boolean;
    error?: string;
    fieldErrors?: Record<string, string | string[]>;
  },
  formData: FormData,
) {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((i) => [i.path[0], i.message]),
      ),
    };
  }

  const { request, response } = getRequestInfo();

  try {
    const { headers } = await auth.api.signInUsername({
      body: parsed.data,
      headers: request.headers,
      returnHeaders: true,
    });
    // better-auth gir oss Set-Cookie-headerne tilbake. Vi må selv
    // kopiere dem over på svaret som går til nettleseren, ellers blir
    // ikke brukeren logget inn.
    for (const [key, value] of headers.entries()) {
      response.headers.append(key, value);
    }
    response.headers.set("Location", "/");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: "Invalid username or password" };
  }
}

export async function logout() {
  "use server";
  const { request, response } = getRequestInfo();
  const { headers } = await auth.api.signOut({
    headers: request.headers,
    returnHeaders: true,
  });
  // signOut setter en Set-Cookie som tømmer sesjonen. Vi kopierer den
  // over på svaret på samme måte som ved innlogging.
  for (const [key, value] of headers.entries()) {
    response.headers.append(key, value);
  }
  response.headers.set("Location", "/login");
  return { ok: true };
}
