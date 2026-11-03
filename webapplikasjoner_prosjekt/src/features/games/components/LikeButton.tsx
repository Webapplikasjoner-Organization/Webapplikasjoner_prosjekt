"use client";

import { brandStyles } from "@/app/styles/brand-styles";
import { useState } from "react";

type LikeButtonProps = {
  gameName: string | undefined;
};

export function LikeButton({ gameName }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <button
      className={
        isLiked
          ? `${brandStyles.successButton} self-center`
          : `${brandStyles.button} self-center`
      }
      onClick={() => setIsLiked(!isLiked)}
    >
      {isLiked ? "Liked" : "Like"}
    </button>
  );
}
