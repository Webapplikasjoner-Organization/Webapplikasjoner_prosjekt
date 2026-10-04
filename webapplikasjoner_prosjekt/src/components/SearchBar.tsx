import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <form action={`/search-results/${query}`}>
      <input className="bg-brand-black text-brand-white border-solid border-3 border-brand-cyan mr-5 p-2" type="text" placeholder="Search games..." value={query} onChange={(e) => setQuery(e.target.value)}/>
    </form>
  );
}

