import type { Game } from "@/types/game";
import { GameCard } from "@/features/games/components/GameCard";
import { Suspense } from "react";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { requestInfo } from "rwsdk/worker";
import { userService } from "@/features/users/user-service";

export async function MyGamesList() {
  const userGamesList = await userService.list();

  if (!userGamesList.ok) {
    return <p>Failed to load your games.</p>;
  }

  if (!userGamesList.data || userGamesList.data.length === 0) {
    return <p>No games found in your library.</p>;
  }

  const gamesFromIGDB = `
  fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
  where id = (${userGamesList?.data?.map((game) => game.id).join(",")});
  sort rating desc;
  limit 10;`;

  const games: Partial<Game>[] = (await getIGDBContent(
    "games",
    gamesFromIGDB,
    CLIENTID,
  )) as Partial<Game>[];

  return (
    <>
      <section className="flex flex-row flex-wrap justify-evenly gap-10">
        <Suspense fallback={<p>Loading games...</p>}>
          {games.length === 0 ? (
            <p>No games found.</p>
          ) : (
            games?.map((game) => <GameCard key={game.id} game={game} />)
          )}
        </Suspense>
      </section>
    </>
  );
}
