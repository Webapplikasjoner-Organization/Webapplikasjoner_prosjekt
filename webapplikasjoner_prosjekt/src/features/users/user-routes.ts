import { route } from "rwsdk/router";
import { userController } from "./user-controller";

export const userRoutes = [
  route("/api/v1/users", {
    get: userController.list,
    post: userController.create,
  }),
  route("/api/v1/users/:id", {
    get: userController.findById,
    patch: [
      //Require authentication and authorization
      userController.update,
    ],
    delete: [
      //Require authentication and authorization
      userController.delete,
    ],
  }),
];
