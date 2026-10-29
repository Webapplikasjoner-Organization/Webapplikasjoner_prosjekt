import { route } from "rwsdk/router";
import { userController } from "./user-controller";
import { requireUser } from "@/features/auth/middleware";

export const userRoutes = [
  route("/api/v1/users", {
    get: userController.list,
    post: userController.create,
  }),
  route("/api/v1/users/:id", {
    get: userController.findById,
    patch: [requireUser, userController.update],
    delete: [requireUser, userController.delete],
  }),
];
