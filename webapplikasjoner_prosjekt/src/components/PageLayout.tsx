import { Footer } from "./Footer";
import { Header } from "./Header";
import { GamesProvider } from "../contexts/igdbContext";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({children}: PageLayoutProps) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}