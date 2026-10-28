"use server";

import { PageLayout } from "@/components/PageLayout";
import { useState } from "react";
import { ChangePasswordForm } from "../components/ChangePasswordForm";

export function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <ChangePasswordForm />
      </main>
    </PageLayout>
  );
}
