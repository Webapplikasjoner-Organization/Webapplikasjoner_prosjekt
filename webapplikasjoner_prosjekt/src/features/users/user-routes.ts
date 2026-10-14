import { route } from "rwsdk/router";
import { userController } from "./user-controller";

export const userRoutes = [
  route("/api/v1/users", {
    get: userController.findMany,
    post: userController.create,
  }),
  route("/api/v1/users/:id", {
    get: userController.findById,
    put: userController.update,
    delete: userController.delete,
  }),
];
