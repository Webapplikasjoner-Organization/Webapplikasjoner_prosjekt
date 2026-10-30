"use client";

import { getRandomNumber } from "../shared/utils/get-random-number";
import { useState } from "react";
import { brandStyles } from "@/app/styles/brand-styles";

export function Footer() {
  const [number, setNumber] = useState<number | undefined>(undefined);

  return (
    <footer className="flex flex-col items-center gap-4 pt-5 pb-5 text-center bg-brand-grey">
      <p className="text-brand-white">Contact: daniel.p.karlsen@hiof.no</p>
      <button
        onClick={() => setNumber(getRandomNumber(0, 100))}
        className={brandStyles.button}
      >
        Generate a random number
      </button>
      {number === undefined ? (
        <p>_</p>
      ) : (
        <p className="text-brand-white">{number}</p>
      )}
    </footer>
  );
}
