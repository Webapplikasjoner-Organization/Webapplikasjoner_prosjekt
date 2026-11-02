import { ArticleCard } from "../components/ArticleCard";
import { Suspense } from "react";
import { Article } from "@/types/article";


// Sette opp props-typen 
type ArticlesProps = {
    articleList: Article[];
}

export function Articles(articles: ArticlesProps) {
//Bruke listen fra state i props inn i return og mappe gjennom denne listen

  return (
    <Suspense fallback={<p>Loading articles...</p>}>
      <section className="flex flex-row flex-wrap justify-around pt-5 pb-5 gap-10">
        {articles.articleList.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
    </Suspense>
  );
}
