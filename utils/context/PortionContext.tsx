import React, { useCallback, useEffect, useState } from "react";
import { _getPortions } from "../helpers";
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
  getPortions: (_portions?: Portions) => number;
  getIngredientSpesificPortions: (list: Ingredient[], ingredient: Ingredient) => number;
};

const defaultState: Portions = {
  xs: 0,
  sm: 0,
  md: 0,
  lg: 0,
  xl: 4,
  VEGITARIAN: 0,
  VEGAN: 0,
  DAIRY: 0,
  MP_ALLERGIES: 0,
  GLUTEN: 0,
  LEGUMINOUS: 0,
};

const defaultContextState: PortionContextInterface = {
  portions: defaultState,
  alterPortionValue: () => {},
  incrementPortion: () => {},
  decrementPortion: () => {},
  resetPortions: () => {},
  getPortions: () => 0,
  getIngredientSpesificPortions: () => 0,
};

const PORTIONS_STORAGE_KEY = "@STORAGE_PORTIONS";

const PortionContext =
  React.createContext<PortionContextInterface>(defaultContextState);

const PortionsProvider: React.FC = ({ children }) => {
  const [checkedStorage, setCheckedStorage] = useState(false);
  const [portions, setPortions] = useState<Portions>(defaultState);

  useEffect(() => {
    if (!checkedStorage) {
      checkStorage();
      return;
    }
    localStorage.setItem(PORTIONS_STORAGE_KEY, JSON.stringify(portions));
  }, [portions]);

  const checkStorage = () => {
    const storedPortions = localStorage.getItem(PORTIONS_STORAGE_KEY);
    if (storedPortions) {
      setPortions(JSON.parse(storedPortions));
    }
    setCheckedStorage(true);
  };

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

  const getPortions = (_portions?: Portions) => {
    _portions = _portions || portions;
    return _getPortions(_portions);
  };

  const getIngredientSpesificPortions = (
    list: Ingredient[],
    ingredient: Ingredient
  ) => {
    let ingredientsPortions = getPortions();
    console.log(ingredient.name, ingredientsPortions)
    if (ingredient.replaces && ingredient.replaces_reason) {
      return portions[ingredient.replaces_reason];
    }
    if (ingredientsPortions <= 0) {
      return 0;
    }
    const filteredList = list
      .filter((i) => i.ingredient_id !== ingredient.ingredient_id)
      .filter((i) => i.replaces === ingredient.ingredient_id);
    console.log(ingredient.name, filteredList)

    if(filteredList.length !== 0){
      filteredList.forEach(i => {
        ingredientsPortions -= portions[i.replaces_reason]
      })
    }
    return ingredientsPortions <= 0 ? 0 : ingredientsPortions
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
        getIngredientSpesificPortions
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
