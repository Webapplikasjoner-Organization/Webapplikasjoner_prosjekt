import { Article } from "@/types/article";
import { ArticleResult } from "./article-api";
import { articleRepository, ArticleRepository } from "./article-repository";
import { toArticle } from "./article-mapper";

export interface ArticleService {
     listAll(): Promise<ArticleResult<Article[]>>; 
}

export function createArticleService ( _repository: ArticleRepository): ArticleService {

    return {
        async listAll() {
            const result = await _repository.listAll();
                        
            
            if (!result.ok) {
                return result;
            }

                        return {
                ok: true,
                data: result.data.map(toArticle),
            };
        },
    }
    
}

export const articleService = createArticleService(articleRepository);