import { Game } from "@/types/game";
import { AddGameButton } from "./AddGameButton";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { brandStyles } from "@/app/styles/brand-styles";

export async function GameCard({ game }: { game: Partial<Game> }) {
  const { id, name, cover, platforms, genres, rating, release_dates, summary } =
    game;

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
          <span className="font-bold">Platforms: </span>
          {platforms?.map((platform) => platform.name).join(", ")}
        </p>
        <p>
          <span className="font-bold">Rating: </span>
          {rating ? `${Math.round(rating)}/100` : "N/A"}
        </p>
        <p>
          <span className="font-bold">Release Date: </span>
          {release_dates
            ?.map((releaseDate) => releaseDate.human)
            .join(", ")
            .slice(0, 12)}
        </p>
        <p>
          <span className="font-bold">Summary: </span>
          {summary}
        </p>
        <AddGameButton gameId={id} />
        <button className={`${brandStyles.button} self-center`}>Like</button>
      </section>
    </article>
  );
}
