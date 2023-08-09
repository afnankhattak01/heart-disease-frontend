import { Navigate } from "react-router-dom";
import UserHook from "../hooks/userhook";
const RouteGurad = ({ children }) => {
  const data = UserHook();
  if (!data?.user) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export { RouteGurad };
