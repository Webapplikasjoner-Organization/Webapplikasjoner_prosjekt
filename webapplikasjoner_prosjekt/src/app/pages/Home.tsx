import { Counter } from "@/components/Counter";
import { TimeClient } from "@/components/TimeClient";
import { GameList } from "../../features/games/components/GameList";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageLayout } from "@/components/PageLayout";
import { FilterPanel } from "@/features/games/components/FilterPanel";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { Game } from "@/types/game";
import { useEffect, useState } from "react";
import type { Filter } from "@/types/filter";

/**
 * En server-komponent. Den kjører på serveren, én gang per forespørsel, og
 * nettleseren får ferdig HTML. Derfor viser klokka under tidspunktet på
 * serveren, og den endrer seg bare når du laster siden på nytt.
 *
 * Server-komponent er standarden i RedwoodSDK. Trenger du klikk eller state,
 * lager du en klient-komponent, som `TimeClient` og `Counter` under.
 */

type HomeProps = {
  request?: Request;
  params?: Record<string, string>;
};

export async function Home({ request, params }: HomeProps) {
  const genres = (await getIGDBContent(
    "genres",
    "fields name; limit 100; sort name asc;",
    CLIENTID,
  )) as Filter[];
  const platforms = (await getIGDBContent(
    "platforms",
    "fields name; limit 300; sort name asc;",
    CLIENTID,
  )) as Filter[];

  return (
    <PageLayout>
      <main className="flex flex-col gap-10">
        <h1>Main page</h1>
        <GameList
          filterPanel={<FilterPanel genres={genres} platforms={platforms} />}
          request={request}
          params={params}
        />
      </main>
    </PageLayout>
  );
}
