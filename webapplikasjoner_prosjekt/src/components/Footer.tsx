"use client";

import { getRandomNumber } from "../shared/utils/get-random-number";
import { useRef } from "react";
import { saveRandomNumber } from "@/features/users/actions";
import { brandStyles } from "@/app/styles/brand-styles";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export function Footer() {
  const { user, randomNumbers, addRandomNumber } = useAuth();

  return (
    <footer className="flex flex-col items-center gap-4 pt-5 pb-5 text-center bg-brand-grey">
      <p className="text-brand-white">Contact: daniel.p.karlsen@hiof.no</p>
      {user && (
        <>
          <button
            onClick={(event) => {
              const newNumber = getRandomNumber(0, 100);
              addRandomNumber(newNumber);
              saveRandomNumber(newNumber);
            }}
            className={brandStyles.button}
          >
            Generate a random number
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
