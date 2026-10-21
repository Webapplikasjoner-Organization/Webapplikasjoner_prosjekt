"use client";

import type { RequestInfo } from "rwsdk/worker";
import { useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import { brandStyles } from "@/app/styles/brand-styles";
import { findUserById } from "@/features/users/user-api";
import { navigate } from "rwsdk/client";

export async function UserProfile({ params }: RequestInfo) {
  const { id } = params;

  const user = await findUserById(id);

  if (!user.ok) {
    return navigate("/create-user");
  }

  return (
    <PageLayout>
      <main className="flex flex-col gap-4 items-center">
        <h1>{`${user.data.username}'s page`}</h1>
        <button className={brandStyles.button}>
          <a href="/">Change profile picture</a>
        </button>
        <button className={brandStyles.button}>
          <a href="/my-games">My Games</a>
        </button>
        <button className={brandStyles.button}>
          <a href={`/users/${id}/change-username`}>Change username</a>
        </button>
        <button className={brandStyles.button}>
          <a href={`/users/${id}/change-password`}>Change password</a>
        </button>
        <button className={brandStyles.button}>
          <a className="text-red-600" href={`/users/${id}/delete-account`}>
            Delete account
          </a>
        </button>
      </main>
    </PageLayout>
  );
}
