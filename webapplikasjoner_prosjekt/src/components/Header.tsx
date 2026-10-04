"use client";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="flex justify-between bg-brand-grey p-5">
      <a href="/"><img src="/images/checkpoint.png" width="150" height="150" alt="Checkpoint Logo"/></a>
      <nav className="flex flex-row items-center">
        <ul className="flex flex-row gap-5 text-brand-white">
          <li><a href="/">Home</a></li>
          <li><a href="/my-games">My Games</a></li>
          <li><a href="/articles">Articles</a></li>
        </ul>
      </nav>
      <div className="flex flex-row items-center gap-4">
        <SearchBar />
        <a href="/create-user"><img src="https://placehold.co/50x50/blue/white" alt="placeholder"/></a>
      </div>
    </header>
  )
}

