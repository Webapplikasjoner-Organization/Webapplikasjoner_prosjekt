import { beforeEach, describe, it, expect } from "vitest";
import { relations } from "@/db/relations";
import { createUserService, UserService } from "@/features/users/user-service";
import { createUserRepository } from "@/features/users/user-repository";
import Database from "better-sqlite3";
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { users } from "@/db/schema";

let db: BetterSQLite3Database<typeof relations>;
let service: UserService;

beforeEach(async () => {
  const sqLite = new Database(":memory:");
  db = drizzle({ client: sqLite, relations });
  migrate(db, { migrationsFolder: "./drizzle/migrations" });
  await db.insert(users).values([
    {
      id: "1",
      username: "testuser1",
      email: "testuser1@example.com",
      password: "testpassword1",
    },
    {
      id: "2",
      username: "testuser2",
      email: "testuser2@example.com",
      password: "testpassword2",
    },
    {
      id: "3",
      username: "testuser3",
      email: "testuser3@example.com",
      password: "testpassword3",
    },
  ]);
  service = createUserService(createUserRepository(db));
});

describe("userService.create", () => {
  it("Creates a new user", async () => {
    const result = await service.create({
      email: "newuser@example.com",
      password: "newpassword",
    });
    if (!result.ok) {
      throw new Error("Failed to create user.");
    }
    expect(result.ok).toBe(true);
    const listOfUsers = await service.list();
    if (!listOfUsers.ok) {
      throw new Error("Failed to list users after creating a new user.");
    }
    expect(listOfUsers.data).toHaveLength(4);
    expect(result.data.email).toBe("newuser@example.com");
    expect(result.code).toBe(201);
  });
});

describe("userService.list", () => {
  it("Lists all users", async () => {
    const result = await service.list();
    if (!result.ok) {
      throw new Error("Failed to list users.");
    }
    expect(result.ok).toBe(true);
    expect(result.data).toHaveLength(3);
    expect(result.data.map((user) => user.email).sort()).toEqual([
      "testuser1@example.com",
      "testuser2@example.com",
      "testuser3@example.com",
    ]);
    expect(result.code).toBe(200);
  });
  it("Filters based on parameters", async () => {
    const firstUserResult = await service.list({
      q: "testuser1@example.com",
      limit: "3",
    });
    if (!firstUserResult.ok) {
      throw new Error("Failed to list users.");
    }
    expect(firstUserResult.ok).toBe(true);
    expect(firstUserResult.data).toHaveLength(1);
    expect(firstUserResult.data[0].email).toBe("testuser1@example.com");
    expect(firstUserResult.code).toBe(200);

    const ThirdUserResult = await service.list({ q: "testuser3@example.com" });
    if (!ThirdUserResult.ok) {
      throw new Error("Failed to list users.");
    }
    expect(ThirdUserResult.ok).toBe(true);
    expect(ThirdUserResult.data).toHaveLength(1);
    expect(ThirdUserResult.data[0].email).toBe("testuser3@example.com");
    expect(ThirdUserResult.code).toBe(200);

    const onlyTheFirstTwoResult = await service.list({ limit: "2" });
    if (!onlyTheFirstTwoResult.ok) {
      throw new Error("Failed to list users.");
    }
    expect(onlyTheFirstTwoResult.ok).toBe(true);
    expect(onlyTheFirstTwoResult.data).toHaveLength(2);
    expect(onlyTheFirstTwoResult.code).toBe(200);
  });
});

describe("userService.findById", () => {
  it("Finds a user by ID", async () => {
    const result = await service.findById("1");
    if (result === null) {
      throw new Error("Did not find a user with that id.");
    }
    if (!result.ok) {
      throw new Error("Failed to find user by ID.");
    }
    expect(result.ok).toBe(true);
    expect(result.data).not.toBeNull();
    expect(result.data.id).toBe("1");
    expect(result.code).toBe(200);
  });
  it("Does not find a user with a specific ID and returns null", async () => {
    const result = await service.findById("666");
    expect(result).toBeNull();
  });
});

describe("userService.update", () => {
  it("Updates the username of a specific user", async () => {
    const result = await service.update({
      id: "1",
      category: "email",
      newValue: "updatedemail@example.com",
    });
    if (result === null) {
      throw new Error("Did not find a user with that id.");
    }
    if (!result.ok) {
      throw new Error("Failed to update user.");
    }
    expect(result.ok).toBe(true);
    expect(await service.findById("1")).toHaveProperty(
      "data.email",
      "updatedemail@example.com",
    );
    expect(result.code).toBe(201);
  });
  it("Does not find a user to update and returns null", async () => {
    const result = await service.update({
      id: "666",
      category: "email",
      newValue: "updatedemail@example.com",
    });
    expect(result).toBeNull();
  });

  it("Updates the password of a specific user", async () => {
    const result = await service.update({
      id: "1",
      category: "password",
      newValue: "updatedpassword",
    });
    if (result === null) {
      throw new Error("Did not find a user with that id.");
    }
    if (!result.ok) {
      throw new Error("Failed to update user.");
    }
    expect(result.ok).toBe(true);
    expect(await service.findById("1")).toHaveProperty(
      "data.password",
      "updatedpassword",
    );
    expect(result.code).toBe(201);
  });
  it("Does not find a user to update the password and returns null", async () => {
    const result = await service.update({
      id: "666",
      category: "password",
      newValue: "updatedpassword",
    });
    expect(result).toBeNull();
  });
});

describe("userService.delete", () => {
  it("Deletes a specific user", async () => {
    const result = await service.delete("1");
    if (result === null) {
      throw new Error("Did not find a user with that id.");
    }
    if (!result.ok) {
      throw new Error("Failed to delete user.");
    }
    expect(result.ok).toBe(true);
    const listOfUsers = await service.list();
    if (!listOfUsers.ok) {
      throw new Error("Failed to list users after deleting a new user.");
    }
    expect(listOfUsers.data).toHaveLength(2);
    expect(result.code).toBe(200);
  });
  it("Does not find a user to delete and returns null", async () => {
    const result = await service.delete("666");
    if (result === null) {
      throw new Error("Did not find a user with that id.");
    }
    expect(result).toBeNull();
  });
});
