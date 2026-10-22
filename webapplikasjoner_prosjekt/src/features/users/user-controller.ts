import { userService, type UserService } from "./user-service";
import { RequestInfo } from "rwsdk/worker";
import { parseParams } from "@/utils/parse-params";
export interface UserController {
  create: (requestInfo: RequestInfo) => Promise<Response>;
  list: (requestInfo: RequestInfo) => Promise<Response>;
  findById: (requestInfo: RequestInfo) => Promise<Response>;
  findByUsername: (requestInfo: RequestInfo) => Promise<Response>;
  update: (requestInfo: RequestInfo) => Promise<Response>;
  delete: (requestInfo: RequestInfo) => Promise<Response>;
}

export function createUserController(_service: UserService): UserController {
  return {
    async create({ request, ctx }: RequestInfo): Promise<Response> {
      let body: unknown;
      try {
        body = await request.json();
      } catch (error) {
        return Response.json({
          ok: false,
          error: {
            code: 400,
            message: "Body must be in JSON format.",
          },
        });
      }
      const result = await _service.create(body);
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return Response.json({
        ok: true,
        data: result.data,
        code: 201,
      });
    },
    async list({ request, ctx }: RequestInfo): Promise<Response> {
      const params = parseParams(request);
      const result = await _service.list(params);
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return Response.json({
        ok: true,
        data: result.data,
        code: 200,
      });
    },
    async findById({ request, ctx, params }: RequestInfo): Promise<Response> {
      // let body: unknown;
      // try {
      //   body = await request.json();
      // } catch (error) {
      //   return Response.json({
      //     ok: false,
      //     error: {
      //       code: 400,
      //       message: "Body must be in JSON format.",
      //     },
      //   });
      // }
      // Kan hente ut params direkte ellers må det sendes som body i findUserById og vi må bruke POST
      const { id } = params;
      console.log("ID", id);
      const result = await _service.findById(id);
      if (result === null) {
        return Response.json({
          ok: false,
          error: {
            code: 404,
            message: `User with the id: ${id} was not found.`,
          },
        });
      }
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return Response.json({
        ok: true,
        data: result.data,
        code: 200,
      });
    },
    async findByUsername({
      request,
      ctx,
      params,
    }: RequestInfo): Promise<Response> {
      const { username } = params;
      const result = await _service.findByUsername(username);
      if (result === null) {
        return Response.json({
          ok: false,
          error: {
            code: 404,
            message: `User with the username: ${username} was not found.`,
          },
        });
      }
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return Response.json({
        ok: true,
        data: result.data,
        code: 200,
      });
    },
    async update({ request, ctx }: RequestInfo): Promise<Response> {
      let body: unknown;
      try {
        body = await request.json();
      } catch (error) {
        return Response.json({
          ok: false,
          error: {
            code: 400,
            message: "Body must be in JSON format.",
          },
        });
      }
      const result = await _service.update(body);
      if (result === null) {
        return Response.json({
          ok: false,
          error: {
            code: 404,
            message: `User with the id: ${body} was not found.`,
          },
        });
      }
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return Response.json({
        ok: true,
        data: result.data,
        code: 200,
      });
    },
    async delete({ request, ctx }: RequestInfo): Promise<Response> {
      let body: unknown;
      try {
        body = await request.json();
      } catch (error) {
        return Response.json({
          ok: false,
          error: {
            code: 400,
            message: "Body must be in JSON format.",
          },
        });
      }
      const result = await _service.delete(body);
      if (result === null) {
        return Response.json({
          ok: false,
          error: {
            code: 404,
            message: `User with the id: ${body} was not found.`,
          },
        });
      }
      if (!result.ok) {
        return Response.json({
          ok: false,
          error: result.error,
        });
      }
      return Response.json({
        ok: true,
        data: result.data,
        code: 200,
      });
    },
  };
}

export const userController = createUserController(userService);
