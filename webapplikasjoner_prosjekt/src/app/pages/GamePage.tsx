import { PageLayout } from "@/components/PageLayout";
import { GAMES } from "@/data/games";
import { Game } from "@/types/game";

/*
export default function GamePage({params}) {
  const { id } = params;

  const game: Game = GAMES.find((game) => game.id === id);

  const { title, boxArtImageURL, genres, releaseDate, description } = game;

  return (
    <PageLayout>
      <main>
        {game ? (
          <>
            <img src={boxArtImageURL} alt={`${title} box-art`} width="300" height="300" />
            <p>Title: {title}</p>
            <p><span className="font-bold">Genres: </span>{genres.join(", ")}</p>
            <p><span className="font-bold">Release Date: </span>{releaseDate.toLocaleDateString()}</p>
            <p><span className="font-bold">Description: </span>{description}</p>
          </>
        ) : (
          <p>The game could not be found.</p>
        )}
      </main>
    </PageLayout>
  );
}
*/