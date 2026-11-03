"use client";

import { brandStyles } from "@/app/styles/brand-styles";
import { useState } from "react";

type AddGameButtonProps = {
  gameName: string | undefined;
};

export function AddGameButton({ gameName }: AddGameButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <button
      className={
        isAdded
          ? `${brandStyles.successButton} self-center`
          : `${brandStyles.button} self-center`
      }
      onClick={() => setIsAdded(!isAdded)}
    >
      {isAdded ? "In library" : "Add to your game library"}
    </button>
  );
}
