import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactChild,
  ReactChildren,
} from "react";
import useEventListener from "../services/useEventListener";

interface ContextProps {
  isMobile: boolean;
  isTab: boolean;
  isLargeTab: boolean;
  openFilter: boolean;
  toggleFilter?: () => void;
}

const ContextDefaultValues: ContextProps = {
  isMobile: false,
  isTab: false,
  isLargeTab: false,
  openFilter: false,
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

  const updateWindowDimensions = () => {
    setIsLargeTab(window.screen.width < 990);
    setIsTab(window.screen.width < 768);
    setIsMobile(window.screen.width < 600);
  };

  useEffect(() => {
    updateWindowDimensions();
  }, []);

  useEventListener("resize", updateWindowDimensions);

  const toggleFilter = (): void => setOpenFilter((prevState) => !prevState);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        isTab,
        isLargeTab,
        openFilter,
        toggleFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
