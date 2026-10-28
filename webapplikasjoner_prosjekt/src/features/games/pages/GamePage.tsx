import { PageLayout } from "@/components/PageLayout";
import { CLIENTID } from "@/constants/env_values";
import { GAMES } from "@/data/games";
import { Game } from "@/types/game";
import { getIGDBContent } from "@/api/igdb";

import type { RequestInfo } from "rwsdk/worker";

export async function GamePage({ params }: RequestInfo) {
  const { id } = params;

  const gameWithID = `
  fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary, 
  age_ratings.rating_category.rating, storyline, websites.url;
  where id = (${id});
  sort rating desc;
  limit 10;`;

  const gameFromIGDB = await getIGDBContent("games", gameWithID, CLIENTID);

  const game = gameFromIGDB?.[0];

  const {
    name,
    cover,
    platforms,
    genres,
    rating,
    release_dates,
    summary,
    age_ratings,
    storyline,
    websites,
  } = game as Game;

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
          <article className="flex flex-col w-2/3 gap-5">
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
            <p>
              <span className="font-bold">Franchise: </span>
              {gameFranchise?.[0]?.name ?? "N/A"}
            </p>
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
              <span className="font-bold">Description: </span>
              {summary}
            </p>
            <p>
              <span className="font-bold">Age Ratings: </span>
              {age_ratings
                ?.map((age_rating) => age_rating?.rating_category?.rating)
                .join(", ") ?? "N/A"}
            </p>
            <p>
              <span className="font-bold">Storyline: </span>
              {storyline ?? "N/A"}
            </p>
            <div>
              <p className="font-bold">Related sources: </p>
              <ul className="list-disc list-inside">
                {websites?.map((website) => (
                  <li
                    className="text-blue-600 visited:text-purple-600"
                    key={website.id}
                  >
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {website.url}
                    </a>
                  </li>
                )) ?? "N/A"}
              </ul>
            </div>
          </article>
        ) : (
          <p>The game could not be found.</p>
        )}
      </main>
    </PageLayout>
  );
}
