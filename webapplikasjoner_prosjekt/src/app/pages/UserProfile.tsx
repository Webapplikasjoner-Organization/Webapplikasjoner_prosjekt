import { PageLayout } from "@/components/PageLayout"

export default function UserProfile() {
  return (
    <PageLayout>
      <main className="flex flex-col gap-4">
        <h1>insert_username_here's page</h1>
        <a href="/my-games">My Games</a> 
        <a href="/change-password">Change password</a>
      </main>
    </PageLayout>
  );
}