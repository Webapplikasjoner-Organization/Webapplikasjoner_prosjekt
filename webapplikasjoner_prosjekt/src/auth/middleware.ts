// src/auth/middleware.ts
import type { RouteMiddleware } from "rwsdk/router";
import { auth, type Session } from "@/auth/auth";

declare module "rwsdk/worker" {
  interface DefaultAppContext {
    session: Session["session"] | null;
    user: Session["user"] | null;
  }
}

export const authMiddleware: RouteMiddleware = async ({ request, ctx }) => {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    ctx.session = session?.session ?? null;
    ctx.user = session?.user ?? null;
  } catch (error) {
    if (error instanceof ErrorResponse) throw error;
    // Ukjente feil — la requesten passere som anonym
    ctx.session = null;
    ctx.user = null;
  }
};
