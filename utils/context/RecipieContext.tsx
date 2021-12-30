import React, { useState } from "react";

type PortionContextInterface = {
  recipie: Recipie;
  setRecipie: (recipie?: Recipie) => void;
};

const RecipieContext = React.createContext<Partial<PortionContextInterface>>(
  {}
);

const RecipieProvider: React.FC = ({ children }) => {
  const [recipie, setRecipie] = useState<Recipie>({
    name: "Köttbullar och potatis",
    ingredients: [
      {
        name: "Potatis",
        base_amount: 200,
        unit: "g",
        category: "VEGETABLE",
      },
      {
        name: "Köttbullar",
        base_amount: 225,
        unit: "g",
        category: "REFRIGERATED",
      },
      {
        name: "Lingonsylt",
        base_amount: 50,
        unit: "g",
      },
    ],
    steps: [],
    id: "4",
  });

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
