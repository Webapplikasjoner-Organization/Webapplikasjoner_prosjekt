import { Article } from "@/types/article";
import { ArticleResult } from "./article-api";
import { articleRepository, ArticleRepository } from "./article-repository";
import { toArticle } from "./article-mapper";

export interface ArticleService {
  listAll(): Promise<ArticleResult<Article[]>>;
  getById(id: string): Promise<ArticleResult<Article>>;
}

export function createArticleService(
  _repository: ArticleRepository,
): ArticleService {
  return {
    async listAll() {
      try {
        console.log("articleService kjører");
        const result = await _repository.listAll();
        console.log("MockAPI-respons:", result);

        if (!result.ok) {
          console.log("Respons i service ikke ok: ", result.error.message);
          return result;
        }

        return {
          ok: true,
          data: result.data.map(toArticle),
        };
      } catch (error) {
        console.log("Error fra articleService", error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Service not fetch articles",
          },
        };
      }
    },
    async getById(id: string) {
      try {
        const result = await _repository.getById(id);
        if (!result.ok) {
          console.log("Respons i service ikke ok: ", result.error.message);
          return result;
        }

        return {
          ok: true,
          data: toArticle(result.data),
        };
      } catch (error) {
        console.log("Error fra articleService", error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Service not fetch article",
          },
        };
      }
    },
  };
}

export const articleService = createArticleService(articleRepository);
