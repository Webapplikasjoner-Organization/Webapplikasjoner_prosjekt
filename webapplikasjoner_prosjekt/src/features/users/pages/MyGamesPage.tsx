import { GameList } from "@/features/games/components/GameList";
import { PageLayout } from "@/components/PageLayout";
import { FilterPanel } from "@/features/games/components/FilterPanel";

type MyGamesPageProps = {
  request?: Request;
  params?: Record<string, string>;
};

export function MyGamesPage({ request, params }: MyGamesPageProps) {
  return (
    <PageLayout>
      <main className="flex flex-col gap-10">
        <h1>My games</h1>
        <GameList />
      </main>
    </PageLayout>
  );
}
