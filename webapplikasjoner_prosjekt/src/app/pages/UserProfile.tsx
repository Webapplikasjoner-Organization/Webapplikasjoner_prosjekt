import type { RequestInfo } from "rwsdk/worker";
import { PageLayout } from "@/components/PageLayout";

export default function UserProfile({ params }: RequestInfo) {
  const { username } = params;

  return (
    <PageLayout>
      <main className="flex flex-col gap-4 items-center">
        <h1>{`${username}'s page`}</h1>
        <a href="/">Change profile picture</a>
        <a href="/my-games">My Games</a>
        <a href={`/users/${username}/change-password`}>Change password</a>
        <a className="text-red-600" href={`/users/${username}/delete-account`}>
          Delete account
        </a>
      </main>
    </PageLayout>
  );
}
