import { brandStyles } from "@/app/styles/brand-styles";

export function AddGameButton({ gameId }: { gameId: string | undefined }) {
  return (
    <button className={brandStyles.button}>Add to your game library</button>
  );
}
