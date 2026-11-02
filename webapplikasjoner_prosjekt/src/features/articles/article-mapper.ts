import { Article } from "@/types/article";

export type ArticleDTO = {
    id: string,
    title: string,
    image: string,
    description: string
};

export function toArticle(articleDTO: ArticleDTO): Article {
    console.log("Mapper toArticle blir kjørt");
    return {
        id: articleDTO.id,
        title: articleDTO.title,
        articleImageURL: articleDTO.image,
        content: articleDTO.description
    }
}
