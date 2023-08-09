import { useContext } from "react";
import axiosPublic from "../helpers/axiosPublic";
import { LoginContext } from "../context/authContext";
const Loginhook = () => {
  const contextData = useContext(LoginContext);
  const { user, isLoading, error, dispatch } = contextData;

  const LoginRequest = async (loginData) => {
    try {
      dispatch({ type: "LOADING", isLoading: true, error: "" });

      const loginResp = await axiosPublic.post(
        "/api/loginpage/verifyloginpage",
        loginData
      );

      if (loginResp.status === 200) {
        const userData = {
          email: loginResp.data.isUserAValidUser.emailaddress,
          username: loginResp.data.isUserAValidUser.username,
          jwttoken: loginResp.data.jwttoken,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        dispatch({
          type: "LOGIN",
          user: userData,
          isLoading: false,
          error: "",
        });
      }
    } catch (error) {
      dispatch({
        type: "LOGIN",
        user: null,
        isLoading: false,
        error:
          "Login failed please check login credentials or your internet connection and try again!",
      });
    }
  };

  return { user, isLoading, error, LoginRequest };
};

export { Loginhook };
