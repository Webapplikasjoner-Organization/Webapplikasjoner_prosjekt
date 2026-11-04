import { ArticleResult, getAllArticles, getArticleById } from "./article-api";
import { ArticleDTO } from "./article-mapper";

export interface ArticleRepository {
  listAll(): Promise<ArticleResult<ArticleDTO[]>>;
  getById(id: string): Promise<ArticleResult<ArticleDTO>>;
}

export function createArticleRepository(): ArticleRepository {
  return {
    async listAll() {
      try {
        const result = await getAllArticles();

        if (!result.ok) {
          return result;
        }

        return {
          ok: true,
          data: result.data,
        };
      } catch (error) {
        console.log("Repository error: ", error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Repository could not fetch articles",
          },
        };
      }
    },
    async getById(id: string) {
      try {
        const result = await getArticleById(id);
        if (!result.ok) {
          return result;
        }

        const article = result.data;
        if (!article) {
          return {
            ok: false,
            error: {
              code: 404,
              message: "Article not found",
            },
          };
        }

        return {
          ok: true,
          data: article,
        };
      } catch (error) {
        console.log("Repository error: ", error);
        return {
          ok: false,
          error: {
            code: 500,
            message: "Repository could not fetch the article",
          },
        };
      }
    },
  };
}

export const articleRepository = createArticleRepository();
