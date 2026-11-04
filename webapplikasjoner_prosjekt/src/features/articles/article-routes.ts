import { route } from "rwsdk/router";
import { articleController } from "./article-controller";

export const articleRoutes = [
  route("/api/v1/articles", {
    get: async () => {
      const result = await articleController.listAll();
      return Response.json(result);
    },
  }),
  route("/api/v1/articles/:id", {
    get: async ({ params }) => {
      const result = await articleController.getById(params.id);
      return Response.json(result);
    },
  }),
];
