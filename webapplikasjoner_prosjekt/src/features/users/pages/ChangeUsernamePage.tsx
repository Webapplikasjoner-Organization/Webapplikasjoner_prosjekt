import { PageLayout } from "@/components/PageLayout";
import { navigate } from "rwsdk/client";
import { useState } from "react";
import { brandStyles } from "@/app/styles/brand-styles";
import { ChangeUsernameForm } from "../components/ChangeUsernameForm";

export function ChangeUsernamePage() {
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <ChangeUsernameForm />
      </main>
    </PageLayout>
  );
}
