import { createContext, useEffect } from "react";
import { useReducer } from "react";
export const LoginContext = createContext(null);
const initialState = {
  user: null,
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
  useEffect(() => {
    let stringifiedUser = localStorage.getItem("user");
    let parsedData = null;
    if (stringifiedUser) {
      parsedData = JSON.parse(stringifiedUser);
    }

    if (parsedData) {
      dispatch({
        type: "LOGIN",
        user: parsedData,
        isLoading: false,
        error: "",
      });
    }
  }, []);

  return (
    <LoginContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
};
