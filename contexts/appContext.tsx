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
  isMobile: boolean;
  isTab: boolean;
  isLargeTab: boolean;
  openFilter: boolean;
  toggleFilter?: () => void;
  products: ProductModel[];
  updateProducts?: React.SetStateAction<any>;
  lastDoc?: any;
  firstDoc?: any;
  updateFirstDoc?: React.SetStateAction<any>;
  updateLastDoc?: React.SetStateAction<any>;
  currentPage: number;
  updateCurrentPage?: React.SetStateAction<any>;
  pageSize: number;
  updatePageSize?: React.SetStateAction<any>;
  addToCart?: (val: ProductModel) => void;
  removeFromCart?: (val: string) => void;
  filterProps: IFilter;
  updateFilterProps?: React.SetStateAction<any>;
  sortProps: string;
  updateSortProps?: React.SetStateAction<any>;
}

const ContextDefaultValues: ContextProps = {
  isMobile: false,
  isTab: false,
  isLargeTab: false,
  openFilter: false,
  products: [],
  currentPage: 0,
  pageSize: 0,
  filterProps: {
    categories: [],
    prices: [],
  },
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
  };

  const removeFromCart = (id: string): void => {
    const arr = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(arr));
    setCart(arr);
  };

  return (
    <AppContext.Provider
      value={{
        isMobile,
        isTab,
        isLargeTab,
        openFilter,
        toggleFilter,
        products,
        updateProducts,
        lastDoc,
        firstDoc,
        updateFirstDoc,
        updateLastDoc,
        currentPage,
        updateCurrentPage,
        pageSize,
        updatePageSize,
        addToCart,
        removeFromCart,
        filterProps,
        updateFilterProps,
        sortProps,
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
