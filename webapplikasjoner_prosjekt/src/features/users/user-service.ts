import type { CreateUser, User, UpdateUser } from "@/db/schema/user-schema";
import { toUserDTO } from "./user-mapper";
import type { Result } from "@/shared/result";
import { userRepository, type UserRepository } from "./user-repository";
import { UserDTO } from "./user-mapper";
import { Params } from "@/utils/parse-params";
import { validateListParams } from "@/utils/validate-list-params";

export interface UserService {
  create: (input: CreateUser) => Promise<Result<UserDTO>>;
  list: (params: Params) => Promise<Result<UserDTO[]>>;
  findById: (id: string) => Promise<Result<UserDTO> | null>;
  update: (id: string, input: string) => Promise<Result<UserDTO> | null>;
  delete: (id: string) => Promise<Result<void> | null>;
}

export function createUserService(_repository: UserRepository): UserService {
  return {
    async create(input: CreateUser): Promise<Result<UserDTO>> {
      const result = await _repository.create(input);
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: toUserDTO(result.data),
        code: 201,
      };
    },
    async list(params: Params = {}): Promise<Result<UserDTO[]>> {
      const paramsValidationResult = validateListParams(params);
      if (!paramsValidationResult.ok) {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Invalid list parameters.",
            fieldErrors: {
              [paramsValidationResult.field]: [paramsValidationResult.errors],
            },
          },
        };
      }
      const result = await _repository.findMany(paramsValidationResult.params);
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: result.data.map(toUserDTO),
        code: 200,
      };
    },
    async findById(id: string): Promise<Result<UserDTO> | null> {
      const result = await _repository.findById(id);
      if (result === null) {
        return null;
      }
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: toUserDTO(result.data),
        code: 200,
      };
    },
    async update(id: string, input: string): Promise<Result<UserDTO> | null> {
      const result = await _repository.update(id, input);
      if (result === null) {
        return null;
      }
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: toUserDTO(result.data),
        code: 201,
      };
    },
    async delete(id: string): Promise<Result<void> | null> {
      const result = await _repository.delete(id);
      if (result === null) {
        return null;
      }
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: undefined,
        code: 200,
      };
    },
  };
}

export const userService = createUserService(userRepository);
