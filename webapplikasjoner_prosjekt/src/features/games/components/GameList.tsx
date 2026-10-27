//Claude chat explaining how to use query parameters.
//https://claude.ai/share/75b1a8e0-ecae-46f0-8172-8fee45982a04

import type { Game } from "@/types/game";
import { GameCard } from "./GameCard";
import { Suspense } from "react";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { requestInfo } from "rwsdk/worker";

type GameListProps = {
  filterPanel?: React.ReactNode;
  sortPanel?: React.ReactNode;
  request?: Request;
  params?: Record<string, string>;
};

export async function GameList({
  filterPanel,
  sortPanel,
  request,
  params,
}: GameListProps) {
  let genreFilter;
  let platformFilter;

  const url = new URL(request?.url || "");
  genreFilter = url.searchParams.get("genrefilter");
  platformFilter = url.searchParams.get("platformfilter");

  let gamesFromIGDB;

  const conditions = ["rating > 80 & rating_count > 50"];
  if (genreFilter) conditions.push(`genres.name = "${genreFilter}"`);
  if (platformFilter) conditions.push(`platforms.name = "${platformFilter}"`);

  gamesFromIGDB = `
  fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
  where ${conditions.join(" & ")};
  sort rating desc;
  limit 10;`;

  const games: Partial<Game>[] = (await getIGDBContent(
    "games",
    gamesFromIGDB,
    CLIENTID,
  )) as Partial<Game>[];

  return (
    <>
      <div>{filterPanel}</div>
      <div>{sortPanel}</div>
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
