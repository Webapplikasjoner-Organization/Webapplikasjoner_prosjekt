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
  const [sort, setSort] = useState("");

  return (
    <form>
      <p>Filters: </p>
      <ul className="flex flex-row flex-wrap gap-4">
        <li className="flex flex-row flex-wrap gap-4">
          Genres:
          <select onChange={(e) => setGenreFilter(e.target.value)}>
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </li>
        <li className="flex flex-row flex-wrap gap-4">
          Platforms:
          <select onChange={(e) => setPlatformFilter(e.target.value)}>
            {platforms?.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </li>
      </ul>
      <p>Sort by: </p>
      <ul className="flex flex-row flex-wrap gap-4">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="rating asc">Rating asc</option>
          <option value="rating desc">Rating desc</option>
        </select>
      </ul>
      <button type="submit" className={`${brandStyles.button}`}>
        <a
          href={`/?genrefilter=${genrefilter}&platformfilter=${platformfilter}&sort=${sort}`}
        >
          Apply Sorting and Filtering
        </a>
      </button>
    </form>
  );
}
