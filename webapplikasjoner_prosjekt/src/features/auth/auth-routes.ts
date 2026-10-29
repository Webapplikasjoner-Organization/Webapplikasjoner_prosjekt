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

function logout() {
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/",
      "Set-Cookie": clearSessionCookie(),
    },
  });
}

export const authRoutes = [
  route("/login", { get: LoginPage, post: LoginPage }),
  route("/logout", { get: logout }),
  route("/users/:id", [requireUserPage, UserProfile]),
  route("/users/:id/change-password", [requireUserPage, ChangePasswordPage]),
  route("/users/:id/change-email", [requireUserPage, ChangeEmailPage]),
  route("/users/:id/delete-account", [requireUserPage, DeleteAccountPage]),
  route("/users/:id/my-games", [requireUserPage, MyGamesPage]),
];
