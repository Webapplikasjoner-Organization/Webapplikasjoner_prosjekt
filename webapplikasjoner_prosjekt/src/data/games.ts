import { Game } from "@/types/game";

export const GAMES: Game[] = [
  {
    id: "1",
    title: "Game 1",
    boxArtImageURL: "https://placehold.co/300x300/orange/white",
    genres: ["Action", "Adventure"],
    releaseDate: new Date("Feb 07, 2012"),
    description: "This is the description for Game 1."
  },
  {
    id: "2",
    title: "Game 2",
    boxArtImageURL: "https://placehold.co/300x300/orange/white",
    genres: ["Strategy", "RPG"],
    releaseDate: new Date("Feb 07, 2023"),
    description: "This is the description for Game 2."
  },
  {
    id: "3",
    title: "Game 3",
    boxArtImageURL: "https://placehold.co/300x300/orange/white",
    genres: ["Simulation", "Casual"],
    releaseDate: new Date("Feb 09, 2023"),
    description: "This is the description for Game 3."
  },
  {
    id: "4",
    title: "Game 4",
    boxArtImageURL: "https://placehold.co/300x300/orange/white",
    genres: ["Puzzle", "Indie"],
    releaseDate: new Date("Mar 15, 2023"),
    description: "This is the description for Game 4."
  },
  {
    id: "5",
    title: "Game 5",
    boxArtImageURL: "https://placehold.co/300x300/orange/white",
    genres: ["Horror", "Thriller"],
    releaseDate: new Date("Apr 20, 2023"),
    description: "This is the description for Game 5."
  },
  {
    id: "6",
    title: "Game 6",
    boxArtImageURL: "https://placehold.co/300x300/orange/white",
    genres: ["Racing", "Sports"],
    releaseDate: new Date("May 10, 2023"),
    description: "This is the description for Game 6."
  }
]