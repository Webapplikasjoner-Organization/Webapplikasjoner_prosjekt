import { PageLayout } from "@/components/PageLayout";
import { ChangeEmailForm } from "../components/ChangeEmailForm";

export function ChangeEmailPage() {
  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <ChangeEmailForm />
      </main>
    </PageLayout>
  );
}
