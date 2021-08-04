import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactChild,
  ReactChildren,
} from "react";
import CartModel from "../models/cart";
import ProductModel from "../models/product";
import useEventListener from "../services/useEventListener";

interface IFilter {
  categories: string[];
  prices: string[];
}
interface ContextProps {
  addToCart?: React.SetStateAction<any>;
  cart: CartModel[];
  clearCart?: () => void;
  currentPage: number;
  filterProps: IFilter;
  firstDoc?: any;
  isLargeTab: boolean;
  isMobile: boolean;
  isTab: boolean;
  lastDoc?: any;
  loading: boolean;
  openFilter: boolean;
  pageSize: number;
  products: ProductModel[];
  removeFromCart?: React.SetStateAction<any>;
  showContext: boolean;
  sortProps: string;
  toggleContext?: () => void;
  toggleFilter?: () => void;
  toggleLoader?: React.SetStateAction<any>;
  updateCurrentPage?: React.SetStateAction<any>;
  updateFilterProps?: React.SetStateAction<any>;
  updateFirstDoc?: React.SetStateAction<any>;
  updateLastDoc?: React.SetStateAction<any>;
  updatePageSize?: React.SetStateAction<any>;
  updateProducts?: React.SetStateAction<any>;
  updateSortProps?: React.SetStateAction<any>;
}

const ContextDefaultValues: ContextProps = {
  cart: [],
  currentPage: 0,
  filterProps: {
    categories: [],
    prices: [],
  },
  isLargeTab: false,
  isMobile: false,
  isTab: false,
  loading: false,
  openFilter: false,
  pageSize: 0,
  products: [],
  showContext: false,
  sortProps: "price",
};

export const AppContext = createContext<ContextProps>(ContextDefaultValues);

interface IProps {
  children: ReactChild | ReactChildren;
}

export const AppProvider = ({ children }: IProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTab, setIsTab] = useState<boolean>(false);
  const [isLargeTab, setIsLargeTab] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [lastDoc, setLastDoc] = useState();
  const [firstDoc, setFirstDoc] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [cart, setCart] = useState<CartModel[]>([]);
  const [filterProps, setFilterProps] = useState<IFilter>({
    categories: [],
    prices: [],
  });
  const [sortProps, setSortProps] = useState<string>("price");
  const [loading, setLoading] = useState<boolean>(false);
  const [showContext, setShowContext] = useState<boolean>(false);

  const updateWindowDimensions = () => {
    setIsLargeTab(window.screen.width < 990);
    setIsTab(window.screen.width < 768);
    setIsMobile(window.screen.width < 600);
  };

  useEffect(() => {
    updateWindowDimensions();

    const cartStore = localStorage.getItem("cart");

    if (cartStore) {
      setCart(JSON.parse(cartStore));
    }
  }, []);

  useEventListener("resize", updateWindowDimensions);

  const toggleFilter = (): void => setOpenFilter((prevState) => !prevState);

  const updateProducts = (val: ProductModel[]): void => setProducts(val);

  const updateFirstDoc = (val: React.SetStateAction<any>): void =>
    setFirstDoc(val);

  const updateLastDoc = (val: React.SetStateAction<any>): void =>
    setLastDoc(val);

  const updateCurrentPage = (val: number): void => setCurrentPage(val);

  const updatePageSize = (val: number): void => setPageSize(val);

  const updateFilterProps = (val: IFilter): void => setFilterProps(val);

  const updateSortProps = (val: string): void => setSortProps(val);

  const toggleLoader = (): void => setLoading((prevState) => !prevState);

  const toggleContext = (): void => setShowContext((prevState) => !prevState);

  const addToCart = (item: ProductModel): void => {
    const arr = [...cart];

    const obj: CartModel = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      currency: item.currency,
    };

    arr.push(obj);
    localStorage.setItem("cart", JSON.stringify(arr));
    setCart(arr);
    setShowContext(true);
  };

  const removeFromCart = (id: string): void => {
    const arr = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(arr));
    setCart(arr);
  };

  const clearCart = (): void => {
    localStorage.removeItem("cart");
    setCart([]);
    setShowContext(false);
  };

  return (
    <AppContext.Provider
      value={{
        addToCart,
        cart,
        clearCart,
        currentPage,
        filterProps,
        firstDoc,
        lastDoc,
        isLargeTab,
        isMobile,
        isTab,
        loading,
        openFilter,
        pageSize,
        products,
        removeFromCart,
        showContext,
        sortProps,
        toggleContext,
        toggleFilter,
        toggleLoader,
        updateCurrentPage,
        updateFilterProps,
        updateFirstDoc,
        updateLastDoc,
        updatePageSize,
        updateProducts,
        updateSortProps,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
