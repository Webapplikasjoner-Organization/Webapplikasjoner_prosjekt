"use client";

import { PageLayout } from "@/components/PageLayout";
import { navigate } from "rwsdk/client";
import { useState } from "react";
import { brandStyles } from "@/app/styles/brand-styles";

export function ChangeUsernamePage() {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <form>
          <fieldset>
            <label>
              New Username:
              <input
                type="text"
                placeholder="Enter new username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </label>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (!newUsername) {
                  setError("The new username cannot be empty.");
                  return;
                }
                navigate("/");
              }}
              className={brandStyles.button}
            >
              Change Username
            </button>
          </fieldset>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </main>
    </PageLayout>
  );
}
