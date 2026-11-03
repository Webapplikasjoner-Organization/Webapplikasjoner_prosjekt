import type { Result } from "@/shared/result";
import { GameDTO } from "./game-mapper";

export async function addGame(input: unknown): Promise<Result<GameDTO>> {
  try {
    const response = await fetch("/api/v1/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      return {
        ok: false,
        error: {
          code: response.status,
          message: `Response not ok: ${response.statusText}`,
        },
      };
    }
    const data = await response.json();
    return data as { ok: true; data: GameDTO; code: 201 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message: "Failed to create a game due to a server error",
      },
    };
  }
}

export async function listGames(
  params: Record<string, string> = {},
): Promise<Result<GameDTO[]>> {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`/api/v1/games?${query}`);
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      return {
        ok: false,
        error: {
          code: response.status,
          message: `Response not ok: ${response.statusText}`,
        },
      };
    }
    const data = await response.json();
    return data as { ok: true; data: GameDTO[]; code: 200 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message:
          "Failed to list games from the database or the query is in the wrong format.",
      },
    };
  }
}

export async function findGameById(id: string): Promise<Result<GameDTO>> {
  try {
    const response = await fetch(`/api/v1/games/${encodeURIComponent(id)}`);
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      return {
        ok: false,
        error: {
          code: response.status,
          message: `Response not ok: ${response.statusText}`,
        },
      };
    }
    const data = await response.json();
    return data as { ok: true; data: GameDTO; code: 200 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message:
          "Failed to find game due to a server error or the id is in the wrong format",
      },
    };
  }
}

export async function removeGame(id: string): Promise<Result<void>> {
  try {
    const response = await fetch(`/api/v1/games/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response.ok, response.status, response.statusText);
      return {
        ok: false,
        error: {
          code: response.status,
          message: `Response not ok: ${response.statusText}`,
        },
      };
    }
    const data = await response.json();
    return data as { ok: true; data: void; code: 204 };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: {
        code: 500,
        message:
          "Failed to delete the game from the database or the id is in an incorrect format.",
      },
    };
  }
}
