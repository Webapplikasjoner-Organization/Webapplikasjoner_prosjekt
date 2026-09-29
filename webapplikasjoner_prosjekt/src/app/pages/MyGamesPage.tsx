import { AddGame } from "@/components/AddGame";
import { GameList } from "@/components/GameList";
import { PageLayout } from "@/components/PageLayout";
import { FilterPanel } from "@/components/FilterPanel";
import { SortPanel } from "@/components/SortPanel";

export default function MyGamesPage() {
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
        <AddGame></AddGame>
        <GameList/>
      </main>
    </PageLayout>
  );
}