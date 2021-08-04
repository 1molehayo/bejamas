import React, { useCallback, useEffect } from "react";
import classnames from "classnames";
import { useAppContext } from "../contexts/appContext";
import { transformPrices } from "../utility";
import { Button } from "./button";
import { fetchProducts } from "../pages/api";
import { CURRENCY_SYMBOLS } from "../utility/constants";
import { useDebounce } from "../services/useDebounce";
import CurrencyOptions from "../models/currency";

interface IProps {
  productCategories: string[];
  productPrices: string[];
  currency: string;
}

export const Filter = ({
  productCategories,
  productPrices,
  currency,
}: IProps) => {
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

  const { price, categories } = filterProps;

  const debouncedFilteredProps = useDebounce(filterProps, 500);

  useEffect(
    () => {
      if (debouncedFilteredProps) {
        toggleLoader();

        fetchProducts("next", 0, debouncedFilteredProps, sortProps).then(
          (res) => {
            updateFirstDoc(res.firstDoc);
            updateLastDoc(res.lastDoc);
            updateCurrentPage(1);
            updateProducts(res.products);
            toggleLoader();
          }
        );
      } else {
        updateProducts([]);
        toggleLoader();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedFilteredProps]
  );

  const handleCheckBox = async (value: string) => {
    let arr = [...categories];
    const index = arr.findIndex((elem) => elem === value);

    if (index === -1) {
      arr.push(value);
    } else {
      arr.splice(index, 1);
    }

    updateFilterProps({
      categories: arr,
      price,
    });
  };

  const handleRadioBox = async (value: string) => {
    console.log(value);
    updateFilterProps({
      categories,
      price: value,
    });
  };

  const onFilterMobile = async (newProps: any) => {
    toggleLoader();

    try {
      const res = await fetchProducts(
        "next",
        0,
        newProps || filterProps,
        sortProps
      );
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
      await onFilterMobile({
        categories: [],
        price: "",
      });

      updateFilterProps({
        categories: [],
        price: "",
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
                  value={category}
                  checked={categories.includes(category)}
                  onChange={(e) => handleCheckBox(e.target.value)}
                />

                <label htmlFor={`category-${i}`}>{category}</label>
              </div>
            ))}
          </div>

          <hr className="divider" />

          <div>
            <h4>Price range</h4>

            {transformPrices(
              CURRENCY_SYMBOLS[currency as keyof CurrencyOptions],
              productPrices
            ).map((priceItem, j) => (
              <div key={j} className="checkbox">
                <input
                  type="radio"
                  value={priceItem.value}
                  checked={price === priceItem.value}
                  onChange={(e) => handleRadioBox(e.target.value)}
                  name={`price-${j}`}
                  id={`price-${j}`}
                />

                <label htmlFor={`price-${j}`}>{priceItem.label}</label>
              </div>
            ))}
          </div>
        </div>

        {isLargeTab && (
          <div className="filter__footer">
            <div className="filter__footer-row">
              <Button text="clear" type="outline" onClick={onReset} />
              <Button text="save" onClick={onFilterMobile} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
