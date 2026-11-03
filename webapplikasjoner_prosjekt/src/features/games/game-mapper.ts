import { UserGame } from "@/db/schema/user-game-schema";

export type GameDTO = {
  id: string;
  userId: string;
  gameId: string;
};

export function toGameDTO(userGame: UserGame): GameDTO {
  const { id, userid, gameid } = userGame;
  return { id, userId: userid, gameId: gameid };
}
