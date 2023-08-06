import { Navigate } from "react-router-dom";
const RouteGurad = ({ children, redirectPath = "/" }) => {
  const isTokenAvailable = localStorage.getItem("token");

  if (!isTokenAvailable) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export { RouteGurad };
