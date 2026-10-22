import { createContext, useContext, useState } from "react";
import { Game } from "../types/game";
import { GAMES } from "@/data/games";

type GameContextData = {
  games: Game[],
  getGames: () => Promise<Game[]>,
}

const GamesContext = createContext<GameContextData | null>(null);

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useState<Game[]>(GAMES);

  const getGames = async (): Promise<Game[]> => {
    // Implement your logic to fetch games here
    const fetchedGames: Game[] = []; // Replace with actual fetching logic
    setGames(fetchedGames);
    return fetchedGames;
  };

  return (
    <GamesContext value={{ games, getGames }}>
      {children}
    </GamesContext>
  );
}

export function useGames() {
  const context = useContext(GamesContext);

  if (!context) {
    throw new Error("useGames must be used within a GamesProvider");
  }

  return context;
}