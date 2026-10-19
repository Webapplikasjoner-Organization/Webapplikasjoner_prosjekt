import { PageLayout } from "@/components/PageLayout";
import { requestInfo } from "rwsdk/worker";
import { parseParams } from "@/utils/parse-params";
import { userService } from "@/features/users/user-service";
import { Suspense } from "react";

export async function UsersPage() {
  const { ctx, request } = requestInfo;
  const params = parseParams(request);
  const result = await userService.list(params);

  return (
    <PageLayout>
      <main className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">Users page</h1>
        <Suspense fallback={<p>Loading users...</p>}>
          <ul>
            {result.ok ? (
              result.data.length > 0 ? (
                result.data.map((user) => (
                  <li key={user.id}>{user.username}</li>
                ))
              ) : (
                <li>No users found</li>
              )
            ) : (
              <li>{result.error.message}</li>
            )}
          </ul>
        </Suspense>
      </main>
    </PageLayout>
  );
}
