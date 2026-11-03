"use client";

import { brandStyles } from "@/app/styles/brand-styles";
import type { Article } from "@/types/article";
import { useState, useEffect, Suspense } from "react";
import { ArticleResult } from "../article-api";

export function Article({ id }: { id: string }) {
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    async function loadArticle() {
      const response = await fetch(`api/v1/articles/${id}`);
      const result: ArticleResult<Article> = await response.json();

      if (result.ok) {
        setArticle(result.data);
      } else {
        console.error(result.error.message);
      }
    }
    loadArticle();
  }, []);

  return (
    <Suspense fallback={<p>Loading article...</p>}>
      <section className="flex flex-col items-center pt-5 pb-5">
        {article ? (
          <article>
            <img
              src={article.articleImageURL}
              width="600"
              height="300"
              alt="article-image"
            ></img>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <img src="" width="50" height="50" alt="like-button" />
            <img src="" width="50" height="50" alt="dislike-button" />
            <form>
              <textarea placeholder="Write a comment..."></textarea>
              <button type="submit" className={`${brandStyles.button}`}>
                Post Comment
              </button>
            </form>
            <button className={`${brandStyles.button}`}>Report article</button>
          </article>
        ) : (
          <p>The article could not be found.</p>
        )}
      </section>
    </Suspense>
  );
}
