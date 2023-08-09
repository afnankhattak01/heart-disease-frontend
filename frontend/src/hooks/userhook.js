import { useContext } from "react";

import { LoginContext } from "../context/authContext";
const UserHook = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  let contextData = { ...context, ...context?.user };

  return contextData;
};

export default UserHook;
