
import { ArticleResult, getAllArticles } from "./article-api"
import { ArticleDTO } from "./article-mapper";


export interface ArticleRepository {
    listAll(): Promise<ArticleResult<ArticleDTO[]>>; 
}

export function createArticleRepository(): ArticleRepository {
    return {
        async listAll() {
            try {
            console.log("articleRepository kjører");
            const result = await getAllArticles();

            if (!result.ok) {
                return result;
            }

            console.log("Repository data er array:", Array.isArray(result.data));
            console.log("Repository data:", result.data);

            return {
                ok: true,
                data: result.data,
            };
            } catch (error) {
                console.log("Error fra articleRepository");
                return {
                    ok: false,
                    error: {
                        code: 500,
                        message: "Repository could not fetch articles",
                    },
                }
                
            }
            
        },
    };
}


export const articleRepository = createArticleRepository();