import { getIGDBContent } from "@/api/igdb";
import type { Game } from "@/types/game";
import { CLIENTID } from "@/constants/env_values";
import { GameCard } from "./GameCard";

const gamesFromIGDB = `
fields name, cover.image_id, genres.name, rating, first_release_date, summary;
where rating > 80 & rating_count > 50;
sort rating desc;
limit 10;`;

export async function GameList() {
  const games: Partial<Game>[] = await getIGDBContent(
    "games",
    gamesFromIGDB,
    CLIENTID,
  );

  return (
    <section className="flex flex-row flex-wrap justify-evenly gap-10">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
}
