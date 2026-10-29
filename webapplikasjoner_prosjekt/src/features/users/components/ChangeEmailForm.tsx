"use client";

import { navigate } from "rwsdk/client";
import { useState } from "react";
import { brandStyles } from "@/app/styles/brand-styles";

export function ChangeEmailForm() {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <form>
        <fieldset>
          <label>
            New Email:
            <input
              type="text"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (!newEmail) {
                setError("The new email cannot be empty.");
                return;
              }
              navigate("/");
            }}
            className={brandStyles.button}
          >
            Change Email
          </button>
        </fieldset>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
