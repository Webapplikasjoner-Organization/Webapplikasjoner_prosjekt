import { PageLayout } from "@/components/PageLayout";
import { GAMES } from "@/data/games";
import { Game } from "@/types/game";

export default function GamePage({params}: {params: {id: string}}) {
  const { id } = params;

  const game: Game | undefined = GAMES.find((game) => game.id === id);

  const { title, boxArtImageURL, genres, releaseDate, description } = game || {};

  return (
    <PageLayout>
      <main className="flex flex-col items-center pt-5 pb-5">
        {game ? (
          <article>
            <img src={boxArtImageURL} alt={`${title} box-art`} width="300" height="300" />
            <p>Title: {title}</p>
            <p><span className="font-bold">Genres: </span>{genres?.join(", ")}</p>
            <p><span className="font-bold">Release Date: </span>{releaseDate ? releaseDate.toLocaleDateString() : "N/A"}</p>
            <p><span className="font-bold">Description: </span>{description}</p>
            <button>See game series</button>
          </article>
        ) : (
          <p>The game could not be found.</p>
        )}
      </main>
    </PageLayout>
  );
}