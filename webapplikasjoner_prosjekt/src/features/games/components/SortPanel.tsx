export function SortPanel() {
  return (
    <>
      <p>Sort by: </p>
      <ul className="flex flex-row flex-wrap gap-4">
        <li><button>{`Title (Asc)`}</button></li>
        <li><button>{`Title (Desc)`}</button></li>
        <li><button>{`Release date (Asc)`}</button></li>
        <li><button>{`Release date (Desc)`}</button></li>
      </ul>
    </>
  );
}