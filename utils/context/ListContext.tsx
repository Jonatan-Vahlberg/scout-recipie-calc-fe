import { useRouter } from "next/router";
import React, { useState } from "react";
import { QueryFunction, useQuery } from "react-query";
import { queryClient } from "../../pages/_app";
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
  recipiesStatus: "idle" | "error" | "loading" | "success";
  options: ListOptions;
  page: number;
  search: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  createRecipie: (
    recipie: FormRecipie,
    onCreation: VoidFunction,
    onError: VoidFunction
  ) => void;
};

const ListContext = React.createContext<Partial<PortionContextInterface>>({});

const ListProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [options, setOptions] = useState<ListOptions>({ page: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");


  const  getRecipies: QueryFunction<any, (string | number)[]> = async (query) => {
    const [key, _page, _search] = query.queryKey as [string, number, string];
    const response =  await apiKit
      .getRecipies({
        page: _page,
        search: _search
      })

    return response.data
  };

  const createRecipie = (
    recipie: FormRecipie,
    onCreation: VoidFunction = () => {},
    onError: VoidFunction = () => {}
  ) => {
    apiKit
      .createRecipie(recipie)
      .then((response) => {
        onCreation();
        queryClient.invalidateQueries('recipies')
        router.push(`/${response.data.id}/`);
      })
      .catch((error) => {
        console.warn("ERROR: could not create recipie", error);
        onError();
      });
  };

  const {data: recipies, status: recipiesStatus } = useQuery(['recipies',page,search],getRecipies, {
    initialData: defaultList,
    keepPreviousData: true,
  });

  console.log(recipies, recipiesStatus)
  return (
    <ListContext.Provider
      value={{
        recipies,
        recipiesStatus,
        options,
        page,
        search,
        setSearch,
        setPage,
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
