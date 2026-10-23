"use client"

import { PageLayout } from "@/components/PageLayout";
import { CreateUserForm } from "@/features/users/components/CreateUserForm";
import { createUserAction } from "@/features/users/actions";

export function CreateUserPage() {
  return (
    <PageLayout>
      <main>
        <CreateUserForm action={createUserAction} />
      </main>
    </PageLayout>
  );
}
