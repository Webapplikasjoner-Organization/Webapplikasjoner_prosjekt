"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Game } from "../../../types/game";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";

const gamesFromIGDB = `
fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
where rating > 80 & rating_count > 50;
sort rating desc;
limit 10;`;

type GameContextData = {
  gamesList: Partial<Game>[];
  getGamesList: () => Promise<void>;
};

const GamesContext = createContext<GameContextData | null>(null);

type GamesProviderProps = {
  children: React.ReactNode;
};

export function GamesProvider({ children }: GamesProviderProps) {
  const [gamesList, setGamesList] = useState<Partial<Game>[]>([]);

  const getGamesList = async () => {
    const fetchGames: Partial<Game>[] = (await getIGDBContent(
      "games",
      gamesFromIGDB,
      CLIENTID,
    )) as Partial<Game>[];
    setGamesList(fetchGames);
  };

  useEffect(() => {
    getGamesList();
  }, []);

  const value = { gamesList, getGamesList };

  return (
    <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);

  if (!context) {
    throw new Error("useGames must be used within a GamesProvider");
  }

  return context;
}
