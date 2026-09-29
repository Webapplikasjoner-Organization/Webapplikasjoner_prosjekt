import { ARTICLES } from "@/data/articles";
import { ArticleCard } from "../components/ArticleCard";

export function Articles() {
  return (
    <section className="flex flex-col gap-10">
      {ARTICLES.map((article) => <ArticleCard key={article.id} article={article} />)}
    </section>
  );
}