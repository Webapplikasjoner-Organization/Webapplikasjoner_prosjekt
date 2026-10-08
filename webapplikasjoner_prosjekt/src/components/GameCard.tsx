import { Game } from "@/types/game";
import { AddGameButton } from "./AddGameButton";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { brandStyles } from "@/app/styles/brand-styles";

export async function GameCard({ game }: { game: Partial<Game> }) {
  const { id, name, cover, genres, rating, releaseDate, summary } = game;

  const franchises = `
    fields name, games;
    sort rating desc;
    where games = (${id});
    limit 10;
  `;

  const gameFranchise = await getIGDBContent(
    "franchises",
    franchises,
    CLIENTID,
  );

  return (
    <article className="pt-10 pb-10 w-75">
      <a href={`/games/${id}`}>
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${cover?.image_id}.jpg`}
          alt={`${name} box-art`}
          width="300"
          height="300"
        />
      </a>
      <section className="flex flex-col flex-wrap bg-[#d7d7d7]">
        <a href={`/games/${id}`}>
          <p>
            <span className="font-bold">Name: </span>
            {name}
          </p>
        </a>
        <a href={`/`}>
          <p>
            <span className="font-bold">Franchise: </span>
            {gameFranchise?.[0]?.name ?? "N/A"}
          </p>
        </a>
        <p>
          <span className="font-bold">Genres: </span>
          {genres?.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <span className="font-bold">Rating: </span>
          {rating}
        </p>
        <p>
          <span className="font-bold">Release Date: </span>
          {releaseDate?.toLocaleDateString()}
        </p>
        <p>
          <span className="font-bold">Summary: </span>
          {summary}
        </p>
        <AddGameButton gameId={id} />
        <button className={brandStyles.button}>Like</button>
      </section>
    </article>
  );
}
