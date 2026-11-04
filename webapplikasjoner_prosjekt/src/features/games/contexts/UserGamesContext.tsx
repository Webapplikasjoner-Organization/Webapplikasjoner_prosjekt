"use client";

import { createContext, useContext } from "react";
import { Game } from "@/types/game";

type UserGamesContextData = {
  gamesList: Partial<Game>[];
};

const UserGamesContext = createContext<UserGamesContextData | null>(null);

type UserGamesProviderProps = {
  gamesList: Partial<Game>[];
  children: React.ReactNode;
};

export function UserGamesProvider({
  children,
  gamesList,
}: UserGamesProviderProps) {
  const value = { gamesList };

  return (
    <UserGamesContext.Provider value={value}>
      {children}
    </UserGamesContext.Provider>
  );
}

export function useUserGames() {
  const context = useContext(UserGamesContext);

  if (!context) {
    throw new Error("useUserGames must be used within a UserGamesProvider");
  }

  return context;
}
