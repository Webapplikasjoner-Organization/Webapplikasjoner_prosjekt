import { Article } from "@/types/article";
import { ArticleResult } from "./article-api";
import { articleService, ArticleService } from "./article-service";

export interface ArticleController {
  listAll(): Promise<ArticleResult<Article[]>>;
  getById(id: string): Promise<ArticleResult<Article>>;
}

export function createArticleController(
  _service: ArticleService,
): ArticleController {
  return {
    async listAll() {
      try {
        const response = await articleService.listAll();

        if (!response.ok) return response;

        return {
          ok: true,
          data: response.data,
        };
      } catch (error) {
        console.log("Controller error: ", error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Controller not fetch articles",
          },
        };
      }
    },
    async getById(id: string) {
      try {
        const response = await articleService.getById(id);
        if (!response.ok) return response;

        return {
          ok: true,
          data: response.data,
        };
      } catch (error) {
        console.log("Controller error: ", error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Could not fetch the article",
          },
        };
      }
    },
  };
}

export const articleController = createArticleController(articleService);
