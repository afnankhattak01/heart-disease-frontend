import axios from "axios";
const AuthFunction = async () => {

  let getToken = localStorage.getItem("token");
  if (getToken) {
    let parsedToken = JSON.parse(getToken);

    try {
      const { data } = await axios.post(
        "/api/userverification/verifycredentials",
        { checkCredentails: true },
        {
          headers: {
            "Cotnent-Type": "application/json",
            Authorization: `Bearer ${parsedToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      return {
        success: false,
      };
    }
  }
  return {
    success: false,
  };
};

export default AuthFunction;
