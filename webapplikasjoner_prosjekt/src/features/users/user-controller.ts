import { User } from "@/db/schema/user-schema";
import type { CreateUser, UpdateUser } from "@/db/schema/user-schema";
import type { Result } from "@/shared/result";
import { userService, type UserService } from "./user-service";
import { RequestInfo } from "rwsdk/worker";
import { parseParams } from "@/utils/parse-params";

export interface UserController {
  create: (requestInfo: RequestInfo) => Promise<Response>;
  findMany: (requestInfo: RequestInfo) => Promise<Response>;
  findById: (requestInfo: RequestInfo) => Promise<Response>;
  update: (requestInfo: RequestInfo) => Promise<Response>;
  delete: (requestInfo: RequestInfo) => Promise<Response>;
}

export function createUserController(_service: UserService): UserController {
  return {
    async create({ request, ctx }: RequestInfo): Promise<Response> {
      const params = parseParams(request);
      const data = _service.create(params);
      return Response.json({
        ok: true,
        data,
      });
    },
    async findMany({ request, ctx }: RequestInfo): Promise<Response> {
      const data = _service.findMany();
      return null;
    },
    async findById({ request, ctx }: RequestInfo): Promise<Response> {
      const data = _service.findById();
      return null;
    },
    async update({ request, ctx }: RequestInfo): Promise<Response> {
      const data = _service.update();
      return null;
    },
    async delete({ request, ctx }: RequestInfo): Promise<Response> {
      const data = _service.delete();
      return null;
    },
  };
}

export const userController = createUserController(userService);
