import React, { useCallback, useEffect, useState } from "react";

const portionSizes = {
  xs: 0.7,
  sm: 0.8,
  md: 0.9,
  lg: 1,
  xl: 1,
};

type PortionContextInterface = {
  portions: Portions;
  alterPortionValue: (key: PortionKey, value: number) => void;
  incrementPortion: (key: PortionKey) => void;
  decrementPortion: (key: PortionKey) => void;
  resetPortions: () => void;
  getPortions: () => number;
};

const defaultState: Portions = {
  xs: 0,
  sm: 0,
  md: 0,
  lg: 0,
  xl: 4,
};

const defaultContextState: PortionContextInterface = {
  portions: defaultState,
  alterPortionValue: () => {},
  incrementPortion: () => {},
  decrementPortion: () => {},
  resetPortions: () => {},
  getPortions: () => 0,
};

const PORTIONS_STORAGE_KEY = "@STORAGE_PORTIONS"

const PortionContext =
  React.createContext<PortionContextInterface>(defaultContextState);

const PortionsProvider: React.FC = ({ children }) => {
  const [checkedStorage, setCheckedStorage] = useState(false);
  const [portions, setPortions] = useState<Portions>(defaultState);

  useEffect(() => {
    if(!checkedStorage){
      checkStorage()
      return 
    }
    localStorage.setItem(PORTIONS_STORAGE_KEY,JSON.stringify(portions))
  },[portions])

  const checkStorage = () => {
      const storedPortions = localStorage.getItem(PORTIONS_STORAGE_KEY)
      if(storedPortions){
        setPortions(JSON.parse(storedPortions))
        setCheckedStorage(true)
    }
  }

  const alterPortionValue = (key: PortionKey, value: number) => {
    if (value >= 0) {
      setPortions({
        ...portions,
        [key]: value,
      });
    }
  };

  const incrementPortion = (key: PortionKey) => {
    alterPortionValue(key, portions[key] + 1);
  };

  const decrementPortion = (key: PortionKey) => {
    if (portions[key] !== 0) {
      alterPortionValue(key, portions[key] - 1);
    }
  };

  const resetPortions = () => {
    setPortions(defaultState);
  };

  const getPortions = () => {
    const keys = Object.keys(portions);
    return keys
      .map((key) => portions[key] * portionSizes[key])
      .reduce((sum, a) => sum + a);
  };

  return (
    <PortionContext.Provider
      value={{
        portions,
        incrementPortion,
        decrementPortion,
        resetPortions,
        getPortions,
        alterPortionValue,
      }}
    >
      {children}
    </PortionContext.Provider>
  );
};

const usePortions = () => {
  const context = React.useContext(PortionContext);
  return context;
};

export { PortionsProvider, usePortions };
