"use client";

import { brandStyles } from "@/app/styles/brand-styles";
import { useState } from "react";

export function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <form method="post" action="/change-password" className="pt-5 pb-5">
        <fieldset className="flex flex-col gap-4">
          <label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className=" border-black border-3 rounded p-2 w-full"
            />
          </label>
          <button type="submit" className={brandStyles.button}>
            Change Password
          </button>
        </fieldset>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}
