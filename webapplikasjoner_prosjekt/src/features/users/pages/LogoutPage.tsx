import { PageLayout } from "@/components/PageLayout";

export function LogoutPage() {
  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <p>Are you sure you want to log out?</p>
        <form method="get" action="/logout">
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Log Out
          </button>
        </form>
      </main>
    </PageLayout>
  );
}
