import { createContext, useContext } from "react";
import userKit from "../UserKit";

type UserContextType = {
  cart?: UserCart;
  actions: {
    login: (payload: any, onLogin: VoidFunction, onError: VoidFunction) => void;
    register: (
      payload: any,
      onRegister: VoidFunction,
      onError: VoidFunction
    ) => void;
    logout: () => void;
  };
};

const UserContext = createContext<UserContextType>({
  actions: {
    login: () => {},
    register: () => {},
    logout: () => {},
  },
});

const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider
      value={{
        actions: {
          login: (payload, onLogin = () => {}, onError = () => {}) => {
            userKit
              .login(payload)
              .then((response) => {
                console.log("Rep", response);
                onLogin();
              })
              .catch((error) => {
                onError();
              });
          },
          register: (payload, onRegister = () => {}, onError = () => {}) => {
            userKit
              .createUser(payload)
              .then((response) => {
                console.log("Rep", response);
                onRegister();
              })
              .catch((error) => {
                onError();
              });
          },
          logout: () => {
            //TODO: Logout
          },
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useUser };
