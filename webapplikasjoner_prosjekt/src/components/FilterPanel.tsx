export function FilterPanel() {
  return (
    <>
      <p>Filters: </p>
      <ul className="flex flex-row flex-wrap gap-4">
        <li className="flex flex-row flex-wrap gap-4">
          Genres:
          <select>
            <option>All</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>RPG</option>
            <option>Strategy</option>  
          </select>
        </li>
        <li className="flex flex-row flex-wrap gap-4">
          Platforms:
          <select>
            <option>All</option>
            <option>PC</option>
            <option>PlayStation</option>
            <option>Xbox</option>
            <option>Switch</option>
          </select>
        </li>
      </ul>
    </>
  );
}