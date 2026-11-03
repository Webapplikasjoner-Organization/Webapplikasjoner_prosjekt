import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { requestInfo } from "rwsdk/worker";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { ctx } = requestInfo;
  const { user, randomNumbers, gameIDs } = ctx;

  return (
    <AuthProvider
      user={user}
      randomNumbers={randomNumbers ?? []}
      gameIDs={gameIDs ?? []}
    >
      <Header />
      {children}
      <Footer />
    </AuthProvider>
  );
}
