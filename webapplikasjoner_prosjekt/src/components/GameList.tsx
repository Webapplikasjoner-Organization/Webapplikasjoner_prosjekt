import { GameCard } from "@/components/GameCard";
import { GAMES } from "@/data/games";

export function GameList({selection}: {selection?: number[]} = {selection: []}) {
  return (
    <section className="flex flex-row flex-wrap justify-evenly gap-10">
      {(selection && selection.length > 0)
        ? GAMES.filter((game) => selection.includes(Number(game.id))).map((game) => <GameCard key={game.id} game={game} />)
        : GAMES.map((game) => <GameCard key={game.id} game={game} />)
      }
    </section>
  )
}