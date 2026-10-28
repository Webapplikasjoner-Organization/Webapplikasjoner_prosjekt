import { PageLayout } from "@/components/PageLayout";
import { LoginForm } from "@/features/users/components/LoginForm";
import { loginAction } from "@/features/users/actions";

export function LoginPage() {
  return (
    <PageLayout>
      <main className="flex flex-col items-center">
        <LoginForm action={loginAction} />
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
