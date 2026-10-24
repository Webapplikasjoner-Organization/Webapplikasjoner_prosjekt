"use client";

import { useState } from "react";

export function FilterPanel() {
  const [filter, setFilter] = useState("");

  const filteredGamesFromIGDB = `
    fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
    (where rating > 80 & rating_count > 50) & (where genres.name = "${filter}" | where platforms.name = "${filter}");
    sort rating desc;
    limit 10;`;

  return (
    <>
      <p>Filters: </p>
      <ul className="flex flex-row flex-wrap gap-4">
        <li className="flex flex-row flex-wrap gap-4">
          Genres:
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
          </select>
        </li>
        <li className="flex flex-row flex-wrap gap-4">
          Platforms:
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Switch</option>
          </select>
        </li>
      </ul>
    </>
  );
}
