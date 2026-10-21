import { getIGDBContent } from "@/api/igdb";
import type { Game } from "@/types/game";
import { CLIENTID } from "@/constants/env_values";
import { GameCard } from "./GameCard";
import { Suspense, useState, useEffect } from "react";

const gamesFromIGDB = `
fields name, cover.image_id, genres.name, rating, release_dates.human, summary;
where rating > 80 & rating_count > 50;
sort rating desc;
limit 10;`;

export async function GameList() {
  const [games, setGames] = useState<Partial<Game>[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const igdbGames: Partial<Game>[] = await getIGDBContent(
        "games",
        gamesFromIGDB,
        CLIENTID,
      );
      setGames(igdbGames);
    };
    fetchGames();
  }, []);

  return (
    <section className="flex flex-row flex-wrap justify-evenly gap-10">
      <Suspense fallback={<p>Loading games...</p>}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Suspense>
    </section>
  );
}
