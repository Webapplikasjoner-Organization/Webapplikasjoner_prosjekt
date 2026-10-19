import { userService, type UserService } from "./user-service";
import { RequestInfo } from "rwsdk/worker";
import { parseParams } from "@/utils/parse-params";
export interface UserController {
  create: (requestInfo: RequestInfo) => Promise<Response>;
  list: (requestInfo: RequestInfo) => Promise<Response>;
  findById: (requestInfo: RequestInfo) => Promise<Response>;
  update: (requestInfo: RequestInfo) => Promise<Response>;
  delete: (requestInfo: RequestInfo) => Promise<Response>;
}

export function createUserController(_service: UserService): UserController {
  return {
    async create({ request, ctx }: RequestInfo): Promise<Response> {
      const body = await request.json();
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
    async findById({ request, ctx }: RequestInfo): Promise<Response> {
      const body = await request.json();
      const result = await _service.findById(body);
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
    async update({ request, ctx }: RequestInfo): Promise<Response> {
      const body = await request.json();
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
      const body = await request.json();
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
