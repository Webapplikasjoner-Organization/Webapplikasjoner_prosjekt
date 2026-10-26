import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { userRoutes } from "@/features/users/user-routes";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { CreateUserPage } from "@/features/users/pages/CreateUserPage";
import { LoginPage } from "@/features/users/pages/LoginPage";
import { Home } from "@/app/pages/Home";
import { GamePage } from "./features/games/pages/GamePage";
import { UserProfile } from "./features/users/pages/UserProfile";
import { ChangePasswordPage } from "./features/users/pages/ChangePasswordPage";
import { ChangeUsernamePage } from "./features/users/pages/ChangeUsernamePage";
import { MyGamesPage } from "./features/users/pages/MyGamesPage";
import { DeleteAccountPage } from "./features/users/pages/DeleteAccountPage";
import { SearchResults } from "./features/games/pages/SearchResults";
import { ArticlesPage } from "./features/articles/pages/ArticlesPage";
import { ArticlePage } from "./features/articles/pages/ArticlePage";
import { env } from "cloudflare:workers";
import { seedData } from "./db/seed";
import { UsersPage } from "./features/users/pages/UsersPage";
import { auth } from "@/auth/auth";
import { requireUser } from "./shared/lib/guards";
/**
 * Alt som ligger på `ctx` for én forespørsel.
 *
 * Tom nå. Legger dere til `user` her, blir `ctx.user` typet i hele appen,
 * fordi types/rw.d.ts mater denne typen inn i rwsdk.
 */
export type AppContext = {};

const app = defineApp([
  // Middleware. Kjører for hver forespørsel, i rekkefølgen de står.
  setCommonHeaders(),
  ...userRoutes,

  ...(import.meta.env.VITE_IS_DEV_SERVER
    ? [
        route("/api/dev/seed", {
          post: async () => {
            await seedData(env);
            return Response.json({ ok: true });
          },
        }),
      ]
    : []),

  // API-rute. Ligger UTENFOR render(), så svaret er akkurat det handleren
  // returnerer: JSON, uten HTML-skall rundt.
  route("/api/status", () => Response.json({ status: "ok", version: "0.1.0" })),

  // Sider. render(Document, [...]) pakker dem i et helt HTML-dokument.
  render(Document, [
    route("/api/auth/*", async ({ request }) => auth.handler(request)),
    route("/", Home),
    route("/users", UsersPage),
    route("/create-user", CreateUserPage),
    route("/login", LoginPage),
    route("/users/:id", [
      () => {
        requireUser();
      },
      UserProfile,
    ]),
    route("/users/:id/change-password", [
      () => {
        requireUser();
      },
      ChangePasswordPage,
    ]),
    route("/users/:id/change-username", [
      () => {
        requireUser();
      },
      ChangeUsernamePage,
    ]),
    route("/users/:id/delete-account", [
      () => {
        requireUser();
      },
      DeleteAccountPage,
    ]),
    route("/users/:id/my-games", [
      () => {
        requireUser();
      },
      MyGamesPage,
    ]),
    route("/games/:id", GamePage),
    route("/search-results/:q", SearchResults),
    route("/articles", ArticlesPage),
    route("/articles/:id", ArticlePage),
  ]),
]);

export default { fetch: app.fetch };
