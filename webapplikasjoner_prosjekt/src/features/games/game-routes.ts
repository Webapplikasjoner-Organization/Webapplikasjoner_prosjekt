import { route } from "rwsdk/router";
import { gameController } from "./game-controller";
import { requireUser } from "@/features/auth/middleware";

export const gameRoutes = [
  route("/api/v1/games", {
    get: gameController.list,
    post: [requireUser, gameController.add],
  }),
  route("/api/v1/games/:id", {
    get: gameController.findById,
    delete: [requireUser, gameController.delete],
  }),
];
