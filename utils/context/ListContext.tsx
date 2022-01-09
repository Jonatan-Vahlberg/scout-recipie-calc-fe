import { useRouter } from "next/router";
import React, { useState } from "react";
import apiKit from "../ApiKit";

type RecipieList = {
  count: number;
  next?: string;
  previous?: string;
  results: Recipie[];
};

const defaultList: RecipieList = {
  count: 0,
  results: [],
  next: null,
  previous: null,
};

type PortionContextInterface = {
  recipies: RecipieList;
  setRecipies: (recipies?: RecipieList) => void;
  options: ListOptions;
  setOptions: (options: ListOptions) => void;
  createRecipie: (
    recipie: FormRecipie,
    onCreation: VoidFunction,
    onError: VoidFunction
  ) => void;
  getRecipies: (onSuccess?: VoidFunction, onError?: VoidFunction) => void;
};

const ListContext = React.createContext<Partial<PortionContextInterface>>({});

const ListProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [recipies, setRecipies] = useState<RecipieList>(defaultList);
  const [options, setOptions] = useState<ListOptions>({ page: 1 });

  const getRecipies = (
    onSuccess: VoidFunction = () => {},
    onError: VoidFunction = () => {}
  ) => {
    apiKit
      .getRecipies(options)
      .then((response) => {
        setRecipies(response.data);
        onSuccess();
      })
      .catch((error) => {
        console.warn("ERROR: could not get recipies", error);
        onError();
      });
  };

  const createRecipie = (
    recipie: FormRecipie,
    onCreation: VoidFunction = () => {},
    onError: VoidFunction = () => {}
  ) => {
    apiKit
      .createRecipie(recipie)
      .then((response) => {
        getRecipies();
        onCreation();
        // router.push(`/${response.data.id}/`);
      })
      .catch((error) => {
        console.warn("ERROR: could not create recipie", error);
        onError();
      });
  };

  return (
    <ListContext.Provider
      value={{
        recipies,
        setRecipies,
        options,
        setOptions,
        getRecipies,
        createRecipie,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

const useList = () => {
  const context = React.useContext(ListContext);
  return context;
};

export { ListProvider, useList };