import { UserGame } from "@/db/schema/user-game-schema";

export type GameDTO = {
  id: string;
  userId: string;
  gameId: string;
};

export type dbGame = {
  id?: string;
  userid: string;
  gameid: string;
};

export function toGameDTO(userGame: UserGame): GameDTO {
  const { id, userid, gameid } = userGame;
  return { id, userId: userid, gameId: gameid };
}

export function toDBGame(game: Pick<GameDTO, "userId" | "gameId">): dbGame {
  const { userId, gameId } = game;
  return { userid: userId, gameid: gameId };
}
