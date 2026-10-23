//Claude chatlog explaining query and filtering syntax for interacting with the igdb API.
//https://claude.ai/share/5f8b3fa5-1ba1-429f-bf84-1763d8bc1713

import { getIGDBContent } from "@/api/igdb";
import { GameCard } from "@/features/games/components/GameCard";
import { Suspense } from "react";
import { CLIENTID } from "@/constants/env_values";
import { PageLayout } from "@/components/PageLayout";
import type { RequestInfo } from "rwsdk/worker";

export async function SearchResults({ params }: RequestInfo) {
  let { q } = params;
  q = decodeURIComponent(params.q).replace(/["\\]/g, "").trim();

  const gamesMatchingQuery = `
  search "${q}";
  fields name, cover.image_id, platforms.name, genres.name, rating, first_release_date, summary;
  where cover != null & version_parent = null;
  limit 10;`;

  const gamesFromIGDB = await getIGDBContent(
    "games",
    gamesMatchingQuery,
    CLIENTID,
  );

  const sortedGamesByRating = gamesFromIGDB.sort(
    (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
  );

  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">Search Results</h1>
        <Suspense fallback={<p>Loading search results...</p>}>
          <section className="flex flex-row flex-wrap justify-evenly gap-10">
            {gamesFromIGDB.length === 0 ? (
              <p className="text-center text-lg mt-4">
                No results found for "{q}"
              </p>
            ) : (
              sortedGamesByRating.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            )}
          </section>
        </Suspense>
      </main>
    </PageLayout>
  );
}
