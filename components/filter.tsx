import React from "react";
import classnames from "classnames";
import { useAppContext } from "../contexts/appContext";
import { transformPrices } from "../utility";
import { PRICE_RANGES, PRODUCT_CATEGORIES } from "../utility/constants";
import { Button } from "./button";

const Filter = () => {
  const { isLargeTab, openFilter, toggleFilter } = useAppContext();

  if (isLargeTab && !openFilter) {
    return null;
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

            {PRODUCT_CATEGORIES.map((category, i) => (
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
                <input type="checkbox" name={`price-${j}`} id={`price-${j}`} />

                <label htmlFor={`price-${j}`}>{price.label}</label>
              </div>
            ))}
          </div>
        </div>

        {isLargeTab && (
          <div className="filter__footer">
            <div className="filter__footer-row">
              <Button text="clear" type="outline" />
              <Button text="save" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
