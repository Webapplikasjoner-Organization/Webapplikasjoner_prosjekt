"use client";
import { useState } from "react";

export function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className="flex justify-between bg-brand-grey">
      <a href="/"><img src="/images/checkpoint.png" width="150" height="150" alt="Checkpoint Logo"/></a>
      <nav className="flex flex-row items-center">
        <ul className="flex flex-row gap-5 text-brand-white">
          <li><a href="/">Home</a></li>
          <li><a href="/my-games">My Games</a></li>
        </ul>
      </nav>
      <div className="flex flex-row items-center">
        <form action={`/search-results/${query}`}>
          <input className="bg-brand-black text-brand-white border-solid border-3 border-brand-cyan mr-5 p-2" type="text" placeholder="Search for games..." value={query} onChange={(e) => setQuery(e.target.value)}/>
          <button className="text-brand-white" type="submit">Search</button>
        </form>
        <a href="/create-user"><img src="https://placehold.co/50x50/blue/white" alt="placeholder"/></a>
        <a className="text-brand-white" href="/user-profile">Profile page</a>  
      </div>
    </header>
  )
}

