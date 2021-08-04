import React from "react";
import classnames from "classnames";
import { useAppContext } from "../contexts/appContext";
import { transformPrices } from "../utility";
import { PRICE_RANGES } from "../utility/constants";
import { Button } from "./button";
import { fetchProducts } from "../pages/api";

interface IProps {
  productCategories: string[];
}

export const Filter = ({ productCategories }: IProps) => {
  const {
    isLargeTab,
    openFilter,
    toggleFilter,
    updateFirstDoc,
    updateLastDoc,
    updateCurrentPage,
    updateProducts,
    filterProps,
    sortProps,
    updateFilterProps,
    toggleLoader,
  } = useAppContext();

  const { prices, categories } = filterProps;

  const onFilter = async () => {
    toggleLoader(true);

    try {
      const res = await fetchProducts("next", 0, filterProps, sortProps);
      updateFirstDoc(res.firstDoc);
      updateLastDoc(res.lastDoc);
      updateCurrentPage(1);
      updateProducts(res.products);
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };

  const onReset = async () => {
    try {
      await onFilter();
      updateFilterProps({
        selectedCategories: [],
        selectedPrices: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLargeTab && !openFilter) {
    return <div></div>;
  }

  return (
    <>
      {isLargeTab && (
        <div className={classnames("filter__backdrop", { fade: openFilter })} />
      )}

      <div className="filter">
        {isLargeTab && (
          <button onClick={toggleFilter} className="filter__close">
            <span className="icon-close" />
          </button>
        )}

        <div className="filter__body">
          <div>
            <h4>{isLargeTab ? "Filter" : "Category"}</h4>

            {productCategories.map((category, i) => (
              <div key={i} className="checkbox">
                <input
                  type="checkbox"
                  name={`category-${i}`}
                  id={`category-${i}`}
                />

                <label htmlFor={`category-${i}`}>{category}</label>
              </div>
            ))}
          </div>

          <hr className="divider" />

          <div>
            <h4>Price range</h4>

            {transformPrices("$", PRICE_RANGES).map((price, j) => (
              <div key={j} className="checkbox">
                <input type="radio" name={`price-${j}`} id={`price-${j}`} />

                <label htmlFor={`price-${j}`}>{price.label}</label>
              </div>
            ))}
          </div>
        </div>

        {isLargeTab && (
          <div className="filter__footer">
            <div className="filter__footer-row">
              <Button text="clear" type="outline" onClick={onReset} />
              <Button text="save" onClick={onFilter} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
