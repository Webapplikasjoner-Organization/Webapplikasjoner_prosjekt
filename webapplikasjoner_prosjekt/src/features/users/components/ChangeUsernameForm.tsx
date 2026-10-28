"use client";

import { navigate } from "rwsdk/client";
import { useState } from "react";
import { brandStyles } from "@/app/styles/brand-styles";

export function ChangeUsernameForm() {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  return (
    <>
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
    </>
  );
}
