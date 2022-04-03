import React, { useEffect, useState } from "react";

type DrawerContextInterface = {
  isOpen: boolean;
  content?: () => JSX.Element;
  title?: string;
  actions: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setContent: React.Dispatch<React.SetStateAction<any>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
  };
};

const DrawerContext = React.createContext<DrawerContextInterface>({
  isOpen: false,
  actions: {
    setIsOpen: () => {},
    setContent: () => {},
    setTitle: () => {},
  },
});

const DrawerProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<() => JSX.Element>();
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    if (!isOpen) {
      setTitle(undefined);
      setContent(undefined);
    }
  }, [isOpen]);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        content,
        title,
        actions: {
          setIsOpen,
          setContent,
          setTitle,
        },
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawer = () => {
  const context = React.useContext(DrawerContext);
  return context;
};

export { DrawerProvider, useDrawer };
