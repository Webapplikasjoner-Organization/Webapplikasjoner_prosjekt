import { PageLayout } from "@/components/PageLayout";

export function AddGame() {
  return (
      <>
       <form className="flex flex-row">
         <input type="text" placeholder="Search for a game..."/>
         <br />
         <button type="submit">Add to library</button>
       </form>
      </>
  );
}