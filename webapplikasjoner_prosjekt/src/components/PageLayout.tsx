import { AuthProvider } from "@/contexts/AuthContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { RequestInfo } from "rwsdk/worker";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
