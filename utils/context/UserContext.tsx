import { createContext, useContext, useState } from "react";
import StorageKit from "../StorageKit";
import userKit from "../UserKit";

type UserContextType = {
  cart?: UserCart;
  token?: Token;
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

const STORAGE_ACCESS_TOKEN = "@STORAGE_ACCESS_TOKEN"
const STORAGE_REFRESH_TOKEN = "@STORAGE_REFRESH_TOKEN"

const UserProvider = ({ children }) => {

  const getToken = (): Token | undefined => {
      const _access = StorageKit.getItem("@LOCAL_ACCESS")
      const _refresh = StorageKit.getItem("@LOCAL_REFRESH")

      
      if(_access){
        return {
          access: _access,
          refresh: _refresh
        }
      }
    return undefined
  }

  const [token, setToken] = useState(getToken());


  const setLocalToken = (token: any) => {
    setToken(token)
    StorageKit.setItem("@LOCAL_ACCESS", token.access)
    StorageKit.setItem("@LOCAL_REFRESH", token.refresh)
  }

  const logout = () => {
    setToken(undefined)
    StorageKit.removeItem("@LOCAL_ACCESS")
    StorageKit.removeItem("@LOCAL_REFRESH")
  } 
  

  return (
    <UserContext.Provider
      value={{
        token,
        actions: {
          login: (payload, onLogin = () => {}, onError = () => {}) => {
            userKit
              .login(payload)
              .then((response) => {
                const data = response.data
                if(data){
                  setLocalToken(data)
                }
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
                const data = response.data
                if(data.token){
                  setLocalToken(data.token)
                }

                onRegister();
              })
              .catch((error) => {
                onError();
              });
          },
          logout,
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
