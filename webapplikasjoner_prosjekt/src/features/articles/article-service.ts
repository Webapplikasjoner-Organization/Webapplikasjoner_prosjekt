import { Article } from "@/types/article";
import { ArticleResult } from "./article-api";
import { ArticleRepository } from "./article-repository";

export interface ArticleService {
     listAll(): Promise<ArticleResult<Article[]>>; 
}

export function ArticleService ( _repository: ArticleRepository): ArticleService {

    return {
        async listAll() {
            const result = await _repository.listAll();
            return result;
        },
    }
    
}