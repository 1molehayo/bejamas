import CurrencyOptions from "../models/currency";

export const PRICE_RANGES = ["0-19", "20-100", "101-200", "201"];

export const PRODUCT_CATEGORIES = [
  "People",
  "Premium",
  "Pets",
  "Food",
  "Landmarks",
  "Cities",
  "Nature",
];

export const CURRENCY_SYMBOLS: CurrencyOptions = {
  USD: "$", // US Dollar
  EUR: "€", // Euro
  CRC: "₡", // Costa Rican Colón
  GBP: "£", // British Pound Sterling
  ILS: "₪", // Israeli New Sheqel
  INR: "₹", // Indian Rupee
  JPY: "¥", // Japanese Yen
  KRW: "₩", // South Korean Won
  NGN: "₦", // Nigerian Naira
  PHP: "₱", // Philippine Peso
  PLN: "zł", // Polish Zloty
  PYG: "₲", // Paraguayan Guarani
  THB: "฿", // Thai Baht
  UAH: "₴", // Ukrainian Hryvnia
  VND: "₫", // Vietnamese Dong
};

export const PRODUCTS = [
  {
    id: "1",
    name: "Red Bench",
    category: "people",
    price: 3.89,
    currency: "USD",
    image: {
      src: "https://images.pexels.com/photos/1223649/pexels-photo-1223649.jpeg",
      alt: "",
    },
    bestseller: true,
    featured: false,
    details: null,
  },
  {
    id: "2",
    name: "Egg Balloon",
    category: "food",
    price: 93.89,
    currency: "USD",
    image: {
      src: "https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg",
      alt: "",
    },
    bestseller: false,
    featured: false,
    details: null,
  },
];

export const PAGE_SIZE = 6;
