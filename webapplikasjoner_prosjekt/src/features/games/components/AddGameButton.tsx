"use client";

import { brandStyles } from "@/app/styles/brand-styles";
import { useState } from "react";
import { gameService } from "@/features/games/game-service";

type AddGameButtonProps = {
  gameId: string | undefined;
  gameName: string | undefined;
};

export async function AddGameButton({ gameId, gameName }: AddGameButtonProps) {
  const game = await gameService.findById(gameId);

  return (
    <button
      className={
        game?.ok && game?.data
          ? `${brandStyles.successButton} self-center`
          : `${brandStyles.button} self-center`
      }
      onClick={async () => {
        if (gameId) {
          await gameService.add(gameId);
        }
      }}
    >
      {game?.ok && game?.data ? "In library" : "Add to your game library"}
    </button>
  );
}
