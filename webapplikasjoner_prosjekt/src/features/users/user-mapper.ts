import { User } from "@/db/schema/user-schema";

export type UserDTO = {
  id: string;
  email: string;
  username?: string;
  password: string;
};

export function toUserDTO(user: User): UserDTO {
  const { id, email, username, password } = user;
  if (!username) {
    return {
      id,
      email,
      password,
    };
  }
  return {
    id,
    email,
    username,
    password,
  };
}
