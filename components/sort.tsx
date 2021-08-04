import { fetchProducts } from "../pages/api";
import { useAppContext } from "../contexts/appContext";

export const SortProducts = () => {
  const {
    isTab,
    toggleFilter,
    updateFirstDoc,
    updateLastDoc,
    updateCurrentPage,
    updateProducts,
    filterProps,
    sortProps,
    updateSortProps,
    toggleLoader,
  } = useAppContext();

  const sortBy = async (val: string) => {
    toggleLoader();

    try {
      updateSortProps(val);
      const res = await fetchProducts("next", 0, filterProps, val);
      updateFirstDoc(res.firstDoc);
      updateLastDoc(res.lastDoc);
      updateCurrentPage(1);
      updateProducts(res.products);
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader();
    }
  };

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

          <select
            name="sort"
            id="sort"
            value={sortProps}
            onChange={(e) => sortBy(e.target.value)}
          >
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
            <option value="price">Price</option>
          </select>
        </div>
      )}
    </div>
  );
};
