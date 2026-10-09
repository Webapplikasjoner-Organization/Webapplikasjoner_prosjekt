//Claude chatlog explaining how to use the igdb API.
//https://claude.ai/share/cbf3f386-cf06-47b9-810b-7f8b9e8884e2

import type { Game } from "@/types/game";
import {
  CLIENTID,
  CLIENTSECRET,
  PUBLIC_AUTHENTICATION_URL_BASE,
  PUBLIC_BASE_URL,
  GRANT_TYPE,
} from "@/constants/env_values";

async function getAccessToken(
  url_base: string,
  clientId: string,
  clientSecret: string,
  grantType: string,
): Promise<string> {
  try {
    const response = await fetch(
      `${url_base}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`,
      { method: "POST" },
    );

    if (!response.ok) {
      throw new Error(
        `Access token retreival error: ${response.status} ${await response.text()}`,
      );
    }

    const data = (await response.json()) as { access_token: string };
    return data.access_token;
  } catch (error) {
    throw new Error(`Failed to get access token: ${error}`);
  }
}

export async function getIGDBContent(
  endpoint: string,
  apicalypseQuery: string,
  clientId: string,
): Promise<Partial<Game>[]> {
  try {
    const accessToken = await getAccessToken(
      PUBLIC_AUTHENTICATION_URL_BASE,
      CLIENTID,
      CLIENTSECRET,
      GRANT_TYPE,
    );

    const response = await fetch(`${PUBLIC_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      },
      body: apicalypseQuery,
    });

    if (!response.ok) {
      throw new Error(
        `IGDB error: ${response.status} ${await response.text()}`,
      );
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to query IGDB: ${error}`);
  }
}
