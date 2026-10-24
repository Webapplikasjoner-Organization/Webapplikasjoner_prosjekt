// src/shared/lib/guards.ts
import { navigate } from "rwsdk/client";
import { ErrorResponse, requestInfo } from "rwsdk/worker";

export function requireUser() {
  const { ctx } = requestInfo;
  if (!ctx.user) {
    throw new ErrorResponse(401, "User login required");
  }
  return ctx.user;
}

export function requireUserOwnership(id: string) {
  const user = requireUser();
  if (user?.id !== id) {
    throw new ErrorResponse(
      403,
      "User does not have the right to add, change or remove from other users",
    );
  }
  return user;
}

/*
Admin guard er ikke planlagt ennå.

export function requireAdmin() {
  const user = requireUser();
  if (user.role !== "admin") {
    throw new ErrorResponse(403, "Admin access only");
  }
  return user;
}
*/
