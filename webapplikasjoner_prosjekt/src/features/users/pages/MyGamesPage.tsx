import { GameList } from "@/features/games/components/GameList";
import { PageLayout } from "@/components/PageLayout";
import { FilterPanel } from "@/features/games/components/FilterPanel";
import { SortPanel } from "@/features/games/components/SortPanel";

export function MyGamesPage() {
  return (
    <PageLayout>
      <main className="flex flex-col gap-10">
        <h1>My games</h1>
        <div>
          <FilterPanel />
        </div>
        <div>
          <SortPanel />
        </div>
        <GameList />
      </main>
    </PageLayout>
  );
}
