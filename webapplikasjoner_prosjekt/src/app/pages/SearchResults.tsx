import { getIGDBContent } from "@/api/igdb";
import { GameCard } from "@/components/GameCard";
import { CLIENTID } from "@/constants/env_values";
import { PageLayout } from "@/components/PageLayout";
import type { RequestInfo } from "rwsdk/worker";

export default async function SearchResults({ params }: RequestInfo) {
  let { query } = params;
  query = query.replace(/%20/g, " ");

  const gamesMatchingQuery = `
  fields name, cover.image_id, genres.name, rating, first_release_date, summary;
  where name = ("${query}");
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
        <section className="flex flex-row flex-wrap justify-evenly gap-10">
          {gamesFromIGDB.length === 0 ? (
            <p className="text-center text-lg mt-4">
              No results found for "{query}"
            </p>
          ) : (
            gamesFromIGDB.map((game) => <GameCard key={game.id} game={game} />)
          )}
        </section>
      </main>
    </PageLayout>
  );
}
