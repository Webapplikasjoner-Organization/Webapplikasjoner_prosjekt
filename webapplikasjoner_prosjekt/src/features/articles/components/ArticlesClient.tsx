"use client";

import { Articles } from "../components/Articles";
import { useEffect, useState } from "react";
import type { Article } from "@/types/article";
import type { ArticleResult } from "../article-api";

export function ArticlesClient() {
  // Sette opp state der innhentede artikler er staten
  // Legge opp slik at vi sender denne staten ned til <Articles> som prop
  // Bruke useEffect for å trigge innhenting ved førstegangsnavigering - kalle på article-api.ts

  const [ articleList, setArticleList ] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles () {
      const response = await fetch("api/v1/articles");
      const result: ArticleResult<Article[]> = await response.json();

      if (result.ok) {
        setArticleList(result.data);
      } else {
        console.error(result.error.message);
      }
    }
      loadArticles(); 
}, []);


  return (
  <Articles articleList={articleList}></Articles>
);
  
 


}
