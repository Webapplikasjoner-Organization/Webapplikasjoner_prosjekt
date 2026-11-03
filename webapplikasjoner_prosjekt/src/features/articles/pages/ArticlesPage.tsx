import { PageLayout } from "@/components/PageLayout";
import { ArticlesClient } from "../components/ArticlesClient";

export function ArticlesPage() {
  return (
    <PageLayout>
      <main>
        <ArticlesClient></ArticlesClient>
      </main>
    </PageLayout>
  );
}
