import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { CreateUserPage } from "@/features/users/pages/CreateUserPage";
import { Home } from "./app/pages/Home";
import GamePage from "./features/games/GamePage";
import UserProfile from "./features/users/pages/UserProfile";
import ChangePasswordPage from "./features/users/pages/ChangePasswordPage";
import MyGamesPage from "./app/pages/MyGamesPage";
import DeleteAccountPage from "./features/users/pages/DeleteAccountPage";
import SelectUser from "./features/users/pages/SelectUser";
import SearchResults from "./app/pages/SearchResults";
import ArticlesPage from "./features/articles/ArticlesPage";
import ArticlePage from "./features/articles/ArticlePage";

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

  // API-rute. Ligger UTENFOR render(), så svaret er akkurat det handleren
  // returnerer: JSON, uten HTML-skall rundt.
  route("/api/status", () =>
    Response.json({ status: "ok", version: "0.1.0" })
  ),

  // Sider. render(Document, [...]) pakker dem i et helt HTML-dokument.
  render(Document, [
    route("/", Home), 
    route("/create-user", CreateUserPage),
    route("/user-profile", UserProfile),
    route("/change-password", ChangePasswordPage),
    route("/my-games", MyGamesPage),
    route("/delete-account", DeleteAccountPage),
    route("/select-user", SelectUser),
    route("/games/:id", GamePage),
    route("/search-results/:query", SearchResults),
    route("/articles", ArticlesPage),
    route("/articles/:id", ArticlePage),
  ]),
]);

export default { fetch: app.fetch };
