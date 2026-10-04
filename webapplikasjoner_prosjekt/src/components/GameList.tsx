//Claude chatlog explaining how to use the igdb API.
//https://claude.ai/share/cbf3f386-cf06-47b9-810b-7f8b9e8884e2

import { GameCard } from "@/components/GameCard";
import { env } from "cloudflare:workers";
import { EXPO_PUBLIC_AUTHENTICATION_URL_BASE, EXPO_PUBLIC_BASE_URL, GRANT_TYPE } from "@/constants/env_values";
import { GAMES } from "@/data/games";
import { useEffect } from "react";

async function getAccessToken(clientId: string, clientSecret: string, grantType: string) {
  const response = await fetch(
    `${EXPO_PUBLIC_AUTHENTICATION_URL_BASE}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`,
    { method: "POST" }
  );
  const data = await response.json() as { access_token: string };
  return data.access_token; 
}

async function getIGDBContent(endpoint: string, apicalypseQuery: string, clientId: string, accessToken: string) {
  try 
  {
    const response = await fetch(`${EXPO_PUBLIC_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Client-ID": clientId,
      "Authorization": `Bearer ${accessToken}`,
    },
    body: apicalypseQuery,
  });

  if (!response.ok) {
    throw new Error(`IGDB error: ${response.status} ${await response.text()}`);
  }

  return response.json();
  } 

  catch (error) 
  {
    console.error("Failed to query IGDB:", error);
    throw error;
  } 
}

const tenOver80RatingGames = `
  fields name, rating, first_release_date;
  where rating > 80;
  sort rating desc;
  limit 10;
`;

export async function GameList({selection}: {selection?: number[]} = {selection: []}) {
  const clientId = env.CLIENT_ID;
  const clientSecret = env.CLIENT_SECRET;
  const accessToken = await getAccessToken(clientId, clientSecret, GRANT_TYPE);

  //const games = await getIGDBContent("games", tenOver80RatingGames, clientId, accessToken);

  return (
  /*
    <section className="flex flex-row flex-wrap justify-evenly gap-10">
      {
        games.map((game) => <p>{game.name}</p>)
      }
    </section>
  */
    
  <section className="flex flex-row flex-wrap justify-evenly gap-10">
    {(selection && selection.length > 0)
      ? GAMES.filter((game) => selection.includes(Number(game.id))).map((game) => <GameCard key={game.id} game={game} />)
      : GAMES.map((game) => <GameCard key={game.id} game={game} />)
    }
  </section> 
  )
}

