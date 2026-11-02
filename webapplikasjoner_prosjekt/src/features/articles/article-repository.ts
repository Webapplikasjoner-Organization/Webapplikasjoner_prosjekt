import { ArticleResult, getAllArticles } from "./article-api"
import { ArticleDTO } from "./article-mapper";

export interface ArticleRepository {
    listAll(): Promise<ArticleResult<ArticleDTO[]>>; 
}

export function createArticleRepository(): ArticleRepository {
    return {
        async listAll() {
            const result = await getAllArticles();

            if (!result.ok) {
                return result;
            }

            return {
                ok: true,
                data: result.data,
            };
        },
    };
}


export const articleRepository = createArticleRepository();