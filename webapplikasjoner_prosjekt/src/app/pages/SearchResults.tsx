import { GameCard } from "@/features/games/components/GameCard";
import { PageLayout } from "@/components/PageLayout";
import { GAMES } from "@/data/games";

export default function SearchResults({params}: {params: { query: string }}) {
  const { query } = params;

  return (
    <PageLayout>
      <main>
        <h1 className="text-3xl font-bold text-center">Search Results</h1>
        <section className="flex flex-row flex-wrap justify-evenly gap-10">
          {GAMES.filter(game => game.title.toLowerCase().includes(query.toLowerCase().replace("%20", " ")))
          .map(game => <GameCard key={game.id} game={game} />)}
        </section>
      </main>
    </PageLayout>
  );
}