import PriceModel from "../models/price";
import { ImagePropModel, ImageURLModel } from "../models/image";
import { CURRENCY_SYMBOLS } from "./constants";
import CurrencyOptions from "../models/currency";

export const formatCharLength = (str: string, len: number): string =>
  str.length > len ? `${str.substring(0, len - 1)}...` : str;

export const transformPrices = (
  currency: string,
  prices: string[]
): PriceModel[] => {
  return prices.map((item) => {
    const arr = item.split("-");

    if (arr.length < 2) {
      return {
        value: `${item}`,
        label: `More than ${currency}${item}`,
      };
    }

    if (arr[0] == "0") {
      return {
        value: item,
        label: `Less than ${currency}${arr[1]}`,
      };
    }

    return {
      value: item,
      label: `${currency}${arr[0]} - ${currency}${arr[1]}`,
    };
  });
};

export const getOptimizedImage = (
  url: string,
  props: ImagePropModel
): string => {
  const imageProps: ImageURLModel = {
    ...props,
    auto: "compress",
    cs: "tinysrgb",
  };

  const urlParams = new URL(url);

  for (let [key, value] of Object.entries(imageProps)) {
    urlParams.searchParams.append(key, value);
  }

  return decodeURIComponent(urlParams.href.toString());
};

export const formatPrice = (currency_name: string, amount: number) => {
  const currency =
    CURRENCY_SYMBOLS[currency_name as keyof CurrencyOptions] || currency_name;
  return `${currency} ${amount}`;
};
