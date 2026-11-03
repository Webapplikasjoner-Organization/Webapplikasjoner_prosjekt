import { Article as ArticleType } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleType }) {
  const { title, articleImageURL, content } = article;

  return (
    <article className="mx-auto my-8 w-4/5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
      <a href={`/articles/${title}`} className="block">
        <img
          src={article.articleImageURL}
          alt=""
          className="aspect-video w-full object-cover"
        />
      </a>

      <div className="space-y-4 p-5 sm:p-8">
        <a href={`/articles/${title}`} className="block">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            {article.title}
          </h2>
        </a>

        <p className="text-base leading-7 text-gray-700 sm:text-lg">
          {article.content}
        </p>
      </div>
    </article>
  );
}
