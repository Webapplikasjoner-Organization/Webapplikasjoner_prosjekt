// Testdata. Kjør med:
//   npm run seed      (eller pnpm seed)
//
// Poenget med en seed er at databasen kan nullstilles til en kjent tilstand.
// Slett .wrangler/, kjør migrasjonene og denne, så er dere tilbake der dere
// startet. Da slipper dere å lure på om feilen ligger i dataene.
import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users, games, articles } from "./schema";

export const seedData = async (env: Env) => {
  const db = drizzle(env.DB);

  // Tøm først, så seed kan kjøres om igjen uten å doble alt.
  await db.delete(users);
  await db.delete(games);
  await db.delete(articles);

  // Brukerne må inn før oppgavene: fremmednøkkelen krever at brukeren finnes.
  // Databasen nekter hvis dere tar rekkefølgen feil, og det er en god ting.

  // Jeg vet at passord ikke burde lagres slik i klartekst men jeg har det slik så lenge
  // helt til jeg finner ut av kryptering.
  await db.insert(users).values([
    {
      email: "jane.doe@example.com",
      password: "password456",
    },
    {
      email: "alice.smith@example.com",
      password: "password789",
    },
    {
      email: "bob.johnson@example.com",
      password: "password101",
    },
  ]);

  await db.insert(games).values([
    {
      name: "The Legend of Zelda: Tears of the Kingdom",
      cover: "https://example.com/zelda.jpg",
      genres: "Action, Adventure",
      rating: 5,
      releaseDate: new Date("2023-05-12"),
      summary: "An open-world adventure game set in the kingdom of Hyrule.",
    },
    {
      name: "Super Mario Odyssey",
      cover: "https://example.com/mario.jpg",
      genres: "Platformer",
      rating: 10,
      releaseDate: new Date("2017-09-27"),
      summary:
        "Join Mario on a globe-trotting adventure to save Princess Peach.",
    },
    {
      name: "Animal Crossing: New Horizons",
      cover: "https://example.com/animalcrossing.jpg",
      genres: "Simulation",
      rating: 8,
      releaseDate: new Date("2020-03-20"),
      summary:
        "A life simulation game where players develop a deserted island into a thriving community.",
    },
  ]);

  await db.insert(articles).values([
    {
      title: "Exciting new game released",
      content:
        "The latest installment in the popular game series has just been released.",
      articleImageURL: "https://example.com/article1.jpg",
    },
    {
      title: "Upcoming game announcement",
      content: "A highly anticipated game is set to release next year.",
      articleImageURL: "https://example.com/article2.jpg",
    },
    {
      title: "Game review: Clair Obscur: Expedition 33",
      content: "For those who come after.",
      articleImageURL: "https://example.com/article3.jpg",
    },
  ]);

  console.log("Seeding ferdig");
};

export default defineScript(async ({ env }) => {
  await seedData(env);
  return Response.json({ success: true });
});
