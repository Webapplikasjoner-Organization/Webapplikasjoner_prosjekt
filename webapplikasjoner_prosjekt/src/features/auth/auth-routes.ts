// Her kobler jeg opp ulike routes som jeg skal kunne bruk
// eks login, logout, register
// og metodene som jeg skal kunne bruke til dette

import {
  clearSessionCookie,
  clearRandomNumbersCookie,
  clearGameIDsCookie,
} from "@/features/auth/session";
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
import { getRandomNumbers } from "./middleware";
import { Footer } from "@/components/Footer";
import { RequestInfo } from "rwsdk/worker";
import { UserDTO } from "../users/user-mapper";
import type { Result } from "@/shared/result";

function createLogoutHeaders(location: string): Headers {
  const headers = new Headers({ Location: location });
  headers.append("Set-Cookie", clearSessionCookie());
  headers.append("Set-Cookie", clearRandomNumbersCookie());
  headers.append("Set-Cookie", clearGameIDsCookie());
  return headers;
}

//Kan bli brukt fra mobil, men brukes ikke her i web foreløpig.
async function login(input: unknown): Promise<Result<UserDTO>> {
  try {
    const response = await fetch(`/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      return {
        ok: false,
        error: {
          code: response.status,
          message: `Response not ok:${response.statusText}`,
        },
      };
    }
    const data = await response.json();
    return data as { ok: true; data: UserDTO; code: 200 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message: "Failed to login due to a server error.",
      },
    };
  }
}

function logout() {
  return new Response(null, {
    status: 303,
    headers: createLogoutHeaders("/"),
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
    headers: createLogoutHeaders("/login"),
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
