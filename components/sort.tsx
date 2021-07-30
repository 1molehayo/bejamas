import { useAppContext } from "../contexts/appContext";

export const SortProducts = () => {
  const { isTab, toggleFilter } = useAppContext();

  return (
    <div className="sort">
      {isTab && (
        <button onClick={toggleFilter} className="sort__mobile">
          <span className="icon-settings" />
        </button>
      )}

      {!isTab && (
        <div className="sort__desktop">
          <button>
            <span className="icon-sort" />
          </button>

          <span className="sort__text">Sort By</span>

          <select name="sort" id="sort">
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="price" selected>
              Price
            </option>
          </select>
        </div>
      )}
    </div>
  );
};
