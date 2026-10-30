import { Article } from "@/types/article";
import { ArticleResult } from "./article-api";

export interface ArticleController {
    listAll(): Promise<ArticleResult<Article[]>>; 
}

export function createArticleController () {
    
}