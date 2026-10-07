import { Articles } from "@/features/articles/components/Articles";
import { PageLayout } from "@/components/PageLayout";

export default function ArticlesPage() {
  return (
    <PageLayout>
      <main>
        <Articles></Articles>
      </main>
    </PageLayout>
  );
}