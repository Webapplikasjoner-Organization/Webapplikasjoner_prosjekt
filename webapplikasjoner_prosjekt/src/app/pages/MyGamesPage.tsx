import { AddGame } from "@/components/AddGame";
import { GameList } from "@/components/GameList";
import { PageLayout } from "@/components/PageLayout";
import { FilterPanel } from "@/components/FilterPanel";
import { SortPanel } from "@/components/SortPanel";

export default function MyGamesPage() {
  return (
    <PageLayout>
      <main>
        <h1>My games</h1>
        <FilterPanel></FilterPanel>
        <SortPanel></SortPanel>
        <AddGame></AddGame>
        <GameList/>
      </main>
    </PageLayout>
  );
}