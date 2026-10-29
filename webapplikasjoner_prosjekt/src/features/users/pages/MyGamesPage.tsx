import { MyGamesList } from "@/features/users/components/MyGamesList";
import { PageLayout } from "@/components/PageLayout";
import { FilterPanel } from "@/features/games/components/FilterPanel";

export function MyGamesPage() {
  return (
    <PageLayout>
      <main className="flex flex-col gap-10">
        <MyGamesList />
      </main>
    </PageLayout>
  );
}
