import React, { useState } from "react";

type PortionContextInterface = {
  recipie: Recipie;
  setRecipie: (recipie?: Recipie) => void;
};

const RecipieContext = React.createContext<Partial<PortionContextInterface>>(
  {}
);

const RecipieProvider: React.FC = ({ children }) => {
  const [recipie, setRecipie] = useState<Recipie>();

  return (
    <RecipieContext.Provider
      value={{
        recipie,
        setRecipie,
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
