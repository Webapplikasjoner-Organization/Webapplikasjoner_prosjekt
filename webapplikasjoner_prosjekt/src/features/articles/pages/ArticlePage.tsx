import { PageLayout } from "@/components/PageLayout";
import { Article } from "../components/Article";
import type { RequestInfo } from "rwsdk/worker";

export function ArticlePage({ params }: RequestInfo) {
  const { id } = params;

  return (
    <PageLayout>
      <main>
        <Article id={id}></Article>
      </main>
    </PageLayout>
  );
}
