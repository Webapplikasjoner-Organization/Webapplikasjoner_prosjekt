"use client";

import { brandStyles } from "@/app/styles/brand-styles";
import { useState } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";

type LikeButtonProps = {
  gameName: string | undefined;
};

export function LikeButton({ gameName }: LikeButtonProps) {
  const { user } = useAuth();

  const [isLiked, setIsLiked] = useState(false);

  return user ? (
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
  ) : null;
}
