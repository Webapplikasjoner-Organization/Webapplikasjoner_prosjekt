import type { CreateUser, User } from "@/db/schema/user-schema";
import type { Result } from "@/shared/result";
import { userRepository, type UserRepository } from "./user-repository";
import { UserDTO } from "./user-mapper";
import { Params } from "@/utils/parse-params";

export interface UserService {
  create: (input: unknown) => Promise<Result<UserDTO>>;
  findMany: (params: Params) => Promise<Result<UserDTO[]>>;
  findById: (id: string) => Promise<Result<UserDTO> | null>;
  update: (id: string, input: unknown) => Promise<Result<UserDTO> | null>;
  delete: (id: string) => Promise<Result<void>>;
}

export function createUserService(_repository: UserRepository): UserService {
  return {
    async create(input: unknown): Promise<Result<UserDTO>> {
      _repository.create(input);
      return null;
    },
    async findMany(params: Params = {}): Promise<Result<UserDTO[]>> {
      _repository.findMany(params);
      return null;
    },
    async findById(id: string): Promise<Result<UserDTO> | null> {
      _repository.findById(id);
      return null;
    },
    async update(id: string, input: unknown): Promise<Result<UserDTO> | null> {
      _repository.update(id, input);
      return null;
    },
    async delete(id: string): Promise<Result<void>> {
      _repository.delete(id);
      return null;
    },
  };
}

export const userService = createUserService(userRepository);
