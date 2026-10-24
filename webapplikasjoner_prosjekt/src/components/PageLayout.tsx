import { AuthProvider } from "@/contexts/AuthContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { GamesProvider } from "@/contexts/IgdbContext";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <AuthProvider>
      {/* <GamesProvider> */}
      <Header />
      {children}
      <Footer />
      {/* </GamesProvider> */}
    </AuthProvider>
  );
}
