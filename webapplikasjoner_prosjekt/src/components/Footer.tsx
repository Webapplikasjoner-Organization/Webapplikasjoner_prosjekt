"use client";

import { getRandomNumber } from "../shared/utils/get-random-number";
import { useState } from "react";
import { saveRandomNumber } from "@/features/users/actions";
import { brandStyles } from "@/app/styles/brand-styles";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export function Footer() {
  const { user, randomNumbers, addRandomNumber } = useAuth();
  const [isMakingCookie, setIsMakingCookie] = useState(false);

  async function createNewNumber() {
    setIsMakingCookie(true);
    const newNumber = getRandomNumber(0, 100);
    await saveRandomNumber(newNumber);
    addRandomNumber(newNumber);
    setIsMakingCookie(false);
  }

  return (
    <footer className="flex flex-col items-center gap-4 pt-5 pb-5 text-center bg-brand-grey">
      <p className="text-brand-white">Contact: daniel.p.karlsen@hiof.no</p>
      {user && (
        <>
          <button
            onClick={createNewNumber}
            className={brandStyles.button}
            disabled={isMakingCookie}
          >
            <p>{isMakingCookie ? "Saving..." : "Generate a random number"}</p>
          </button>
          {randomNumbers === null ? null : randomNumbers?.length ===
            0 ? null : (
            <p className="text-brand-white">
              {randomNumbers.map((num, index) => (
                <span key={index}>
                  {String(num)}
                  {", "}
                </span>
              ))}
            </p>
          )}
        </>
      )}
    </footer>
  );
}
