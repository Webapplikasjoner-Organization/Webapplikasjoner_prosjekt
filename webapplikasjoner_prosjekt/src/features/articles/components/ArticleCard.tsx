import { Article as ArticleType } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleType }) {
  const { title, articleImageURL, content } = article;

  return (
    <article className="border border-black">
      <img 
        src={article.articleImageURL}
        alt="article picture"
      />
      <h2>{article.title}</h2>
      <p>{article.content}</p>

    </article>
  );
}