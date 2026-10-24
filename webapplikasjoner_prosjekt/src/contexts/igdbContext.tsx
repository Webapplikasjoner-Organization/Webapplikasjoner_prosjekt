"use client";

import { createContext, useContext, useState } from "react";
import { Game } from "../types/game";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";

const gamesFromIGDB = `
fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
where rating > 80 & rating_count > 50;
sort rating desc;
limit 10;`;

type GameContextData = {
  games: Partial<Game>[];
  getGames: () => Promise<Partial<Game>[]>;
};

const GamesContext = createContext<GameContextData | null>(null);

export function GamesProvider({ children }: { children: React.ReactNode }) {
  let games: Partial<Game>[] = [];

  const getGames = async (): Promise<Partial<Game>[]> => {
    const fetchGames: Partial<Game>[] = await getIGDBContent(
      "games",
      gamesFromIGDB,
      CLIENTID,
    );
    games = fetchGames;
    return games;
  };

  return (
    <GamesContext.Provider value={{ games, getGames }}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);

  if (!context) {
    throw new Error("useGames must be used within a GamesProvider");
  }

  return context;
}
