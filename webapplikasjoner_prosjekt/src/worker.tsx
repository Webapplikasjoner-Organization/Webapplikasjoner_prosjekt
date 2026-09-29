import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { CreateUserPage } from "@/app/pages/CreateUserPage";
import { Home } from "./app/pages/Home";
import UserProfile from "./app/pages/UserProfile";
import ChangePasswordPage from "./app/pages/ChangePasswordPage";
import { createGameItemPage } from "./app/pages/GameItemPage";


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
    route("/game", createGameItemPage)
  ]),
]);

export default { fetch: app.fetch };
