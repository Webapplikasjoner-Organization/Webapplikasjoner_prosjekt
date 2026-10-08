import { PageLayout } from "@/components/PageLayout";
import { CLIENTID } from "@/constants/env_values";
import { GAMES } from "@/data/games";
import { Game } from "@/types/game";
import { getIGDBContent } from "@/api/igdb";

import type { RequestInfo } from "rwsdk/worker";

export default async function GamePage({ params }: RequestInfo) {
  const { id } = params;

  const gameWithID = `
  fields name, cover.image_id, genres.name, rating, first_release_date, summary;
  where id = (${id});
  sort rating desc;
  limit 10;`;

  const gameFromIGDB = await getIGDBContent("games", gameWithID, CLIENTID);

  const game = gameFromIGDB?.[0];

  const { name, cover, genres, rating, releaseDate, summary } = game;

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
    <PageLayout>
      <main className="flex flex-col items-center pt-5 pb-5">
        {game ? (
          <article>
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${cover?.image_id}.jpg`}
              alt={`${name} box-art`}
              width="300"
              height="300"
            />
            <p>
              <span className="font-bold">Name: </span>
              {name}
            </p>
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
              {releaseDate ? releaseDate.toLocaleDateString() : "N/A"}
            </p>
            <p>
              <span className="font-bold">Description: </span>
              {summary}
            </p>
          </article>
        ) : (
          <p>The game could not be found.</p>
        )}
      </main>
    </PageLayout>
  );
}
