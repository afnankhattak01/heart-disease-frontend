import { createContext, useEffect } from "react";
import { useReducer } from "react";
export const LoginContext = createContext(null);
let loggedUser = null;
let userData = localStorage.getItem("user");

if (userData) {
  loggedUser = JSON.parse(userData);
}
const initialState = {
  user: loggedUser?loggedUser:null,
  isLoading: false,
  error: "",
};
const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
        error: action.error,
        isLoading: action.isLoading,
      };

    case "LOGOUT":
      return { user: null, isLoading: false, error: "" };

    case "LOADING":
      return { ...state, isLoading: action.isLoading, error: action.error };
    default:
      return state;
  }
};
export const AuthContextComp = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
 
  return (
    <LoginContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
};
