# CheckPoint 🎮

CheckPoint er et studentprosjekt utviklet i emnet **Webapplikasjoner** ved Høgskolen i Østfold.

## Om prosjektet og hva appen gjør

CheckPoint er en interaktiv nettside for spillinteresserte. Formålet med appen er å finne og søke opp mange ulike spill som finnes, samtidig som brukeren kan holde oversikt over spillene de har lagret selv på ett sted.

Appen skal blant annet kunne vise spillartikler, nylig lanserte spill og informasjon om forskjellige spill. Brukeren skal også kunne opprette en personlig bruker og lage egne spillister.

Prosjektet utvikles som en del av emnet Webapplikasjoner og skal demonstrere bruk av moderne webutvikling, eksterne datakilder, komponentbasert utvikling, state-håndtering, navigasjon og testing.

## Gruppen

Prosjektet utvikles av **Gruppe W-01**.

**Gruppemedlemmer:**

- Aron Aronsen
- Daniel Pihlstrøm Karlsen
- Julie Åvold Stordal

## Funksjonalitet

Planlagt funksjonalitet i CheckPoint inkluderer blant annet:
- Opprette og administrere en personlig bruker
- Legge spill til en personlig spilliste
- Opprette offentlige eller private spillister
- Søke etter spill
- Se detaljert informasjon om spill
  - Plattform
  - Beskrivelse
  - Bilder
  - Trailer/video
  <br>
- Se nylig lanserte spill og spillrelaterte nyheter
- Filtrere og sortere spill
- Abonnere på spillartikler
- Rate og kommentere spillartikler
- Se spillister og kommentarer fra andre brukere
- Light/Dark Mode
- Håndtering av lasting og feilmeldinger

Appen skal hente informasjon fra minst én ekstern datakilde/API. <br>
Så langt:
- IGDB - https://api-docs.igdb.com/#getting-started

*En del av det som står her vil ikke være oppnådd til leveringsdatoen på grunn av at vi underestimerte omfanget og vanskeligheten av å utvikle prosjektet*

## Avgrensninger

For å holde prosjektet innenfor omfanget av emnet har vi også definert <br>
funksjonalitet som ikke skal være en del av løsningen.

Dette inkluderer blant annet:

- Vennelister
- Kjøp og salg av spill
- Kobling mot Steam eller andre spillplattformer
- Deling til sosiale medier
- Achievements / badges
- Mikrotransaksjoner
- Reklame
- Personlig spillstatistikk som antall timer spilt
- Brukerlagde guider
- Opplasting av egne videoer

## Teknologi

Prosjektet utvikles i RWSDK rammeverket sammen med React biblioteket.

Planlagt teknologi inkluderer blant annet:

- React
- RWSDK (Redwood Software Development Kit)
- JavaScript / TypeScript
- Git og GitHub
- GitHub Projects
- Ekstern API/datakilde
- Testing av komponenter og hovedflyt

## Prosjektstatus

🚧 **Under utvikling**

Prosjektet utvikles gjennom høstsemesteret 2026 som en del av emnet Webutvikling.

## Starte appen

1. Kopier url-en for prosjektet fra main-branchen og klon den i GitHub Desktop applikasjonen.
2. Kjør "npm install" i "webapplikasjoner_prosjekt" mappen.
3. Hent private og hemmelige nøkler og legg dem i en ".dev.vars" fil i for å bruke IGDB-api-et. Kontakt Daniel Karlsen for å få nøklene.
4. Kjør "npx wrangler types".
5. Kjør "npm run migrate:dev" og "npm run migrate:new" for å migrere schemaer til databasen og deretter "npm run generate".
6. Kjør "npm run dev" og åpne url-en i en nettleser.

## Tekniske detaljer

Tester kjøres med vitest rammeverket. Selve testfilene ligger i "__tests__" mappene under "pages", "components" og "features" mappene. De kjøres med "npm run test".

Ruter ligger samlet i "worker.tsx". Alle HTML-sider er en del av render(Document, []). API-ruter og mellomvarer ligger øverst innenfor defineApp. Grupper av relaterte API-ruter er importert fra "routes.ts" filer inni "features" mappen og pakket ut med "...".

Dummy data ligger innenfor "data" mappen. Den faktiske dataen vi bruker i prosjektet er i "db" mappen og fra IGDB-API-et. Det er schemaer for ulike typer dataer vi bruker i prosjektet som vi migrerer til databasen. "seed.ts" lager dataen vi bruker for å teste applikasjonen. Det er også zod-schemaer for typene inni "types" mappen. Databaselogikken bruker schemaen fra "db" mens komponentene bruker zod-schemaet fra "types". 

Komponenter som rendrer de faktiske HTML-sidene ligger i "pages". Underliggende komponenter som sidene i "pages" bruker ligger i "components". Å ha komponenter uavhengig fra sidene skaper fleksibilitet og mulighet til å bruke dem på tvers av sider potensielt med annerledes logikk sendt via props.

For å bruke IGDB-API-et trygt så måtte vi lagre nøklene et sted som ikke eksponerer dem i klartekst. Derfor er det best at de som ønsker å bruke applikasjonen kan stoles på og spør om nøklene selv direkte slik at nøklene forhåpentligvis ikke lekkes ut. 
