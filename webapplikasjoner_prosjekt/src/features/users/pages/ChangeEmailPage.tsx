import { PageLayout } from "@/components/PageLayout";
import { navigate } from "rwsdk/client";
import { useState } from "react";
import { brandStyles } from "@/app/styles/brand-styles";
import { ChangeEmailForm } from "../components/ChangeEmailForm";

export function ChangeEmailPage() {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <ChangeEmailForm />
      </main>
    </PageLayout>
  );
}
