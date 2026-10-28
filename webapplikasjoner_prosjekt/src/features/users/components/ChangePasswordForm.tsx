"use client";

import { brandStyles } from "@/app/styles/brand-styles";
import { navigate } from "rwsdk/client";
import { useState } from "react";

export function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <form>
        <fieldset>
          <label>
            New Password:
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (!newPassword) {
                setError("The new password cannot be empty.");
                return;
              }
              navigate("/");
            }}
            className={brandStyles.button}
          >
            Change Password
          </button>
        </fieldset>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}
