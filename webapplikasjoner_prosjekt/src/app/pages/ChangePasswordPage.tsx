"use client";

import { PageLayout } from "@/components/PageLayout";
import { navigate } from "rwsdk/client";
import { useState } from "react";
import { brandStyles } from "@/app/styles/brand-styles";

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <PageLayout>
      <main className="flex flex-col items-center">
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
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </main>
    </PageLayout>
  );
}
