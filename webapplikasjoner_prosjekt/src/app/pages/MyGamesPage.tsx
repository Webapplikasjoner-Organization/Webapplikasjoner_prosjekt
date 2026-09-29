import { GameList } from "@/components/GameList";
import { PageLayout } from "@/components/PageLayout";

export default function MyGamesPage() {
  return (
    <PageLayout>
      <main>
        <h1>My games</h1>
        <GameList/>
      </main>
    </PageLayout>
  );
}