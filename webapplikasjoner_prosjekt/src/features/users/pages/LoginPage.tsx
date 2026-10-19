"use client";

import { PageLayout } from "@/components/PageLayout";
import { useState } from "react";
import { navigate } from "rwsdk/client";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();

  return (
    <PageLayout>
      <main>
        <h1 className="text-center text-5xl">Login</h1>
        <form className="flex justify-between items-center flex-col m-10 gap-2">
          <label>
            Username:
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="border-2 border-solid"
              type="text"
              placeholder="username"
            />
          </label>
          <label>
            Password:
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-2 border-solid"
              type="password"
              placeholder="password"
            />
          </label>
          <button
            className="w-fit border-2 border-solid p-1"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              navigate(`/users/${username}`);
              return;
            }}
          >
            Submit
          </button>
        </form>
        {error && <p className=" text-red-500">{error}</p>}
      </main>
    </PageLayout>
  );
}
