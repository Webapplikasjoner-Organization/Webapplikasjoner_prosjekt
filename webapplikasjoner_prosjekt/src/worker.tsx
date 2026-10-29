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
import { ChangeEmailPage } from "./features/users/pages/ChangeEmailPage";
import { MyGamesPage } from "./features/users/pages/MyGamesPage";
import { DeleteAccountPage } from "./features/users/pages/DeleteAccountPage";
import { SearchResults } from "./features/games/pages/SearchResults";
import { ArticlesPage } from "./features/articles/pages/ArticlesPage";
import { ArticlePage } from "./features/articles/pages/ArticlePage";
import { env } from "cloudflare:workers";
import { seedData } from "./db/seed";
import { UsersPage } from "./features/users/pages/UsersPage";
import { requireUser, setUser } from "./features/auth/middleware";
import { SessionUser } from "./features/auth/auth-types";
import { LogoutPage } from "./features/users/pages/LogoutPage";
import { authRoutes } from "./features/auth/auth-routes";
/**
 * Alt som ligger på `ctx` for én forespørsel.
 *
 * Tom nå. Legger dere til `user` her, blir `ctx.user` typet i hele appen,
 * fordi types/rw.d.ts mater denne typen inn i rwsdk.
 */
export type AppContext = {
  user: SessionUser | null;
};

const app = defineApp([
  // Middleware. Kjører for hver forespørsel, i rekkefølgen de står.
  setCommonHeaders(),
  setUser,
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
    route("/", Home),
    route("/users", UsersPage),
    route("/create-user", CreateUserPage),
    route("/games/:id", GamePage),
    route("/search-results/:q", SearchResults),
    route("/articles", ArticlesPage),
    route("/articles/:id", ArticlePage),
    ...authRoutes,
  ]),
]);

export default { fetch: app.fetch };
