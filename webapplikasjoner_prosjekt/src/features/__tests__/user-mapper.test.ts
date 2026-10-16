import { describe, it, expect } from "vitest";
import { type User } from "@/db/schema/user-schema";
import { toUserDTO, type UserDTO } from "@/features/users/user-mapper";

const user: User = {
  id: "1",
  username: "John Doe",
  password: "badpassword",
};

describe("toUserDTO", () => {
  it("Convert User to UserDTO", () => {
    const userDTO = toUserDTO(user);
    expect(userDTO).toHaveProperty("id", user.id);
    expect(userDTO).toHaveProperty("username", user.username);
  });
});
