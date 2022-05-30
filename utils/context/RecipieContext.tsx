import React, { useState } from "react";
import { queryClient } from "../../pages/_app";
import apiKit from "../ApiKit";

type PortionContextInterface = {
  recipie: Recipie;
  setRecipie: (recipie?: Recipie) => void;
  getRecipie: (id:any) => void;
  updateRecipie: (
    recipie: Recipie,
    onUpdate: VoidFunction ,
    onError: VoidFunction
  ) => void;
};

const RecipieContext = React.createContext<Partial<PortionContextInterface>>(
  {}
);

const RecipieProvider: React.FC = ({ children }) => {
  const [recipie, setRecipie] = useState<Recipie>();

  const getRecipie = (id: any) => {
    apiKit
        .getRecipie(id)
        .then((response) => {
          setRecipie(response.data);
        })
        .catch((error) => {
          console.warn(`ERROR: GETTING RECIPIE ${error}`);
        });
  }

  const updateRecipie = (
    recipie: Recipie,
    onUpdate: VoidFunction = () => {},
    onError: VoidFunction = () => {}
  ) => {
    apiKit
      .updateRecipie(recipie, recipie.id)
      .then((response) => {
        onUpdate();
        setRecipie(response.data);
        queryClient.invalidateQueries('recipies')
      })
      .catch((error) => {
        console.warn("ERROR: could not create recipie", error);
        onError();
      });
  };

  return (
    <RecipieContext.Provider
      value={{
        recipie,
        setRecipie,
        getRecipie,
        updateRecipie,
      }}
    >
      {children}
    </RecipieContext.Provider>
  );
};

const useRecipie = () => {
  const context = React.useContext(RecipieContext);
  return context;
};

export { RecipieProvider, useRecipie };
