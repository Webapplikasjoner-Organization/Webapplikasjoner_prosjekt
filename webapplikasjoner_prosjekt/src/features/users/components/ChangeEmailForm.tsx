"use client";

import { useState } from "react";
import { brandStyles } from "@/app/styles/brand-styles";

export function ChangeEmailForm() {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <form method="post" action="/change-email" className="pt-5 pb-5">
        <fieldset className="flex flex-col gap-4">
          <label>
            <input
              type="text"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className=" border-black border-3 rounded p-2 w-full"
            />
          </label>
          <button type="submit" className={brandStyles.button}>
            Change Email
          </button>
        </fieldset>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
