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
    id: 1,
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
    id: 2,
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
  // {
  //   id: 3,
  //   name: "Man",
  //   category: "people",
  //   price: 100,
  //   currency: "USD",
  //   image: {
  //     src: "",
  //     alt: "",
  //   },
  //   bestseller: false,
  //   featured: false,
  //   details: null,
  // },
  // {
  //   id: 4,
  //   name: "Architecture",
  //   category: "landmarks",
  //   price: 101,
  //   currency: "USD",
  //   dimensions: {
  //     width: 1020,
  //     height: 1020,
  //   },
  //   image: {
  //     src: "",
  //     alt: "",
  //   },
  //   bestseller: false,
  //   featured: false,
  //   details: null,
  // },
  // {
  //   id: 5,
  //   name: "Samurai King Restling",
  //   category: "landmarks",
  //   price: 101,
  //   currency: "USD",
  //   image: {
  //     src: "",
  //     alt: "",
  //   },
  //   bestseller: false,
  //   featured: true,
  //   details: {
  //     dimensions: {
  //       width: 1020,
  //       height: 1020,
  //     },
  //     size: 15000,
  //     description:
  //       "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely",
  //     recommendations: [
  //       {
  //         src: "",
  //         alt: "",
  //       },
  //     ],
  //   },
  // },
];
