import type { RequestInfo } from "rwsdk/worker";
import { PageLayout } from "@/components/PageLayout";
import { ARTICLES } from "@/data/articles";
import { Article as ArticleType } from "@/types/article";

export default function Article({ params }: RequestInfo) {
  const { id } = params;

  const article: ArticleType | undefined = ARTICLES.find(
    (article) => article.id === id,
  );

  const { title, content, articleImageURL } = article || {};

  return (
    <PageLayout>
      <main className="flex flex-col items-center pt-5 pb-5">
        {article ? (
          <article>
            <img
              src={articleImageURL}
              width="600"
              height="300"
              alt="article-image"
            ></img>
            <h1>{title}</h1>
            <p>{content}</p>
            <img src="" width="50" height="50" alt="like-button" />
            <img src="" width="50" height="50" alt="dislike-button" />
            <form>
              <textarea placeholder="Write a comment..."></textarea>
              <button type="submit">Post Comment</button>
            </form>
            <button>Report article</button>
          </article>
        ) : (
          <p>The article could not be found.</p>
        )}
      </main>
    </PageLayout>
  );
}
