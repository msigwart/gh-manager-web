import {createContext, useContext} from "react";
import useSWR from "swr";
import api from "../lib/api";

const authContext = createContext(undefined, undefined);

export default function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function useProvideAuth() {
  // Store the user in state
  const {data: user, error, mutate: mutateUser} = useSWR('/auth/me', api.get);

  return {
    user: !error ? user : undefined,
    isLoading: !error && !user,
    error,
    mutateUser
  };
}

export const useAuth = () => useContext(authContext);
