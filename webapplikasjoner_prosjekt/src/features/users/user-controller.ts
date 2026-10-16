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
      const result = await _service.create();
      return null;
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
      const result = await _service.findById();
      return null;
    },
    async update({ request, ctx }: RequestInfo): Promise<Response> {
      const result = await _service.update();
      return null;
    },
    async delete({ request, ctx }: RequestInfo): Promise<Response> {
      const result = await _service.delete();
      return null;
    },
  };
}

export const userController = createUserController(userService);
