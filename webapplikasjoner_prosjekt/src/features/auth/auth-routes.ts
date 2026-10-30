// Her kobler jeg opp ulike routes som jeg skal kunne bruk
// eks login, logout, register
// og metodene som jeg skal kunne bruke til dette

import { clearSessionCookie } from "@/features/auth/session";
import { LoginPage } from "@/features/users/pages/LoginPage";
import { UserProfile } from "@/features/users/pages/UserProfile";
import { route } from "rwsdk/router";
import { requireUserPage } from "@/features/auth/middleware";
import { ChangePasswordPage } from "@/features/users/pages/ChangePasswordPage";
import { ChangeEmailPage } from "@/features/users/pages/ChangeEmailPage";
import { DeleteAccountPage } from "@/features/users/pages/DeleteAccountPage";
import { MyGamesPage } from "@/features/users/pages/MyGamesPage";
import { userService } from "@/features/users/user-service";
import type { RouteMiddleware } from "rwsdk/router";

function logout() {
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/",
      "Set-Cookie": clearSessionCookie(),
    },
  });
}

/*
const changeEmail: RouteMiddleware = async ({ ctx }) => {
  if (!ctx.user) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/login",
      },
    });
  }

  await userService.update({
    id: ctx.user.id,
    field: "email",
    value: newEmail,
  });

  return new Response(null, {
    status: 303,
    headers: {
      Location: `/users/${encodeURIComponent(ctx.user.id)}`,
    },
  });
};

const changePassword: RouteMiddleware = async ({ ctx }) => {
  if (!ctx.user) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/login",
      },
    });
  }

  await userService.update({
    id: ctx.user.id,
    field: "password",
    value: newPassword,
  });

  return new Response(null, {
    status: 303,
    headers: {
      Location: `/users/${encodeURIComponent(ctx.user.id)}`,
    },
  });
};
*/

const deleteAccount: RouteMiddleware = async ({ ctx }) => {
  if (!ctx.user) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/login",
      },
    });
  }

  await userService.delete(ctx.user.id);
  ctx.user = null;

  return new Response(null, {
    status: 303,
    headers: {
      Location: "/login",
      "Set-Cookie": clearSessionCookie(),
    },
  });
};

export const authRoutes = [
  route("/login", { get: LoginPage, post: LoginPage }),
  route("/logout", { get: logout }),
  // route("/change-email", { post: changeEmail }),
  // route("/change-password", { post: changePassword }),
  route("/delete", { post: deleteAccount }),
  route("/users/:id", [requireUserPage, UserProfile]),
  route("/users/:id/change-email", [requireUserPage, ChangeEmailPage]),
  route("/users/:id/change-password", [requireUserPage, ChangePasswordPage]),
  route("/users/:id/delete-account", [requireUserPage, DeleteAccountPage]),
  route("/users/:id/my-games", [requireUserPage, MyGamesPage]),
];
