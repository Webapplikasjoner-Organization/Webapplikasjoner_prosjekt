import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { requestInfo } from "rwsdk/worker";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { ctx } = requestInfo;
  const { user, randomNumbers } = ctx;

  return (
    <AuthProvider user={user} randomNumbers={randomNumbers ?? []}>
      <Header />
      {children}
      <Footer />
    </AuthProvider>
  );
}
