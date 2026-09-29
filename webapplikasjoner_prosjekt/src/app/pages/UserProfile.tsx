import { PageLayout } from "@/components/PageLayout"

export default function UserProfile() {
  return (
    <PageLayout>
      <main className="flex flex-col gap-4 items-center">
        <h1>insert_username_here's page</h1>
        <button>Change profile picture</button>
        <a href="/my-games">My Games</a> 
        <a href="/change-password">Change password</a>
        <a className="text-red-600" href="/delete-account">Delete account</a>
      </main>
    </PageLayout>
  );
}