import { createContext, useContext, useEffect, useState } from "react";
import StorageKit from "../StorageKit";
import userKit from "../UserKit";

type UserContextType = {
  token?: Token;
  user?: any;
  hasFetched?: boolean;
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
  const [hasFetched, setHasFetched] = useState(false)
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState(getToken())
  const setLocalToken = (token: any) => {
    setToken(token)
    StorageKit.setItem("@LOCAL_ACCESS", token.access)
    StorageKit.setItem("@LOCAL_REFRESH", token.refresh)
  }

  const logout = () => {
    setToken(undefined)
    StorageKit.removeItem("@LOCAL_ACCESS")
    StorageKit.removeItem("@LOCAL_REFRESH")
    setUser(undefined)
  }

  const refresh = () => {
    const storedRefresh = StorageKit.getItem("@LOCAL_REFRESH")
    const storedAccess = StorageKit.getItem("@LOCAL_ACCESS")

    userKit.refresh({refresh: storedRefresh, access: storedAccess})
    .then((response) => {
      setToken((state) => ({
        ...state,
        access: response.data.access
      }))
    })
    .catch((error) => {
      console.warn("ERROR: unable to refresh", error)
    })
  }

  const getUser = () => {
    userKit.getUser()
    .then((response) => {
      (response)
      setUser(response.data);
    })
    .catch(error => {
      console.warn("ERROR: unable to retrieve user", error)
      setHasFetched(true)
    })
  }
  
  useEffect(() => {
    const storedAccess = StorageKit.getItem("@LOCAL_ACCESS")
    const storedRefresh = StorageKit.getItem("@LOCAL_REFRESH")
    if(storedAccess){
      setToken({
      access: storedAccess,
      refresh: storedRefresh   
      })
    }
    else {
      logout()
      setHasFetched(true)
    }
  },[])

  useEffect(() => {
    if(token){
      getUser()
    }
  },[token])
  
  

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        hasFetched,
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
