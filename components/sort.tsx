import { Dispatch, SetStateAction } from "react";
import { sortProducts } from "../apis";
import { useAppContext } from "../contexts/appContext";
import ProductModel from "../models/product";

interface IProps {
  setProducts: Dispatch<SetStateAction<any>>;
}

export const SortProducts = ({ setProducts }: IProps) => {
  const { isTab, toggleFilter } = useAppContext();

  const sortBy = async (val: string) => {
    try {
      const { products } = await sortProducts(val);
      setProducts(products);
    } catch (error) {
      console.log(error);
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
            defaultValue="price"
            onChange={(e) => sortBy(e.target.value)}
          >
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="price">Price</option>
          </select>
        </div>
      )}
    </div>
  );
};
