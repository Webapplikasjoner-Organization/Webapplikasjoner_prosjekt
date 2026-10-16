import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { userRoutes } from "@/features/users/user-routes";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { CreateUserPage } from "@/app/pages/CreateUserPage";
import { Home } from "./app/pages/Home";
import GamePage from "./app/pages/GamePage";
import UserProfile from "./app/pages/UserProfile";
import ChangePasswordPage from "./app/pages/ChangePasswordPage";
import MyGamesPage from "./app/pages/MyGamesPage";
import DeleteAccountPage from "./app/pages/DeleteAccountPage";
import SelectUser from "./app/pages/SelectUser";
import SearchResults from "./app/pages/SearchResults";
import ArticlesPage from "./app/pages/ArticlesPage";
import ArticlePage from "./app/pages/ArticlePage";
import { env } from "cloudflare:workers";
import { seedData } from "./db/seed";
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
    route("/", Home),
    route("/create-user", CreateUserPage),
    route("/users/:username", UserProfile),
    route("/users/:username/change-password", ChangePasswordPage),
    route("/my-games", MyGamesPage),
    route("/users/:username/delete-account", DeleteAccountPage),
    route("/select-user", SelectUser),
    route("/games/:id", GamePage),
    route("/search-results/:query", SearchResults),
    route("/articles", ArticlesPage),
    route("/articles/:id", ArticlePage),
  ]),
]);

export default { fetch: app.fetch };
