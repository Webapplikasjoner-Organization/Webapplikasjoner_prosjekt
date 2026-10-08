"use client";

import { PageLayout } from "@/components/PageLayout";
import { useState } from "react";
import { navigate } from "rwsdk/client";

export function CreateUserPage() {
  const [username, setUsername] = useState("");
  const [previewUsername, setPreviewUsername] = useState<string>();
  const [password, setPassword] = useState("");
  const [previewPassword, setPreviewPassword] = useState<string>();
  const [error, setError] = useState<string>();

  return (
    <PageLayout>
      <main>
        <h1 className="text-center text-5xl">Create an account:</h1>
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
              setPreviewUsername(username);
              setPreviewPassword(password);
              console.log(`Username: ${username}, Password: ${password}`);
              if (!username || !password) {
                setError("Both a username and password are required.");
                return;
              }
              setError("");
              navigate(`/users/${username}`);
              return;
            }}
          >
            Submit
          </button>
        </form>
        {error && <p className=" text-red-500">{error}</p>}
        {previewUsername && previewPassword && (
          <aside>
            <p>{previewUsername}</p> <p>{previewPassword}</p>
          </aside>
        )}
      </main>
    </PageLayout>
  );
}
