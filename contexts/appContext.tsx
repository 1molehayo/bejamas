import React, { useEffect, useState, createContext, useContext } from "react";
import useEventListener from "../services/useEventListener";

interface ContextProps {
  isMobile: boolean;
  isTab: boolean;
}

const ContextDefaultValues: ContextProps = {
  isMobile: false,
  isTab: false,
};

export const AppContext = createContext<ContextProps>(ContextDefaultValues);

interface IProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: IProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTab, setIsTab] = useState<boolean>(false);

  const updateWindowDimensions = () => {
    setIsTab(window.outerWidth <= 768);
    setIsMobile(window.outerWidth <= 600);
  };

  useEventListener("resize", updateWindowDimensions);

  useEffect(() => {
    updateWindowDimensions();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        isTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
