import { Article } from "@/types/article";
import { ArticleResult } from "./article-api";
import { articleService, ArticleService } from "./article-service";


export interface ArticleController {
    listAll(): Promise<ArticleResult<Article[]>>; 
}

export function createArticleController (_service: ArticleService): ArticleController {
    return {
        async listAll() {
            try {
                console.log("articleController kjører");
                const response = await articleService.listAll();
                
                if (!response.ok) return response;

                return {
                    ok: true,
                    data: response.data
                };



            } catch (error) {
                console.log("Error fra articleController");
                return {
                    ok: false,
                    error: {
                        code: 500,
                        message: "Controller not fetch articles",
                    },
                }
                
            }
        }
    }
    
}

export const articleController = createArticleController(articleService);