"use client";

import { brandStyles } from "@/app/styles/brand-styles";
import type { Article } from "@/types/article";
import { useState, useEffect, Suspense } from "react";
import { ArticleResult } from "../article-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

export function Article({ id }: { id: string }) {
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      const response = await fetch(`/api/v1/articles`);
      const result: ArticleResult<Article[]> = await response.json();

      if (result.ok) {
        setArticle(result.data[0]);
      } else {
        console.error(result.error.message);
      }
    }
    loadArticle();
  }, []);

  return (
    <Suspense fallback={<p>Loading article...</p>}>
      <section className="mx-auto my-8 w-4/5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
        {article ? (
          <article>
            <img
              src={article.articleImageURL}
              width="600"
              height="300"
              alt="article-image"
              className="aspect-video w-full object-cover"
            ></img>
            <div className="space-y-4 p-5 sm:p-8">
              <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                {article.title}
              </h2>
              <p className="text-base leading-7 text-gray-700 sm:text-lg">
                {article.content}
              </p>
              <div className="flex space-x-4">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{
                    width: 50,
                    height: 50,
                    color: isLiked ? "green" : "black",
                  }}
                  onClick={() => {
                    setIsLiked(!isLiked);
                    if (isDisliked) setIsDisliked(false);
                  }}
                />
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  style={{
                    width: 50,
                    height: 50,
                    color: isDisliked ? "red" : "black",
                  }}
                  onClick={() => {
                    setIsDisliked(!isDisliked);
                    if (isLiked) setIsLiked(false);
                  }}
                />
              </div>
              <form action="#">
                <textarea placeholder="Write a comment..."></textarea>
                <button type="submit" className={`${brandStyles.button}`}>
                  Post Comment
                </button>
              </form>
            </div>
          </article>
        ) : (
          <p>The article could not be found.</p>
        )}
      </section>
    </Suspense>
  );
}
