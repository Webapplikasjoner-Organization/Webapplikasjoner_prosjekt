"use server";

import { PageLayout } from "@/components/PageLayout";
import { BasicLoginForm } from "@/features/users/components/BasicLoginForm";

export function LoginPage() {
  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <BasicLoginForm />
        <p>
          Don't have an account?{" "}
          <a href="/create-user" className="text-blue-500">
            Register here
          </a>
        </p>
      </main>
    </PageLayout>
  );
}
