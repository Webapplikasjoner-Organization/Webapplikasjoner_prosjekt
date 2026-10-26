import type { Game } from "@/types/game";
import { GameCard } from "./GameCard";
import { Suspense } from "react";

type GameListProps = {
  games?: Partial<Game>[];
  filterPanel?: React.ReactNode;
  sortPanel?: React.ReactNode;
};

export async function GameList({
  games,
  filterPanel,
  sortPanel,
}: GameListProps) {
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
