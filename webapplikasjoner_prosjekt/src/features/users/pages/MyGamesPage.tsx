import { MyGamesList } from "@/features/users/components/MyGamesList";
import { PageLayout } from "@/components/PageLayout";

export function MyGamesPage() {
  return (
    <PageLayout>
      <main className="flex flex-col gap-10">
        <MyGamesList />
      </main>
    </PageLayout>
  );
}
