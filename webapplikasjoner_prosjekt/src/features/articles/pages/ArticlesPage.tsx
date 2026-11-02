
import { PageLayout } from "@/components/PageLayout";
import { Articles } from "../components/Articles";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";
import { articleController } from "../article-controller";

export function ArticlesPage() {
  // Sette opp state der innhentede artikler er staten
  // Legge opp slik at vi sender denne staten ned til <Articles> som prop
  // Bruke useEffect for å trigge innhenting ved førstegangsnavigering - kalle på article-api.ts

  const [ articleList, setArticleList ] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles () {
      const result = await articleController.listAll();

      if (result.ok) {
        setArticleList(result.data);
      } else {
        console.error(result.error.message);
      }
    }
      loadArticles();  
}, []);

  return (
    <PageLayout>
      <main>
        <Articles articleList={articleList}></Articles>
      </main>
    </PageLayout>
  );
}
