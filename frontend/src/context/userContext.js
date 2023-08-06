import { useReducer, createContext, useContext } from "react";
import { AuthDispatcher } from "../helpers/authDispatcher";
import AuthFunction from "../helpers/authfunction";
export const userCredentialsContext = createContext({});
const initialState = {
  isLoading: true,
  user: [],
  isuserVerified: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case true:
      return {
        isLoading: action.isLoading,
        isuserVerified: action.isuserVerified,
        user: action.user,
      };

    case false:
      return { ...state, isLoading: action.isLoading };

    default:
      return initialState;
  }
};

export const UserContextProvider = ({ children }) => {
  const fetchInitialData = async () => {
    const returnedData = await AuthFunction();

    const dispatchAction = AuthDispatcher(returnedData);

    dispatch(dispatchAction);
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/page/user/logintoaccount/new/login";
  };

  return (
    <userCredentialsContext.Provider
      value={{ state, dispatch, Logout, fetchInitialData }}
    >
      {children}
    </userCredentialsContext.Provider>
  );
};

export const useUserContext = () => {
  const data = useContext(userCredentialsContext);

  return data;
};
