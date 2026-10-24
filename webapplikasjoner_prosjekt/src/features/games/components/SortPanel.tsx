"use client";

import { useState } from "react";

export function SortPanel() {
  const [sort, setSort] = useState("");

  const filteredGamesFromIGDB = `
      fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
      (where rating > 80 & rating_count > 50);
      sort ${sort};
      limit 10;`;

  return (
    <>
      <p>Sort by: </p>
      <ul className="flex flex-row flex-wrap gap-4">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="name asc">Title asc</option>
          <option value="name desc">Title desc</option>
          <option value="release_dates.human asc">Release date asc</option>
          <option value="release_dates.human desc">Release date desc</option>
          <option value="rating asc">Rating asc</option>
          <option value="rating desc">Rating desc</option>
        </select>
      </ul>
    </>
  );
}
