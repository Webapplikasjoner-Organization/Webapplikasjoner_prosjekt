import { PageLayout } from "@/components/PageLayout";
import { ChangePasswordForm } from "../components/ChangePasswordForm";

export function ChangePasswordPage() {
  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <ChangePasswordForm />
      </main>
    </PageLayout>
  );
}
