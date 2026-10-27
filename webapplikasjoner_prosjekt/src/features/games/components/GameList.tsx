import type { Game } from "@/types/game";
import { GameCard } from "./GameCard";
import { Suspense } from "react";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";

const gamesFromIGDB = `
fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
where rating > 80 & rating_count > 50;
sort rating desc;
limit 10;`;

const games: Partial<Game>[] = await getIGDBContent(
  "games",
  gamesFromIGDB,
  CLIENTID,
);

type GameListProps = {
  filterPanel?: React.ReactNode;
  sortPanel?: React.ReactNode;
};

export async function GameList({ filterPanel, sortPanel }: GameListProps) {
  return (
    <>
      <div>{filterPanel}</div>
      <div>{sortPanel}</div>
      <section className="flex flex-row flex-wrap justify-evenly gap-10">
        <Suspense fallback={<p>Loading games...</p>}>
          {games?.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </Suspense>
      </section>
    </>
  );
}
