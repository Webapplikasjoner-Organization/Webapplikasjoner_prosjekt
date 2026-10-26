import {
  createUserSchema,
  updateUserSchema,
} from "@/features/users/user-schema";
import { z } from "zod";
import { toUserDTO } from "./user-mapper";
import type { Result } from "@/shared/result";
import { userRepository, type UserRepository } from "./user-repository";
import { UserDTO } from "./user-mapper";
import { Params } from "@/utils/parse-params";
import { validateListParams } from "@/features/users/utils/validate-list-params";
import { validateUser } from "@/features/users/utils/validateUser";
export interface UserService {
  create: (input: unknown) => Promise<Result<UserDTO>>;
  list: (params?: Params) => Promise<Result<UserDTO[]>>;
  findById: (input: unknown) => Promise<Result<UserDTO> | null>;
  findByEmail: (input: unknown) => Promise<Result<UserDTO> | null>;
  findByUsername: (input: unknown) => Promise<Result<UserDTO> | null>;
  update: (input: unknown) => Promise<Result<void> | null>;
  delete: (input: unknown) => Promise<Result<void> | null>;
}

export function createUserService(_repository: UserRepository): UserService {
  return {
    async create(input: unknown): Promise<Result<UserDTO>> {
      const parsed = createUserSchema.safeParse(input);
      if (!parsed.success)
        return {
          ok: false,
          error: {
            code: 400,
            message: "Username and password fields cannot be empty.",
            fieldErrors: z.flattenError(parsed.error).fieldErrors,
          },
        };
      if (Object.keys(parsed.data).length === 0) {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Input is empty.",
          },
        };
      }
      const rule = validateUser(parsed.data);
      if (!rule.ok) {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Invalid input",
            fieldErrors: {
              [rule.field]: [rule.error],
            },
          },
        };
      }
      const result = await _repository.create(parsed.data);
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
    async findById(input: unknown): Promise<Result<UserDTO> | null> {
      // user-id er streng så isNaN sjekken vil feile
      // if (typeof input !== "string" || isNaN(Number(input))) {
      //   return {
      //     ok: false,
      //     error: {
      //       code: 400,
      //       message: "Id must be a string that can be represented as a number.",
      //     },
      //   };
      // }
      if (typeof input !== "string") {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Id must be a string.",
          },
        };
      }
      const result = await _repository.findById(input);
      if (result === null) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "User could not be found.",
          },
        };
      }
      if (!result.ok) {
        return result;
      }
      if (!result.data) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "User could not be found.",
          },
        };
      }
      return {
        ok: true,
        data: toUserDTO(result.data),
        code: 200,
      };
    },
    async findByEmail(input: unknown): Promise<Result<UserDTO> | null> {
      if (typeof input !== "string") {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Email must be a string.",
          },
        };
      }
      if (input.trim() === "") {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Email cannot be an empty string.",
          },
        };
      }
      const result = await _repository.findByEmail(input);
      if (result === null) {
        return {
          ok: false,
          error: {
            code: 404,
            message: `A user with the email ${input} could not be found.`,
          },
        };
      }
      if (!result.ok) {
        return result;
      }
      if (!result.data) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "User could not be found.",
          },
        };
      }
      return {
        ok: true,
        data: toUserDTO(result.data),
        code: 200,
      };
    },
    async findByUsername(input: unknown): Promise<Result<UserDTO> | null> {
      if (typeof input !== "string") {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Username must be a string.",
          },
        };
      }
      if (input.trim() === "") {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Username cannot be an empty string.",
          },
        };
      }
      const result = await _repository.findByUsername(input);
      if (result === null) {
        return {
          ok: false,
          error: {
            code: 404,
            message: `A user with the username ${input} could not be found.`,
          },
        };
      }
      if (!result.ok) {
        return result;
      }
      if (!result.data) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "User could not be found.",
          },
        };
      }
      return {
        ok: true,
        data: toUserDTO(result.data),
        code: 200,
      };
    },
    async update(input: unknown): Promise<Result<void> | null> {
      const parsed = updateUserSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Invalid input for updating a user.",
            fieldErrors: z.flattenError(parsed.error).fieldErrors,
          },
        };
      }
      if (Object.keys(parsed.data).length === 0) {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Input is empty.",
          },
        };
      }
      const { id, category, newValue } = parsed.data;
      const foundUser = await _repository.findById(id);
      if (!foundUser) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "User could not be found.",
          },
        };
      }
      if (!foundUser?.ok) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "User could not be found.",
          },
        };
      }
      const rule = validateUser(foundUser?.data);
      if (!rule.ok) {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Invalid input",
            fieldErrors: {
              [rule.field]: [rule.error],
            },
          },
        };
      }
      const result = await _repository.update(id, category, newValue);
      if (result === null) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "User could not be found.",
          },
        };
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
    async delete(input: unknown): Promise<Result<void> | null> {
      if (typeof input !== "string") {
        return {
          ok: false,
          error: {
            code: 400,
            message: "Id must be a string.",
          },
        };
      }
      const foundUser = await _repository.findById(input);
      if (!foundUser) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "User could not be found.",
          },
        };
      }
      const result = await _repository.delete(input);
      if (result === null) {
        return {
          ok: false,
          error: {
            code: 404,
            message: "User could not be found.",
          },
        };
      }
      if (!result.ok) {
        return result;
      }
      return {
        ok: true,
        data: result.data,
        code: 204,
      };
    },
  };
}

export const userService = createUserService(userRepository);
