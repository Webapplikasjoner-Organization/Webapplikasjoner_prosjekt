import { Article } from "@/types/article";
import { ArticleResult, getAllArticles } from "./article-api"
import { toArticle } from "./article-mapper";

export interface ArticleRepository {
    listAll(): Promise<ArticleResult<Article[]>>; 
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
                data: result.data.map(toArticle),
            };
        },
    };
}