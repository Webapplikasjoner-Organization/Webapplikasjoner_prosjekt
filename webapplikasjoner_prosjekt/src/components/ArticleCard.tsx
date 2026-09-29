import { Article as ArticleType } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleType }) {
  const { title, articleImageURL } = article;

  return (
    <article>
      <a href={`/articles/${article.id}`}><img src={articleImageURL} width="600" height="300" alt="article-image"></img></a>
      <a href={`/articles/${article.id}`}><h1>{title}</h1></a>
    </article>
  );
}