import { User } from "@/db/schema/user-schema";

export type UserDTO = {
  id: string;
  username: string;
  password: string;
};

export function toUserDTO(user: User): UserDTO {
  const { id, username, password } = user;
  return {
    id,
    username,
    password,
  };
}
