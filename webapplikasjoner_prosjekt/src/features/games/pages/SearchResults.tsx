import { getIGDBContent } from "@/api/igdb";
import { GameCard } from "@/features/games/components/GameCard";
import { Suspense } from "react";
import { CLIENTID } from "@/constants/env_values";
import { PageLayout } from "@/components/PageLayout";
import type { RequestInfo } from "rwsdk/worker";

export async function SearchResults({ params }: RequestInfo) {
  let { q } = params;
  q = q.replace(/%20/g, " ");

  const gamesMatchingQuery = `
  fields name, cover.image_id, genres.name, rating, first_release_date, summary;
  where name = ("${q}");
  sort rating desc;
  limit 10;`;

  const gamesFromIGDB = await getIGDBContent(
    "games",
    gamesMatchingQuery,
    CLIENTID,
  );

  return (
    <PageLayout>
      <main>
        <h1 className="text-3xl font-bold text-center">Search Results</h1>
        <Suspense fallback={<p>Loading search results...</p>}>
          <section className="flex flex-row flex-wrap justify-evenly gap-10">
            {gamesFromIGDB.length === 0 ? (
              <p className="text-center text-lg mt-4">
                No results found for "{q}"
              </p>
            ) : (
              gamesFromIGDB.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            )}
          </section>
        </Suspense>
      </main>
    </PageLayout>
  );
}
