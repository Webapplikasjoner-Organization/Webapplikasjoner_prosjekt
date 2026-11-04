import { PageLayout } from "@/components/PageLayout";
import { userService } from "@/features/users/user-service";
import { brandStyles } from "@/app/styles/brand-styles";

export function DeleteAccountPage() {
  return (
    <PageLayout>
      <main className="flex flex-col gap-4 items-center">
        <p>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <form method="post" action="/delete">
          <button
            className={`${brandStyles.dangerButton} text-red-500`}
            type="submit"
          >
            Delete account
          </button>
        </form>
      </main>
    </PageLayout>
  );
}
