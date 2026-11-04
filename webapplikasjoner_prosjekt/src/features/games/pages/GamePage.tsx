import { PageLayout } from "@/components/PageLayout";
import { CLIENTID } from "@/constants/env_values";
import { GAMES } from "@/data/games";
import { Game } from "@/types/game";
import { getIGDBContent } from "@/api/igdb";
import {Franchise} from "@/types/franchise"
import type { RequestInfo } from "rwsdk/worker";

export async function GamePage({ params }: RequestInfo) {
  const { id } = params;

  const gameWithID = `
  fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary, 
  age_ratings.rating_category.rating, storyline, websites.url, screenshots.image_id, videos.video_id;
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
    screenshots,
    videos,
  } = game as Game;

  const franchises = `
    fields name, games.name;
    sort rating desc;
    where games = (${id});
    limit 10;
  `;

  const gameFranchise = await getIGDBContent(
    "franchises",
    franchises,
    CLIENTID,
  )as Franchise[];

  return (
    <PageLayout>
      <main className="flex flex-col items-center pt-5 pb-5">
        {game ? (
          <article className="flex flex-col w-2/3 gap-5">
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover?.image_id}.jpg`}
              alt={`${name} box-art`}
              width="264"
              height="374"
            />
            <p>
              <span className="font-bold">Name: </span>
              {name}
            </p>
            <p>
              <span className="font-bold">Franchise: </span>
              {gameFranchise?.[0]?.name ?? "N/A"}
            </p>
            <div>
              <h2 className="font-bold mb-3"> Games in that franchise: </h2>
              {(gameFranchise?.[0]?.games?.length ?? 0) > 0 ? (
                <ul className="list-disc list-inside">
                  {gameFranchise?.[0]?.games?.map((franchiseGame) => (
                    <li key={franchiseGame.id}>
                      <a href={`/games/${franchiseGame.id}`} className="text-blue-600 visited:text-purple-600">
                        {franchiseGame.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No other games in this franchise.</p>
              )}
            </div>
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
              <h2 className="font-bold mb-3">Screenshots: </h2>
              {screenshots && (
                <div className="flex flex-wrap gap-3">
                  {screenshots.map((screenshot) => (
                    <img
                      key={screenshot.id}
                      src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`}
                      alt={`${name} screenshot`}
                      className="w-80 rounded-lg"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <h2 className="font-bold mb-3">Videos: </h2>
              {videos && videos.length > 0 ? (
                <iframe
                src={`https://www.youtube.com/embed/${videos[0].video_id}`}
                title={`${name} video`}
                className="w-full aspect-video rounded-lg"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
              ) : (
                <p>No videos available.</p>
              )}
            </div>
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
