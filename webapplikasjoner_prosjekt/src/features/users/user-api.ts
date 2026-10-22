import type { User } from "@/db/schema/user-schema";
import { type Result } from "@/shared/result";
import { UserDTO } from "./user-mapper";

export async function createUser(input: unknown): Promise<Result<UserDTO>> {
  try {
    const response = await fetch(`/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      throw new Error(
        `Failed to create a user: ${(response.ok, response.status, response.statusText)}`,
      );
    }
    const data = await response.json();
    return data as { ok: true; data: UserDTO; code: 201 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message:
          "Failed to create a user in the database or the input is in the wrong format.",
      },
    };
  }
}

export async function listUsers(
  params: Record<string, string> = {},
): Promise<Result<UserDTO[]>> {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`/api/v1/users?${query}`);
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      throw new Error(
        `Failed to fetch users: ${(response.ok, response.status, response.statusText)}`,
      );
    }
    const data = await response.json();
    return data as { ok: true; data: UserDTO[]; code: 200 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message:
          "Failed to fetch users from the database or the query is in the wrong format.",
      },
    };
  }
}

export async function findUserById(id: string): Promise<Result<UserDTO>> {
  try {
    const response = await fetch(`/api/v1/users/${id}`);
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      throw new Error(
        `Failed to fetch a user by id: ${(response.ok, response.status, response.statusText)}`,
      );
    }
    const data = await response.json();
    return data as { ok: true; data: UserDTO; code: 200 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message:
          "Failed to fetch a user from the database or the id is in an incorrect format.",
      },
    };
  }
}

export async function updateUser(
  id: string,
  input: unknown,
): Promise<Result<UserDTO>> {
  try {
    const response = await fetch(`/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      throw new Error(
        `Failed to update a user: ${(response.ok, response.status, response.statusText)}`,
      );
    }
    const data = await response.json();
    return data as { ok: true; data: UserDTO; code: 201 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message:
          "Failed to update the user from the database or the id is in an incorrect format.",
      },
    };
  }
}

export async function deleteUser(id: string): Promise<Result<void>> {
  try {
    const response = await fetch(`/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      throw new Error(
        `Failed to delete a user: ${(response.ok, response.status, response.statusText)}`,
      );
    }
    const data = await response.json();
    return data as { ok: true; data: void; code: 200 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message:
          "Failed to delete the user from the database or the id is in an incorrect format.",
      },
    };
  }
}
