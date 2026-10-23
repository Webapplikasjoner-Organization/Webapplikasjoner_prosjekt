"use client";

import { useState } from "react";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="flex justify-between bg-brand-grey p-5">
      <a href="/">
        <img
          src="/images/checkpoint.png"
          width="150"
          height="150"
          alt="Checkpoint Logo"
        />
      </a>
      <nav className="flex flex-row items-center">
        <ul className="flex flex-row gap-5 text-brand-white">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/my-games">My Games</a>
          </li>
          <li>
            <a href="/articles">Articles</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
        </ul>
      </nav>
      <div className="flex flex-row items-center gap-4">
        <SearchBar />
        <a href="/create-user">
        {/* Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
          <svg 
          className="w-10 h-10 text-brand-cyan transition-colors hover:text-cyan-600"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 640 640">
          <path fill="currentColor"
          d="M320 312C386.3 312 440 258.3 440 192C440 
          125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 
          258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 
          112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 
          576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/>
          </svg>
        </a>
      </div>
    </header>
  );
}
