import { ArticleResult, getAllArticles } from "./article-api";
import { ArticleDTO } from "./article-mapper";

export interface ArticleRepository {
  listAll(): Promise<ArticleResult<ArticleDTO[]>>;
  getById(id: string): Promise<ArticleResult<ArticleDTO>>;
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
        };
      }
    },
    async getById(id: string) {
      try {
        const result = await getAllArticles(); // Assuming getAllArticles is used to fetch by ID as well
        if (!result.ok) {
          return result;
        }

        const article = result.data.find((a) => a.id === id);
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
        console.log("Error fra articleRepository getById");
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
