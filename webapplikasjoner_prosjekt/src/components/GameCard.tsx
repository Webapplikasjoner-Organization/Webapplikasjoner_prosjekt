import { Game } from "@/types/game";

export function GameCard({ game }: { game: Game }) {
  const { id, title, boxArtImageURL, genres, releaseDate, description } = game;

  return (
    <article className="pt-10 pb-10 w-75">
      <a href={`/games/${id}`}><img src={boxArtImageURL} alt={`${title} box-art`} width="300" height="300" /></a>
      <section className="flex flex-col flex-wrap bg-[#d7d7d7]">
        <a href={`/games/${id}`}><p><span className="font-bold">Title: </span>{title}</p></a>
        <p><span className="font-bold">Genres: </span>{genres.join(", ")}</p>
        <p><span className="font-bold">Release Date: </span>{releaseDate.toLocaleDateString()}</p>
        <p><span className="font-bold">Description: </span>{description}</p>
        <p>Like button</p>
      </section>
    </article>
  )
}