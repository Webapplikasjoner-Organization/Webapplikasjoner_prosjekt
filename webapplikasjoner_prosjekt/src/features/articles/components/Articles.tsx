import { ARTICLES } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";

export function Articles() {
  return (
    <section className="flex flex-row flex-wrap justify-around pt-5 pb-5 gap-10">
      {ARTICLES.map((article) => <ArticleCard key={article.id} article={article} />)}
    </section>
  );
}