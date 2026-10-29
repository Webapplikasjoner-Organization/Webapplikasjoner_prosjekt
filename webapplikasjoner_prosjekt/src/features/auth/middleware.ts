// verifisere at vi er logget inn
// oppdatere ctx med nøvendig data

import type { RouteMiddleware } from "rwsdk/router";
import { db } from "@/db";
import { readSessionUserId } from "./session";
import type { ResultError } from "@/shared/result";

export const requireUser: RouteMiddleware = ({ ctx }) => {
  if (!ctx.user) {
    return Response.json(
      {
        ok: false,
        error: {
          code: 401,
          message: "You must be logged in. Go to /login to log in.",
          fieldErrors: {},
        },
      },
      { status: 401 },
    );
  }
};

export const setUser: RouteMiddleware = async ({ ctx, request }) => {
  const userId = readSessionUserId(request);

  if (!userId) {
    ctx.user = null;
    return;
  }

  const user = await db.query.users.findFirst({
    where: { id: userId },
    columns: {
      id: true,
      username: true,
      email: true,
    },
  });

  ctx.user = user ?? null;
};

export const requireUserPage: RouteMiddleware = ({ ctx }) => {
  if (!ctx.user) {
    return new Response(null, { status: 302, headers: { Location: "/login" } });
  }
};
