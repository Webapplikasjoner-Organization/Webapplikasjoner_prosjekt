"use client";

import { SearchBar } from "./SearchBar";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export function Header() {
  const { user } = useAuth();

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
            <a href="/articles">Articles</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
        </ul>
      </nav>
      <div className="flex flex-row items-center gap-4">
        <SearchBar />
        {!user && (
          <a href="/login">
            <img src="https://placehold.co/50x50/red/white" alt="placeholder" />
          </a>
        )}
        {user && (
          <a href={`/users/${encodeURIComponent(user.id)}`}>
            <img
              src="https://placehold.co/50x50/green/white"
              alt="user profile"
            />
          </a>
        )}
      </div>
    </header>
  );
}
