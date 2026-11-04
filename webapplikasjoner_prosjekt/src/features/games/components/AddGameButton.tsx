"use client";

import { brandStyles } from "@/app/styles/brand-styles";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { saveGameID, removeGameIDFromCookies } from "@/features/users/actions";
import { useState, useEffect } from "react";

type AddGameButtonProps = {
  gameID: string | undefined;
};

export function AddGameButton({ gameID }: AddGameButtonProps) {
  const { user, gameIDs, addGameID, removeGameID } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [hasGameInLibrary, setHasGameInLibrary] = useState(false);

  useEffect(() => {
    const hasGame = () => {
      if (!gameID) return false;
      return gameIDs.includes(gameID);
    };
    setHasGameInLibrary(hasGame());
  }, [gameIDs, gameID, addGameID, removeGameID]);

  return user ? (
    <button
      className={
        hasGameInLibrary
          ? `${brandStyles.successButton} self-center`
          : `${brandStyles.button} self-center`
      }
      onClick={async () => {
        setIsSaving(true);
        if (user && gameID) {
          if (hasGameInLibrary) {
            await removeGameIDFromCookies(gameID);
            removeGameID(gameID);
          } else if (!gameIDs.includes(gameID)) {
            await saveGameID(gameID);
            addGameID(gameID);
          }
        }
        setIsSaving(false);
      }}
      disabled={isSaving}
    >
      {isSaving
        ? "Saving..."
        : hasGameInLibrary
          ? "In library"
          : "Add to your game library"}
    </button>
  ) : null;
}
