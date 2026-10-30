import { ArticleDTO } from "./article-mapper";

const MOCK_API_BASE_URL = "https://api.mockapi.com";
const GET_ALL_ARTICLES_ENDPOINT = "/api/v1/articles";

export type ArticleResult<T> = 
|   { 
        ok: true, 
        data: T 
    }
|   { 
        ok: false, 
        error: {
            code: number,
            message: string
        }
    };

export async function getAllArticles(): Promise<ArticleResult<ArticleDTO[]>> {
    const GET_ALL_ARTICLES_URL = `${MOCK_API_BASE_URL}${GET_ALL_ARTICLES_ENDPOINT}`;
    
    try {
        const response = await fetch(GET_ALL_ARTICLES_URL);
            
        
        if (!response.ok) {
            throw new Error(`HTTP-feil: ${response.status}`);
        }

        const data: ArticleDTO[] = await response.json();
        return { ok:true, data: data };
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: {
                code: 500,
                message: "Failed to get articles."
            },
        };
    }
}