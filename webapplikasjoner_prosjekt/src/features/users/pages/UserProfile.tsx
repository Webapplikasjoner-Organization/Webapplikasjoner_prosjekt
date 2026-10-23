import type { RequestInfo } from "rwsdk/worker";
import { PageLayout } from "@/components/PageLayout";
import { brandStyles } from "@/app/styles/brand-styles";
// import { findUserById } from "@/features/users/user-api";
import { userService } from "@/features/users/user-service";
// import { navigate } from "rwsdk/client";
import { useAuth } from "@/contexts/AuthContext";

export async function UserProfile({ params, request }: RequestInfo) {
  const { id } = params;

  // Den her virker ikke på serveren da findUserById ikke bruker full url (det kreves på serveren)
  // const user = await findUserById(id);
  const user = await userService.findById(id);
  console.log(user, id);

  if (!user?.ok) {
    return Response.redirect(new URL("/create-user", request.url), 302);
  }

  // navigate virker kun i nettleseren (ikke på serveren)
  // if (!user.ok) {
  //   return navigate("/create-user");
  // }

  return (
    <PageLayout>
      <main className="flex flex-col gap-4 items-center">
        <h1>{`${user?.data?.username}'s page`}</h1>
        <button className={brandStyles.button}>
          <a href="/">Change profile picture</a>
        </button>
        <button className={brandStyles.button}>
          <a href={`/users/${id}/my-games`}>My Games</a>
        </button>
        <button className={brandStyles.button}>
          <a href={`/users/${id}/change-username`}>Change username</a>
        </button>
        <button className={brandStyles.button}>
          <a href={`/users/${id}/change-password`}>Change password</a>
        </button>
        <button className={brandStyles.button}>
          <a className="text-red-600" href={`/users/${id}/delete-account`}>
            Delete account
          </a>
        </button>
      </main>
    </PageLayout>
  );
}
