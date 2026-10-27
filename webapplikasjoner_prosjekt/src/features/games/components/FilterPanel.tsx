"use client";

import { useState, useEffect } from "react";
import { brandStyles } from "@/app/styles/brand-styles";

type FilterPanelProps = {
  genres?: { id: number; name: string }[];
  platforms?: { id: number; name: string }[];
};

export function FilterPanel({ genres, platforms }: FilterPanelProps) {
  const [genrefilter, setGenreFilter] = useState("");
  const [platformfilter, setPlatformFilter] = useState("");

  useEffect(() => {
    setGenreFilter(
      new URLSearchParams(window.location.search).get("genrefilter") || "",
    );
    setPlatformFilter(
      new URLSearchParams(window.location.search).get("platformfilter") || "",
    );
  }, []);

  return (
    <form>
      <ul className="flex flex-row flex-wrap gap-4 pl-3 pt-3">
        <li className="flex flex-row flex-wrap gap-4">
          <p className="font-bold">Genres:</p>
          <select
            onChange={(e) => setGenreFilter(e.target.value)}
            className="bg-red-400 border-solid border-2"
            value={genrefilter}
          >
            <option>All</option>
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </li>
        <li className="flex flex-row flex-wrap gap-4">
          <p className="font-bold">Platforms:</p>
          <select
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="bg-red-400 border-solid border-2"
            value={platformfilter}
          >
            <option>All</option>
            {platforms?.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </li>
      </ul>
      <button type="submit" className={`${brandStyles.button}`}>
        <a
          href={`/?genrefilter=${genrefilter}&platformfilter=${platformfilter}`}
        >
          Apply Filtering
        </a>
      </button>
    </form>
  );
}
