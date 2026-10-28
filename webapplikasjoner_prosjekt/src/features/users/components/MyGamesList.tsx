import type { Game } from "@/types/game";
import { GameCard } from "@/features/games/components/GameCard";
import { Suspense } from "react";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { requestInfo } from "rwsdk/worker";

export async function MyGamesList() {
  const gamesFromIGDB = `
  fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
  where rating > 80 & rating_count > 50;
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
