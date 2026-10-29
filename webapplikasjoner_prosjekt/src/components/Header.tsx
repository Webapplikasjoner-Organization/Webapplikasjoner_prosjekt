"use client";

import { SearchBar } from "./SearchBar";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTree } from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon
              icon={faTree}
              className="text-brand-white text-4xl"
            />
          </a>
        )}
        {user && (
          <a href={`/users/${encodeURIComponent(user.id)}`}>
            <FontAwesomeIcon
              icon={faUser}
              className="text-brand-white text-4xl"
            />
          </a>
        )}
      </div>
    </header>
  );
}
